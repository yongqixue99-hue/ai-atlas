import { browserHarness } from "./browser-harness.mjs";
import assert from "node:assert/strict";
import fs from "node:fs/promises";

// Run after npm run build: verifies the shipped bundle rather than Vite's dev transform.
const { browser, page, close, outputUrl } = await browserHarness({ port: 5182, production: true });
const out = outputUrl;
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
page.on("response", (response) => {
  if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
});
const routes = [
  ["home-desktop", "/"],
  ["people-desktop", "/people"],
  ["governance-desktop", "/company/openai?tab=governance"],
  ["tibo-desktop", "/person/thibault-sottiaux"],
  ["relationships-desktop", "/company/openai?tab=relationships&root=openai&filter=employment&status=recent&relation=tibo-openai-role"],
  ["person-state-desktop", "/explore?root=thibault-sottiaux&filter=all&status=all&relation=tibo-codex-role&from=openai"],
  ["timeline-desktop", "/timeline"],
  ["writings-person-desktop", "/person/sam-altman"],
  ["writings-inline-person-desktop", "/person/dario-amodei"],
];
try {
  for (const [name, path] of routes) {
    await page.goto(`http://127.0.0.1:5182/#${path}`);
    await page.waitForFunction(() => document.documentElement.dataset.route === location.hash);
    await page.evaluate(() => document.fonts.ready);
    await page.locator("main").evaluate(el => Promise.all(el.getAnimations({ subtree: true }).map(a => a.finished.catch(() => {}))));
    assert.ok(await page.locator("main").innerText());
    assert.equal(await page.locator(".not-found").count(), 0, path);
    if (path === "/person/sam-altman") {
      assert.equal(await page.locator(".writing-list > li").count(), 3);
      assert.equal(await page.locator(".writing-list h3 a").first().getAttribute("href"), "https://ia.samaltman.com/");
    }
    if (path === "/person/dario-amodei") assert.ok(await page.locator(".writing-inline").count() >= 3);
    await page.screenshot({ path: new URL(`${name}.png`, out).pathname, fullPage: true });
  }
  await page.locator(".search-trigger").click();
  await page.locator("#atlas-search").fill("Tibo");
  await page.locator('.search-result[href="#/person/thibault-sottiaux"]').waitFor();
  await page.screenshot({ path: new URL("search-desktop.png", out).pathname });
  await page.keyboard.press("Escape");
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    for (const [name, path] of [
      ["home", "/"],
      ["tibo", "/person/thibault-sottiaux"],
      ["writings-person", "/person/sam-altman"],
      ["governance", "/company/openai?tab=governance"],
      ["relationships", "/company/openai?tab=relationships&root=openai&filter=employment&status=recent&relation=tibo-openai-role"],
      ["person-state", "/explore?root=thibault-sottiaux&filter=all&status=all&relation=tibo-codex-role&from=openai"],
    ]) {
      await page.goto(`http://127.0.0.1:5182/#${path}`);
      await page.waitForFunction(() => document.documentElement.dataset.route === location.hash);
    await page.evaluate(() => document.fonts.ready);
    await page.locator("main").evaluate(el => Promise.all(el.getAnimations({ subtree: true }).map(a => a.finished.catch(() => {}))));
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), path);
      if (width === 390) await page.screenshot({
        path: new URL(`${name}-mobile.png`, out).pathname,
        fullPage: true,
      });
    }
  }
  assert.deepEqual(errors, []);
  const result = { date: new Date().toISOString(), browser: browser.version(), mode: "production dist", routes: routes.map((r) => r[1]), mobileWidths: [390, 320], aliasSearch: "Tibo", errors };
  await fs.writeFile(new URL("production-results.json", out), JSON.stringify(result, null, 2) + "\n");
  console.log(JSON.stringify(result));
} finally {
  await close();
}
