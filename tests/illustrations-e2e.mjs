import { chromium } from "playwright";
import { expect } from "@playwright/test";
import { createServer } from "vite";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { profiles } from "../src/profiles.ts";
import { biographyFigures } from "../src/illustrations.ts";
import { sources } from "../src/data.ts";

const server = await createServer({server:{host:"127.0.0.1",port:5185,strictPort:true}});
await server.listen();
const browser = await chromium.launch({headless:true});
const context = await browser.newContext({viewport:{width:1440,height:1050},reducedMotion:"reduce"});
const page = await context.newPage();
const errors = [], passed = [];
page.on("pageerror", error => errors.push(error.message));
page.on("response", response => { if(response.url().startsWith("http://127.0.0.1") && response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
const out = process.env.ATLAS_QA_DIR || new URL("../docs/qa/", import.meta.url).pathname;
async function goto(personId) {
  await page.goto(`http://127.0.0.1:5185/#/person/${personId}`);
  await page.waitForFunction(() => document.documentElement.dataset.route === location.hash);
  await page.evaluate(() => document.fonts.ready);
}
async function openFigure(figure) {
  const chapterIndex = profiles[figure.personId].chapters.findIndex(c => c.title === figure.chapterTitle);
  await page.locator(`.chapter-nav [data-jump="chapter-${chapterIndex+1}"]`).click();
  const target = page.locator(`[data-figure="${figure.id}"]`);
  await expect(target).toBeVisible();
  return target;
}
try {
  await fs.mkdir(out,{recursive:true});
  for (const [personId, profile] of Object.entries(profiles)) {
    await goto(personId);
    await expect(page.locator(".biography-disclosure[open]")).toHaveCount(1);
    await page.locator('[data-biographies="expand"]').click();
    await expect(page.locator(".biography-disclosure[open]")).toHaveCount(profile.chapters.length);
    for (const figure of biographyFigures.filter(f => f.personId === personId)) {
      const target = await openFigure(figure);
      await expect(target.locator("figcaption")).toContainText(figure.caption);
      if (figure.kind === "photo") {
        const image = target.locator("img");
        await image.scrollIntoViewIfNeeded();
        await expect(image).toHaveAttribute("alt",figure.alt);
        assert.ok(await image.evaluate(img => img.complete && img.naturalWidth > 0));
        assert.deepEqual(await image.evaluate(img => [img.naturalWidth,img.naturalHeight]),[figure.width,figure.height]);
      } else {
        await expect(target.getByRole("img")).toHaveCount(1);
        await expect(target.getByRole("img")).toHaveAccessibleName(figure.alt);
      }
      const evidence = target.locator(".figure-source");
      await expect(evidence).toHaveAttribute("aria-haspopup", "dialog");
      await expect(target.locator(".figure-print-credit")).toBeHidden();
      await evidence.click();
      const attribution = page.getByRole("dialog").locator(".figure-attribution");
      await expect(attribution).toContainText(figure.title);
      if (figure.kind === "photo") {
        await expect(attribution).toContainText(figure.credit);
        await expect(attribution.locator(`a[href="${figure.licenseUrl}"]`)).toHaveText(figure.license);
        await expect(attribution.locator(`a[href="${figure.sourceUrl}"]`)).toHaveCount(1);
      } else await expect(attribution).toContainText("AI Atlas 原创图解");
      const actual = await page.getByRole("dialog").locator(".sources-list a").evaluateAll(links=>links.map(link=>link.href).sort());
      assert.deepEqual(actual,figure.sourceIds.map(id=>sources.find(s=>s.id===id).url).sort());
      await page.keyboard.press("Escape");
      await expect(evidence).toBeFocused();
      await expect(target).toBeVisible();
      await evidence.click();
      await page.getByRole("button", {name:"关闭", exact:true}).click();
      await expect(evidence).toBeFocused();
      await expect(target).toBeVisible();
    }
    await page.locator('[data-biographies="collapse"]').click();
    await expect(page.locator(".biography-disclosure[open]")).toHaveCount(0);
    const next = page.locator('.chapter-nav [data-jump="chapter-2"]');
    await next.click();
    await expect(page.locator("#chapter-2 details")).toHaveAttribute("open", "");
    await expect(page.locator("#chapter-2")).toBeFocused();
    const summary = page.locator("#chapter-2 summary");
    await summary.focus(); await page.keyboard.press("Escape");
    await expect(page.locator("#chapter-2 details")).not.toHaveAttribute("open", "");
    await expect(summary).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("#chapter-2 details")).toHaveAttribute("open", "");
    await next.click();
    await expect(page.locator("#chapter-2 details")).toHaveAttribute("open", "");
    await page.setViewportSize({width:1000,height:1000});
    await expect(page.locator("#chapter-2 details")).toHaveAttribute("open", "");
    await page.setViewportSize({width:1440,height:1050});
    passed.push(`${personId}: chapter disclosures, nav opening, repeated keyboard/Escape, resize, figure evidence and alt text`);
  }
  for (const theme of ["light","dark"]) {
    await page.emulateMedia({colorScheme:theme});
    for (const width of [1440,390,320]) {
      await page.setViewportSize({width,height:width===1440?1050:844});
      for (const figure of biographyFigures) {
        await goto(figure.personId);
        const target = await openFigure(figure);
        await target.scrollIntoViewIfNeeded();
        assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${figure.id} ${theme} ${width}`);
        if (figure.kind !== "photo") {
          const visible = target.getByRole("img");
          await expect(visible).toHaveCount(1);
          const bounds = await visible.boundingBox();
          assert.ok(bounds && bounds.width > 150 && bounds.width <= width);
        }
        if (width !== 320 && ["ilya-sutskever","demis-hassabis","bret-taylor","fidji-simo"].includes(figure.personId)) {
          await target.evaluate(el=>el.scrollIntoView({block:"start",behavior:"instant"}));
          await page.screenshot({animations:"disabled",path:path.join(out,`illustrated-${figure.personId}-${theme}-${width===1440?"desktop":"mobile"}.png`)});
        }
      }
      passed.push(`${theme} ${width}px: all figures readable, one accessible diagram, no overflow`);
    }
  }
  await goto("sam-altman");
  await page.locator('[data-biographies="expand"]').click();
  await page.locator('.chapter-nav [data-jump="chapter-3"]').click();
  await page.locator('.wordmark').click();
  await page.goBack();
  await expect(page.locator("h1")).toHaveText("Sam Altman");
  await expect(page.locator(".biography-disclosure[open]")).toHaveCount(profiles["sam-altman"].chapters.length);
  await page.goForward();
  await expect(page.locator(".atlas-map")).toHaveCount(1);
  passed.push("navigation and Back/Forward retain person-specific reading state");
  assert.deepEqual(errors,[]);
  const result={date:new Date().toISOString(),browser:browser.version(),passed,errors};
  await fs.writeFile(path.join(out,"illustrations-results.json"),JSON.stringify(result,null,2)+"\n");
  console.log(JSON.stringify(result,null,2));
} finally { await browser.close(); await server.close(); }
