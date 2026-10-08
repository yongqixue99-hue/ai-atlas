import { chromium } from "playwright";
import { createServer } from "vite";
import fs from "node:fs/promises";
const out = process.env.ATLAS_QA_DIR ? new URL(`file://${process.env.ATLAS_QA_DIR.replace(/\/$/, "")}/`) : new URL("../docs/qa/", import.meta.url);
await fs.mkdir(out, { recursive: true });
const server = await createServer({
  server: { host: "127.0.0.1", port: 5180, strictPort: true },
});
await server.listen();
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("http://127.0.0.1:5180");
  await page.waitForLoadState("load");
  await page.screenshot({
    path: new URL("home-desktop.png", out).pathname,
    fullPage: true,
  });
  await page.goto("http://127.0.0.1:5180/#/company/openai?tab=relationships");
  await page.screenshot({
    path: new URL("relationships-desktop.png", out).pathname,
    fullPage: true,
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://127.0.0.1:5180");
  await page.screenshot({
    path: new URL("home-mobile.png", out).pathname,
    fullPage: true,
  });
  await page.goto("http://127.0.0.1:5180/#/company/openai?tab=relationships");
  await page.screenshot({
    path: new URL("relationships-mobile.png", out).pathname,
    fullPage: true,
  });
  console.log(JSON.stringify({ errors }));
} finally {
  await browser.close();
  await server.close();
}
