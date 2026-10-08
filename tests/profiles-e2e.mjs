import { chromium } from "playwright";
import { expect } from "@playwright/test";
import { createServer } from "vite";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { profiles } from "../src/profiles.ts";
import { people, sources } from "../src/data.ts";

// Content-specific regression coverage complements tests/e2e.mjs. These checks
// validate citation wiring, not the truth of prose; the editorial audit does that.
const server = await createServer({ server: { host: "127.0.0.1", port: 5183, strictPort: true } });
await server.listen();
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
const passed = [];
page.on("pageerror", e => errors.push(e.message));
page.on("response", r => { if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`); });
const out = process.env.ATLAS_QA_DIR ? new URL(`file://${process.env.ATLAS_QA_DIR.replace(/\/$/, "")}/`) : new URL("../docs/qa/", import.meta.url);
async function goto(route) {
  await page.goto(`http://127.0.0.1:5183/#${route}`);
  await page.waitForFunction(() => document.documentElement.dataset.route === location.hash);
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  await page.locator("main").evaluate(el => Promise.all(el.getAnimations({ subtree: true }).map(a => a.finished.catch(() => {}))));
}
async function verifyDrawer(button, ids) {
  const route = page.url();
  await button.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toHaveCount(1);
  const actual = await dialog.locator(".sources-list a").evaluateAll(links => links.map(a => a.href));
  const expected = ids.map(id => sources.find(s => s.id === id).url);
  assert.deepEqual(actual.sort(), expected.sort());
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(button).toBeFocused();
  assert.equal(page.url(), route);
}
try {
  await fs.mkdir(out, { recursive: true });
  for (const [id, profile] of Object.entries(profiles)) {
    const person = people.find(p => p.id === id);
    await goto("/");
    await page.locator(`.map-person[data-id="${id}"]`).click();
    await expect(page.locator("h1")).toHaveText(person.name);
    await expect(page.locator(".quick-facts .profile-citation")).toHaveCount(profile.facts.length);
    for (let index = 0; index < profile.facts.length; index++) {
      const button = page.locator(".quick-facts .profile-citation").nth(index);
      assert.equal(await button.getAttribute("data-sources"), profile.facts[index][2].join(","));
    }
    for (let index = 0; index < profile.chapters.length; index++) {
      const chapter = profile.chapters[index];
      const section = page.locator(`#chapter-${index + 1}`);
      await expect(section.locator(".profile-citation")).toHaveCount(chapter.text.length);
      for (let paragraph = 0; paragraph < chapter.text.length; paragraph++) {
        assert.equal(await section.locator(".profile-citation").nth(paragraph).getAttribute("data-sources"), chapter.paragraphSourceIds[paragraph].join(","));
      }
    }
    const fact = page.locator(".quick-facts .profile-citation").first();
    await verifyDrawer(fact, profile.facts[0][2]);
    await verifyDrawer(fact, profile.facts[0][2]);
    const paragraph = page.locator("#chapter-1 .profile-citation").first();
    await verifyDrawer(paragraph, profile.chapters[0].paragraphSourceIds[0]);
    await expect(page.locator(".profile-reviewed time")).toHaveAttribute("datetime", profile.reviewed);
    // New citations must not interfere with native history, search, or indices.
    await page.goBack();
    await expect(page.locator(".atlas-map")).toHaveCount(1);
    await page.goForward();
    await expect(page.locator("h1")).toHaveText(person.name);
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await page.locator(".search-trigger").click();
    await page.locator("#atlas-search").fill(person.name);
    await page.locator(`.search-result[href="#/person/${id}"]`).click();
    await expect(page.locator("h1")).toHaveText(person.name);
    await goto("/people");
    await page.locator(`.person-card[href="#/person/${id}"]`).click();
    await expect(page.locator("h1")).toHaveText(person.name);
    passed.push(`${id}: map, facts, paragraphs, repeated drawers, history, search, index`);
  }
  await goto("/person/demis-hassabis");
  await expect(page.locator(".profile-role-note")).toContainText("2026 年 9 月 16 日");
  await verifyDrawer(page.locator(".profile-role-note .profile-citation"), profiles["demis-hassabis"].roleNote.sourceIds);
  passed.push("Demis: dated current-role conflict is visible and sourced without graph changes");
  for (const theme of ["light", "dark"]) {
    await page.emulateMedia({ colorScheme: theme });
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: width === 1440 ? 1000 : 844 });
      for (const id of Object.keys(profiles)) {
        await goto(`/person/${id}`);
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${id} ${theme} ${width}`);
        const citation = page.locator(".quick-facts .profile-citation").first();
        await citation.focus();
        assert.notEqual(await citation.evaluate(el => getComputedStyle(el).outlineStyle), "none");
        await verifyDrawer(citation, profiles[id].facts[0][2]);
      }
      if (width !== 320) {
        await goto("/person/sam-altman");
        await page.screenshot({ animations: "disabled", path: new URL(`audited-person-${theme}-${width === 1440 ? "desktop" : "mobile"}.png`, out).pathname });
        await page.locator("#chapter-1").evaluate(el => el.scrollIntoView({ block: "start", behavior: "instant" }));
        await page.screenshot({ animations: "disabled", path: new URL(`audited-chapters-${theme}-${width === 1440 ? "desktop" : "mobile"}.png`, out).pathname });
      }
      passed.push(`${theme} ${width}px: all ten profiles, focus, citations, no overflow`);
    }
  }
  await page.emulateMedia({ colorScheme: "light" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await goto("/person/sam-altman");
  await page.locator("#chapter-1 .profile-citation").first().click();
  await page.screenshot({ animations: "disabled", path: new URL("audited-evidence-desktop.png", out).pathname });
  await page.getByRole("button", { name: "关闭", exact: true }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  assert.deepEqual(errors, []);
  await fs.writeFile(new URL("profile-evidence-results.json", out), JSON.stringify({ date: new Date().toISOString(), browser: browser.version(), passed, errors }, null, 2) + "\n");
  console.log(JSON.stringify({ passed, errors }, null, 2));
} finally {
  await browser.close();
  await server.close();
}
