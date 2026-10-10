import { expect } from "@playwright/test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { browserHarness } from "./browser-harness.mjs";
import { people, relationships, sources } from "../src/data.ts";
import { profiles } from "../src/profiles.ts";
import { featuredWritings, writingSource } from "../src/writings.ts";

// This is acceptance against the production bundle, not network-dependent
// editorial verification. External article responses are stubbed only to test
// the genuine new-tab, URL, opener isolation, and return-to-reader behavior.
const browsers = process.argv.slice(2).length ? process.argv.slice(2) : ["chromium", "webkit"];
for (const name of browsers) assert.ok(["chromium", "webkit"].includes(name), `Unknown browser ${name}`);
const viewports = [{ width: 1440, height: 1000 }, { width: 390, height: 844 }, { width: 320, height: 844 }];
const passed = [];

for (const browserName of browsers) {
  const harness = await browserHarness({ browserName, production: true });
  const { browser, base, outputDir, close } = harness;
  const errors = [];
  let activePage, scenario = "startup";
  try {
    // The default page is unused; scenarios each get isolated reading/theme state.
    await harness.context.close();
    for (const colorScheme of ["light", "dark"]) {
      for (const viewport of viewports) {
        scenario = `${browserName}-${colorScheme}-${viewport.width}`;
        const context = await browser.newContext({ viewport, colorScheme, reducedMotion: "reduce", hasTouch: viewport.width < 768 });
        const page = activePage = await context.newPage();
        page.setDefaultTimeout(10_000);
        page.setDefaultNavigationTimeout(20_000);
        page.on("pageerror", error => errors.push(`${scenario}: ${error.message}`));
        page.on("response", response => {
          if (response.url().startsWith(base) && response.status() >= 400) errors.push(`${scenario}: ${response.status()} ${response.url()}`);
        });
        const screenshot = async label => page.screenshot({ path: path.join(outputDir, `${scenario}-${label}.png`), animations: "disabled" });
        async function settled() {
          await page.waitForFunction(() => document.documentElement.dataset.route === location.hash);
          await page.evaluate(() => document.fonts.ready);
          await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
        }
        async function goto(route) { await page.goto(`${base}#${route}`); await settled(); }
        async function noOverflow() {
          assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${scenario}: horizontal overflow at ${page.url()}`);
        }
        async function expandDetails(selector) {
          const details = page.locator(selector);
          if (!await details.evaluate(element => element.open)) await details.locator("summary").click();
        }
        async function verifySources(trigger, sourceIds, capture) {
          const originalUrl = page.url();
          const expectedUrls = sourceIds.map(id => sources.find(source => source.id === id).url).sort();
          for (const dismissal of ["escape", "close"]) {
            await trigger.focus();
            await page.keyboard.press("Enter");
            const dialog = page.getByRole("dialog");
            await expect(dialog).toBeVisible();
            await expect(dialog).toHaveAttribute("aria-modal", "true");
            assert.deepEqual(await dialog.locator(".sources-list a").evaluateAll(links => links.map(link => link.href).sort()), expectedUrls);
            assert.ok(await dialog.evaluate(element => element.scrollWidth <= element.clientWidth));
            for (const link of await dialog.locator(".sources-list a").all()) {
              await expect(link).toHaveAttribute("target", "_blank");
              await expect(link).toHaveAttribute("rel", "noopener noreferrer");
            }
            const focusable = dialog.locator("button,a");
            await focusable.last().focus();
            await page.keyboard.press("Tab");
            await expect(focusable.first()).toBeFocused();
            await page.keyboard.press("Shift+Tab");
            await expect(focusable.last()).toBeFocused();
            if (capture && dismissal === "escape") await screenshot(capture);
            if (dismissal === "escape") await page.keyboard.press("Escape");
            else await dialog.getByRole("button", { name: "关闭", exact: true }).click();
            await expect(dialog).toHaveCount(0);
            await expect(trigger).toBeFocused();
            assert.equal(page.url(), originalUrl, "Opening evidence must not change route/history");
          }
        }
        try {
          // Journey 1: start with a company, discover a person, then return and
          // restore the same readable biography through native history/refresh.
          await goto("/");
          await page.locator('.home-company-grid .company-card[href="#/company/openai"]').click();
          await expect(page.locator("h1")).toHaveText("OpenAI");
          const companyUrl = page.url();
          await page.locator('.company-people .person-card[href="#/person/sam-altman"]').click();
          await expect(page.locator("h1")).toHaveText("Sam Altman");
          await expect(page.locator(".quick-facts > div")).toHaveCount(profiles["sam-altman"].facts.length);
          await page.locator('[data-biographies="expand"]').click();
          await expect(page.locator(".biography-disclosure[open]")).toHaveCount(profiles["sam-altman"].chapters.length);
          await verifySources(page.locator(".quick-facts .profile-citation").first(), profiles["sam-altman"].facts[0][2]);
          await verifySources(page.locator("#chapter-1 .profile-citation").first(), profiles["sam-altman"].chapters[0].paragraphSourceIds[0]);
          await noOverflow();
          await page.evaluate(() => scrollTo(0, 0));
          await screenshot("company-to-person");
          await page.goBack();
          await expect(page).toHaveURL(companyUrl);
          await expect(page.locator("h1")).toHaveText("OpenAI");
          await page.goForward();
          await expect(page.locator("h1")).toHaveText("Sam Altman");
          await expect(page.locator(".biography-disclosure[open]")).toHaveCount(profiles["sam-altman"].chapters.length);
          await page.reload(); await settled();
          await expect(page.locator("h1")).toHaveText("Sam Altman");
          await expect(page.locator(".quick-facts > div")).toHaveCount(profiles["sam-altman"].facts.length);
          await noOverflow();
          passed.push(`${scenario}: company → person, paragraph evidence, Back/Forward, refresh`);

          // Journey 2: select a historical relation deliberately. The exact
          // record and its source URLs survive closing evidence and deep reload.
          await goto("/company/openai");
          await page.locator('.tabs a[href$="tab=relationships"]').click();
          await expandDetails(".atlas-controls");
          await page.locator('[data-relation-filter="employment"]').click();
          await expandDetails(".atlas-controls");
          await page.locator('[data-relation-status="historical"]').click();
          if (await page.locator(".atlas-controls").evaluate(element => element.open)) await page.locator(".atlas-controls > summary").click();
          const relation = relationships.find(item => item.id === "ilya-openai-role");
          await page.locator('.graph-node[data-relation="ilya-openai-role"]').click();
          await expect(page.locator(".relation-detail .atlas-status")).toHaveText("历史记录");
          const relationUrl = page.url();
          const historyLength = await page.evaluate(() => history.length);
          await page.locator('.graph-node[data-relation="ilya-openai-role"]').click();
          assert.equal(await page.evaluate(() => history.length), historyLength);
          await expandDetails(".atlas-evidence-disclosure");
          await verifySources(page.getByRole("button", { name: "核对关联证据", exact: true }), relation.sourceIds, "relation-evidence");
          await noOverflow();
          await page.reload(); await settled();
          await expect(page).toHaveURL(relationUrl);
          await expect(page.locator(".graph-node.selected")).toHaveAttribute("data-relation", relation.id);
          await page.getByRole("link", { name: "阅读人物档案", exact: true }).click();
          await expect(page.locator("h1")).toHaveText("Ilya Sutskever");
          await page.goBack(); await settled();
          await expect(page).toHaveURL(relationUrl);
          await expect(page.locator(".graph-node.selected")).toHaveAttribute("data-relation", relation.id);
          await expect(page.getByRole("dialog")).toHaveCount(0);
          passed.push(`${scenario}: relation → exact evidence, focus trap, Escape/Close, history/refresh`);

          // Journey 3: biography → author's original writing, including an
          // inline title, isolated new tab, repeat open, and accessible return.
          await goto("/person/sam-altman");
          await page.locator('[data-biographies="expand"]').click();
          const writing = featuredWritings("sam-altman")[0];
          const originalUrl = writingSource(writing).url;
          await context.route(originalUrl, route => route.fulfill({ status: 200, contentType: "text/html", body: "<!doctype html><title>Original article test target</title><main>Original article navigation test</main>" }));
          const inline = page.locator(`.writing-inline[href="${originalUrl}"]`).first();
          await expect(inline).toBeVisible();
          let personUrl = page.url();
          for (const link of [inline, page.locator(`.writing-list h3 a[href="${originalUrl}"]`)]) {
            if (link !== inline) {
              await page.locator(".writings-jump").click();
              await expect(page.locator("#person-writings")).toBeFocused();
              assert.equal(new URL(page.url()).hash, "#/person/sam-altman?section=person-writings");
              await screenshot("bio-to-article");
            }
            personUrl = page.url();
            await expect(link).toHaveAttribute("target", "_blank");
            await expect(link).toHaveAttribute("rel", "noopener noreferrer");
            await expect(link).toHaveAttribute("aria-label", /新标签页/);
            await link.focus();
            await page.keyboard.press("Tab");
            await page.keyboard.press("Shift+Tab");
            await expect(link).toBeFocused();
            assert.notEqual(await link.evaluate(element => getComputedStyle(element).outlineStyle), "none");
            const popupPromise = context.waitForEvent("page");
            await page.keyboard.press("Enter");
            const popup = await popupPromise;
            try {
              await popup.waitForLoadState();
              assert.equal(popup.url(), originalUrl);
              assert.equal(await popup.evaluate(() => window.opener), null);
            } finally { await popup.close(); }
            await expect(link).toBeFocused();
            assert.equal(page.url(), personUrl);
          }
          await noOverflow();
          await page.locator('[data-biographies="collapse"]').click();
          await expect(page.locator(".biography-disclosure[open]")).toHaveCount(0);
          const screenStyle = await page.evaluate(() => ({ scheme: getComputedStyle(document.documentElement).colorScheme, background: getComputedStyle(document.body).backgroundColor }));
          await page.emulateMedia({ media: "print" });
          await expect.poll(() => page.evaluate(() => getComputedStyle(document.documentElement).colorScheme)).toBe("light");
          await expect(page.locator(".biography-more").last()).toBeVisible();
          await expect(page.locator(".figure-print-credit")).toBeVisible();
          await expect(page.locator(".figure-source")).toBeHidden();
          await expect(page.locator(".biography-controls")).toBeHidden();
          await expect(page.locator(".header")).toBeHidden();
          await expect(page.locator(".skip-link")).toBeHidden();
          await expect(page.locator(".chapter-nav")).toBeHidden();
          await expect(page.locator(".writing-list")).toBeVisible();
          await page.locator(".biography-figure").scrollIntoViewIfNeeded();
          await screenshot("print");
          if (browserName === "chromium" && colorScheme === "dark" && viewport.width === 1440) {
            await page.pdf({ path: path.join(outputDir, "reader-print-chromium-dark-desktop.pdf"), format: "A4", printBackground: false, margin: { top: "12mm", right: "12mm", bottom: "12mm", left: "12mm" } });
          }
          await page.emulateMedia({ media: "screen" });
          await expect.poll(() => page.evaluate(() => ({ scheme: getComputedStyle(document.documentElement).colorScheme, background: getComputedStyle(document.body).backgroundColor }))).toEqual(screenStyle);
          await expect(page.locator(".biography-disclosure[open]")).toHaveCount(0);
          await expect(page.locator(".figure-print-credit")).toBeHidden();
          // Native print events can fire alongside media-query changes. Repeated
          // entry/exit must restore a mixed state and never persist print's
          // temporary expansion into subsequent Back/Forward rendering.
          await page.locator("#biography-2 > summary").click();
          await settled();
          const readOpenState = () => page.locator(".biography-disclosure").evaluateAll(elements => elements.map(element => element.open));
          const mixedState = await readOpenState();
          assert.ok(mixedState.some(Boolean) && mixedState.some(open => !open));
          for (let repetition = 0; repetition < 2; repetition++) {
            await page.evaluate(() => window.dispatchEvent(new Event("beforeprint")));
            await expect(page.locator(".biography-disclosure[open]")).toHaveCount(profiles["sam-altman"].chapters.length);
            await page.evaluate(() => window.dispatchEvent(new Event("beforeprint")));
            await settled();
            await page.evaluate(() => window.dispatchEvent(new Event("afterprint")));
            await expect.poll(readOpenState).toEqual(mixedState);
            await page.evaluate(() => window.dispatchEvent(new Event("afterprint")));
            await expect.poll(readOpenState).toEqual(mixedState);
          }
          await page.locator(".wordmark").click();
          await expect(page.locator(".home-company-grid")).toBeVisible();
          await page.goBack(); await settled();
          await expect(page).toHaveURL(personUrl);
          await expect.poll(readOpenState).toEqual(mixedState);
          await page.reload(); await settled();
          await expect(page.locator(".writing-list > li")).toHaveCount(featuredWritings("sam-altman").length);
          passed.push(`${scenario}: biography → authored article, inline/list new tabs, return focus, print/state restoration, refresh`);

          // The two completed biographies are part of reader acceptance, even
          // without a new illustration or an attributed authored article.
          for (const id of ["brad-lightcap", "thibault-sottiaux"]) {
            await goto(`/person/${id}`);
            const profile = profiles[id];
            assert.ok(profile, `${id}: completed biography is required`);
            await expect(page.locator("h1")).toHaveText(people.find(person => person.id === id).name);
            await expect(page.locator(".quick-facts > div")).toHaveCount(profile.facts.length);
            await page.locator('[data-biographies="expand"]').click();
            await expect(page.locator(".biography-disclosure[open]")).toHaveCount(profile.chapters.length);
            await verifySources(page.locator("#chapter-1 .profile-citation").first(), profile.chapters[0].paragraphSourceIds[0]);
            await noOverflow();
            if ((colorScheme === "light" && viewport.width === 1440) || (colorScheme === "dark" && viewport.width === 390)) {
              await page.evaluate(() => scrollTo(0, 0));
              await screenshot(`${id}-overview`);
              await page.locator("#chapter-1").scrollIntoViewIfNeeded();
              await screenshot(`${id}-chapters`);
            }
          }
          console.log(`PASS ${scenario}: all three reader journeys and both completed biographies`);
        } catch (error) {
          await screenshot("failure").catch(() => {});
          throw error;
        } finally {
          await context.close();
          activePage = undefined;
        }
      }
    }
    assert.deepEqual(errors, []);
    const result = { date: new Date().toISOString(), browser: browserName, version: browser.version(), mode: "production dist", passed: passed.filter(item => item.startsWith(browserName)), errors };
    await fs.writeFile(path.join(outputDir, `reader-journeys-${browserName}.json`), JSON.stringify(result, null, 2) + "\n");
  } catch (error) {
    if (activePage && !activePage.isClosed()) await activePage.screenshot({ path: path.join(outputDir, `${scenario}-failure.png`) }).catch(() => {});
    await fs.writeFile(path.join(outputDir, `reader-journeys-${browserName}-failure.json`), JSON.stringify({ scenario, error: error.stack, passed, errors }, null, 2) + "\n");
    throw error;
  } finally { await close(); }
}
console.log(`All ${passed.length} reader-journey scenarios passed.`);
