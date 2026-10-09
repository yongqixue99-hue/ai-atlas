import { chromium, webkit } from "playwright";
import { createServer, preview } from "vite";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const repository = path.resolve(fileURLToPath(new URL("../", import.meta.url)));

// QA is local-only: never overwrite the historical screenshots tracked in docs/qa
// or accidentally add screenshots to the application/public build.
export async function privateQaDirectory() {
  const directory = path.resolve(process.env.ATLAS_QA_DIR || path.join(os.tmpdir(), `ai-atlas-qa-${process.pid}`));
  const relative = path.relative(repository, directory);
  if (!relative.startsWith(`..${path.sep}`) && relative !== ".." && !path.isAbsolute(relative)) {
    throw new Error("ATLAS_QA_DIR must be outside the repository; screenshots are private QA output.");
  }
  await fs.mkdir(directory, { recursive: true });
  return directory;
}

// Acquire everything inside one guarded scope. In particular, a missing browser
// or a context startup failure must not leave Vite running and hang CI.
export async function browserHarness({ port = 0, browserName = "chromium", production = false, contextOptions = {}, launchOptions = {} } = {}) {
  const browserType = { chromium, webkit }[browserName];
  if (!browserType) throw new Error(`Unsupported browser: ${browserName}`);
  const outputDir = await privateQaDirectory();
  let server, browser, context, closed = false;
  async function close() {
    if (closed) return;
    closed = true;
    try {
      await browser?.close();
    } finally {
      if (production && server) {
        server.httpServer.closeAllConnections?.();
        await new Promise((resolve, reject) => server.httpServer.close(error => error ? reject(error) : resolve()));
      } else {
        await server?.close();
      }
    }
  }
  try {
    const address = { host: "127.0.0.1", port, strictPort: true };
    if (production) server = await preview({ preview: address });
    else {
      server = await createServer({ server: { ...address, hmr: false } });
      await server.listen();
    }
    browser = await browserType.launch({ headless: true, ...launchOptions });
    context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce", ...contextOptions });
    const page = await context.newPage();
    page.setDefaultTimeout(10_000);
    page.setDefaultNavigationTimeout(20_000);
    return { server, browser, context, page, close, base: server.resolvedUrls.local[0], outputDir, outputUrl: pathToFileURL(`${outputDir}${path.sep}`) };
  } catch (error) {
    await close();
    throw error;
  }
}
