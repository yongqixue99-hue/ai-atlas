import { chromium } from "playwright";
import { expect } from "@playwright/test";
import { createServer } from "vite";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { people, sources } from "../src/data.ts";
import { writings, featuredWritings, writingSource } from "../src/writings.ts";

const server = await createServer({ server: { host: "127.0.0.1", port: 5184, strictPort: true } });
await server.listen();
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" });
const page = await context.newPage();
const errors = [];
const passed = [];
page.on("pageerror", e => errors.push(e.message));
page.on("response", r => { if (r.url().startsWith("http://127.0.0.1") && r.status() >= 400) errors.push(`${r.status()} ${r.url()}`); });
const out = process.env.ATLAS_QA_DIR || new URL("../docs/qa/", import.meta.url).pathname;
async function goto(route) {
  await page.goto(`http://127.0.0.1:5184/#${route}`);
  await page.waitForFunction(() => document.documentElement.dataset.route === location.hash);
  await page.evaluate(() => document.fonts.ready);
}
async function jumpToWriting() {
  await page.locator(".writings-jump").click();
  await expect(page.locator("#person-writings")).toBeFocused();
  const top = await page.locator("#person-writings").evaluate(el => el.getBoundingClientRect().top);
  assert.ok(top >= 0 && top < 200, `article section top ${top}`);
}
try {
  await fs.mkdir(out, { recursive: true });
  for (const p of people) {
    await goto(`/person/${p.id}`);
    const selected = featuredWritings(p.id);
    await expect(page.locator("#person-writings")).toHaveCount(selected.length ? 1 : 0);
    await expect(page.locator(".writing-list > li")).toHaveCount(selected.length);
    if (!selected.length) { passed.push(`${p.id}: no empty authored-writing section`); continue; }
    for (const w of selected) {
      const source = writingSource(w);
      const row = page.locator(`[data-writing="${w.sourceId}"]`);
      await expect(row.locator("h3 a")).toHaveText(w.title);
      await expect(row.locator("h3 a")).toHaveAttribute("href", source.url);
      await expect(row).toContainText(w.authors);
      await expect(row).toContainText(w.authorship === "coauthored" ? "共同署名" : "本人署名");
    }
    for (const link of await page.locator(".writing-inline, .writing-list a").all()) {
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", "noopener noreferrer");
      await expect(link).toHaveAttribute("aria-label", /新标签页/);
      const href = await link.getAttribute("href");
      assert.ok(writings.some(w => writingSource(w)?.url === href));
    }
    await jumpToWriting();
    await page.locator('.chapter-nav [data-jump="person-writings"]').click();
    await expect(page.locator("#person-writings")).toBeFocused();
    assert.equal(page.url().split("#")[1], `/person/${p.id}`);
    passed.push(`${p.id}: verified catalogue, safe inline links, repeated jump and keyboard focus`);
  }
  await goto("/person/greg-brockman");
  await expect(page.locator('.writing-inline[href="https://blog.gregbrockman.com/my-path-to-openai"]')).toHaveCount(1);
  await expect(page.locator('.writing-inline[href="https://arxiv.org/abs/1606.01540"]')).toHaveCount(1);
  await goto("/person/dario-amodei");
  await expect(page.locator('.writing-inline[href="https://darioamodei.com/essay/machines-of-loving-grace"]')).toHaveCount(1);
  passed.push("existing named essays and research papers link directly from biography prose");

  // Original pages are editorially verified separately. Stub only the response
  // here to test the real external-link/popup behaviour without flaky networks.
  await goto("/person/sam-altman");
  await jumpToWriting();
  const external = page.locator(".writing-list h3 a").first();
  const originalUrl = await external.getAttribute("href");
  await context.route(originalUrl, route => route.fulfill({ status: 200, contentType: "text/html", body: "<!doctype html><title>Original article test target</title>" }));
  for (let i = 0; i < 2; i++) {
    await external.focus();
    const popupPromise = context.waitForEvent("page");
    await page.keyboard.press("Enter");
    const popup = await popupPromise;
    await popup.waitForLoadState();
    assert.equal(popup.url(), originalUrl);
    assert.equal(await popup.evaluate(() => window.opener), null);
    assert.equal(page.url().split("#")[1], "/person/sam-altman");
    await popup.close();
    await expect(external).toBeFocused();
  }
  passed.push("repeated keyboard opening preserves Atlas and produces an isolated new tab");

  await goto("/people");
  await page.locator('.person-card[href="#/person/sam-altman"]').click();
  await jumpToWriting();
  await page.goBack();
  await expect(page.locator(".person-card")).toHaveCount(people.length);
  await page.goForward();
  await expect(page.locator("h1")).toHaveText("Sam Altman");
  await expect(page.locator(".writing-list > li")).toHaveCount(featuredWritings("sam-altman").length);
  await page.reload();
  await expect(page.locator("#person-writings")).toHaveCount(1);
  passed.push("Back, Forward and reload retain correct person and reading entries");

  await page.locator(".search-trigger").click();
  await page.locator("#atlas-search").fill("The Intelligence Age");
  const hit = page.locator('.search-result[href="#/person/sam-altman"]');
  await expect(hit).toContainText("The Intelligence Age");
  await hit.click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.locator("h1")).toHaveText("Sam Altman");
  await goto("/sources");
  await page.locator("[data-source-filter]").fill("The Intelligence Age");
  await expect(page.locator(".source-group li:visible")).toHaveCount(1);
  await expect(page.locator(".source-group li:visible")).not.toContainText("未关联");
  passed.push("article title search finds its author; new original appears in the source index");

  for (const theme of ["light", "dark"]) {
    await page.emulateMedia({ colorScheme: theme });
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: width === 1440 ? 1000 : 844 });
      for (const p of people.filter(p => featuredWritings(p.id).length)) {
        await goto(`/person/${p.id}`);
        await jumpToWriting();
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${p.id} ${theme} ${width}`);
        const link = page.locator(".writing-list h3 a").first();
        await page.keyboard.press("Tab");
        await expect(link).toBeFocused();
        assert.notEqual(await link.evaluate(el => getComputedStyle(el).outlineStyle), "none");
      }
      if (width !== 320) {
        await goto("/person/sam-altman");
        await jumpToWriting();
        await page.screenshot({ animations: "disabled", path: path.join(out, `writings-${theme}-${width === 1440 ? "desktop" : "mobile"}.png`) });
      }
      passed.push(`${theme} ${width}px: all authored-reading sections, focus, no overflow`);
    }
  }
  await page.emulateMedia({ colorScheme: "light" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await goto("/person/dario-amodei");
  await page.locator('.writing-inline[href="https://darioamodei.com/essay/machines-of-loving-grace"]').evaluate(el => el.closest("section").scrollIntoView({ block: "start", behavior: "instant" }));
  await page.screenshot({ animations: "disabled", path: path.join(out, "writings-inline-desktop.png") });
  assert.deepEqual(errors, []);
  const result = { date: new Date().toISOString(), browser: browser.version(), passed, errors };
  await fs.writeFile(path.join(out, "writings-results.json"), JSON.stringify(result, null, 2) + "\n");
  console.log(JSON.stringify(result));
} finally {
  await browser.close();
  await server.close();
}
