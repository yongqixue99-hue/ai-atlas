import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import os from "node:os";
import path from "node:path";

const cwd = fileURLToPath(new URL("../", import.meta.url));
function child(source, env = {}) {
  return new Promise((resolve, reject) => {
    const process = spawn(globalThis.process.execPath, ["--input-type=module", "-e", source], {
      cwd, env: { ...globalThis.process.env, ATLAS_QA_DIR: path.join(os.tmpdir(), "ai-atlas-harness-qa"), ...env },
      stdio: ["ignore", "pipe", "pipe"],
    });
    let output = "";
    process.stdout.on("data", data => output += data);
    process.stderr.on("data", data => output += data);
    const timer = setTimeout(() => { process.kill("SIGKILL"); reject(new Error(`Test process did not exit cleanly:\n${output}`)); }, 20_000);
    process.on("error", error => { clearTimeout(timer); reject(error); });
    process.on("exit", code => { clearTimeout(timer); resolve({ code, output }); });
  });
}

test("a missing browser fails and closes the already-started Vite server", async () => {
  const result = await child('import { browserHarness } from "./tests/browser-harness.mjs"; await browserHarness({ launchOptions: { executablePath: "/nonexistent/atlas-browser" } });');
  assert.equal(result.code, 1, result.output);
  assert.match(result.output, /executable|launch/i);
});

test("QA output rejects repository paths before starting a server", async () => {
  const result = await child('import { browserHarness } from "./tests/browser-harness.mjs"; await browserHarness();', { ATLAS_QA_DIR: `${cwd}/docs/qa` });
  assert.equal(result.code, 1, result.output);
  assert.match(result.output, /must be outside the repository/);
});
