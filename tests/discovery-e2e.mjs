import { expect } from "@playwright/test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { browserHarness } from "./browser-harness.mjs";
import { events, sources } from "../src/data.ts";
import { profiles } from "../src/profiles.ts";
import { writings, writingSource } from "../src/writings.ts";

// Exercise the built app through reader-visible controls. These expectations
// intentionally do not import the search implementation or its ranking helpers.
const browsers = process.argv.slice(2).length ? process.argv.slice(2) : ["chromium", "webkit"];
for (const name of browsers) assert.ok(["chromium", "webkit"].includes(name), `Unknown browser ${name}`);
const viewports = [{ width: 1440, height: 1000 }, { width: 390, height: 844 }, { width: 320, height: 844 }];
const exactMatches = [
  ["Sam Altman", "#/person/sam-altman"],
  ["ChatGPT", "#/entity/chatgpt"],
  ["GPT-4", "#/entity/gpt4"],
  ["Codex", "#/entity/codex"],
  ["Tibo", "#/person/thibault-sottiaux"],
];
const samChapterRoute = "#/person/sam-altman?section=chapter-1";
const samWritingRoute = "#/person/sam-altman?section=writing-sam-intelligence-age";
const gymChapterIndex = profiles["greg-brockman"].chapters.findIndex(chapter => chapter.sourceIds.includes("openai-gym-paper"));
assert.ok(gymChapterIndex >= 0, "The nonfeatured Gym paper must have an existing biography passage");
const gymTarget = `chapter-${gymChapterIndex + 1}`;
const gymRoute = `#/person/greg-brockman?section=${gymTarget}`;
const event = events.find(item => item.id === "codex-agent-preview");
assert.ok(event, "The Codex release event fixture must exist");
const eventTarget = `event-${event.id}`;
const eventRoute = `#/timeline?section=${eventTarget}`;
const passed = [];

for (const browserName of browsers) {
  const harness = await browserHarness({ browserName, production: true });
  const { browser, base, outputDir, close } = harness;
  const errors = [];
  let scenario = "startup";
  try {
    await harness.context.close();
    for (const colorScheme of ["light", "dark"]) {
      for (const viewport of viewports) {
        scenario = `${browserName}-${colorScheme}-${viewport.width}`;
        const context = await browser.newContext({ viewport, colorScheme, reducedMotion: "reduce", hasTouch: viewport.width < 768 });
        const page = await context.newPage();
        page.setDefaultTimeout(10_000);
        page.setDefaultNavigationTimeout(20_000);
        page.on("pageerror", error => errors.push(`${scenario}: ${error.message}`));
        page.on("response", response => {
          if (response.url().startsWith(base) && response.status() >= 400) errors.push(`${scenario}: ${response.status()} ${response.url()}`);
        });
        const screenshot = label => page.screenshot({ path: path.join(outputDir, `discovery-${scenario}-${label}.png`), animations: "disabled" });
        const capture = (colorScheme === "light" && viewport.width === 1440) || (colorScheme === "dark" && viewport.width === 320);
        async function settled() {
          await page.waitForFunction(() => document.documentElement.dataset.route === location.hash);
          await page.evaluate(() => document.fonts.ready);
          await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
        }
        async function goto(route = "#/") { await page.goto(`${base}${route}`); await settled(); }
        async function searchFor(query) {
          if (!await page.getByRole("dialog").count()) await page.keyboard.press("/");
          const input = page.locator("#atlas-search");
          await expect(input).toBeFocused();
          await input.fill(query);
          return input;
        }
        async function openFirst(query, route, target = "main") {
          const input = await searchFor(query);
          await expect(page.locator(".search-result").first()).toHaveAttribute("href", route);
          await input.press("Enter");
          await expect(page).toHaveURL(`${base}${route}`);
          await settled();
          await expect(page.getByRole("dialog")).toHaveCount(0);
          await expect(page.locator(target)).toBeFocused();
        }
        async function verifyTarget(route, id, disclosure) {
          await expect(page).toHaveURL(`${base}${route}`);
          await settled();
          const target = page.locator(`#${id}`);
          await expect(target).toBeFocused();
          if (disclosure) await expect(page.locator(disclosure)).toHaveJSProperty("open", true);
          const geometry = await target.evaluate(element => ({ top: element.getBoundingClientRect().top, height: innerHeight }));
          assert.ok(geometry.top >= -1 && geometry.top < geometry.height * 0.6, `${scenario}: ${id} must land in view, top=${geometry.top}`);
          assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${scenario}: page overflow at ${route}`);
        }
        async function verifyDrawer(trigger, ids) {
          const route = page.url();
          const historyLength = await page.evaluate(() => history.length);
          const expectedUrls = ids.map(id => sources.find(source => source.id === id)?.url).sort();
          assert.ok(expectedUrls.every(Boolean), "All expected citation sources must resolve");
          for (const dismissal of ["escape", "close"]) {
            await trigger.focus();
            await page.keyboard.press("Enter");
            const dialog = page.getByRole("dialog");
            await expect(dialog).toBeVisible();
            assert.deepEqual(await dialog.locator(".sources-list a").evaluateAll(links => links.map(link => link.href).sort()), expectedUrls);
            const controls = dialog.locator("button,a");
            await controls.last().focus(); await page.keyboard.press("Tab");
            await expect(controls.first()).toBeFocused();
            await page.keyboard.press("Shift+Tab");
            await expect(controls.last()).toBeFocused();
            if (dismissal === "escape") await page.keyboard.press("Escape");
            else await dialog.getByRole("button", { name: "关闭", exact: true }).click();
            await expect(dialog).toHaveCount(0);
            await expect(trigger).toBeFocused();
            assert.equal(page.url(), route, "Evidence must preserve the discovery deep link");
            assert.equal(await page.evaluate(() => history.length), historyLength, "Evidence must not add navigation history");
          }
        }
        try {
          await goto();
          for (const [query, route] of exactMatches) {
            await searchFor(query);
            await expect(page.locator(".search-result").first()).toHaveAttribute("href", route);
          }
          // Composition-confirmation keys belong to the IME, not Atlas. Test
          // both the standard flag and the legacy 229 fallback independently.
          const input = await searchFor("Sam Altman");
          const beforeComposition = page.url();
          for (const key of ["Enter", "ArrowDown", "ArrowUp"]) {
            for (const composition of [{ isComposing: true, keyCode: key === "Enter" ? 13 : 40 }, { isComposing: false, keyCode: 229 }]) {
              await input.evaluate((element, init) => element.dispatchEvent(new KeyboardEvent("keydown", { key: init.key, code: init.key, ...init.composition, bubbles: true, cancelable: true })), { key, composition });
              await expect(input).toBeFocused();
              await expect(page.getByRole("dialog")).toBeVisible();
              assert.equal(page.url(), beforeComposition, "IME confirmation must not navigate");
            }
          }
          await input.press("ArrowDown");
          await expect(page.locator(".search-result").first()).toBeFocused();
          await page.keyboard.press("ArrowUp");
          await expect(input).toBeFocused();
          await input.press("Enter");
          await expect(page).toHaveURL(`${base}#/person/sam-altman`);
          await settled();
          await expect(page.locator("main")).toBeFocused();
          // Re-selecting the current entity still needs a valid focus target.
          const samePageHistory = await page.evaluate(() => history.length);
          await openFirst("Sam Altman", "#/person/sam-altman");
          assert.equal(await page.evaluate(() => history.length), samePageHistory);
          passed.push(`${scenario}: exact names/alias rank first, keyboard navigation, IME protection, same-entity focus`);

          await searchFor("Sam Altman");
          await page.locator('[data-search-kind="product"]').click();
          await expect(page.locator(".search-result")).toHaveCount(0);
          await page.getByRole("button", { name: "查看全部分类", exact: true }).click();
          await expect(page.locator("#atlas-search")).toHaveValue("Sam Altman");
          await expect(page.locator('[data-search-kind="all"]')).toHaveAttribute("aria-pressed", "true");
          await expect(page.locator(".search-result").first()).toHaveAttribute("href", "#/person/sam-altman");
          await page.locator("#atlas-search").focus();
          await page.locator("#atlas-search").fill("Green Dot");
          await expect(page.locator(".search-result").first()).toContainText("Green Dot");
          const dialog = page.getByRole("dialog");
          assert.ok(await dialog.evaluate(element => element.scrollWidth <= element.clientWidth), `${scenario}: search dialog overflow`);
          if (capture) await screenshot("search");
          await openFirst("Green Dot", samChapterRoute, "#chapter-1");
          await verifyTarget(samChapterRoute, "chapter-1", "#biography-1");
          await expect(page.locator("#chapter-1 .biography-more")).toContainText("Green Dot");
          await verifyDrawer(page.locator("#chapter-1 .profile-citation").nth(2), profiles["sam-altman"].chapters[0].paragraphSourceIds[2]);
          await openFirst("Green Dot", samChapterRoute, "#chapter-1");
          if (capture) await screenshot("passage");
          passed.push(`${scenario}: filtered-empty recovery, full-text passage landing, repeated evidence and target focus`);

          await openFirst("The Intelligence Age", samWritingRoute, "#writing-sam-intelligence-age");
          await verifyTarget(samWritingRoute, "writing-sam-intelligence-age");
          const original = page.locator('#writing-sam-intelligence-age a[href="https://ia.samaltman.com/"]');
          await expect(original).toHaveAttribute("target", "_blank");
          await expect(original).toHaveAttribute("rel", "noopener noreferrer");
          await openFirst(event.title, eventRoute, `#${eventTarget}`);
          await verifyTarget(eventRoute, eventTarget);
          await verifyDrawer(page.locator(`#${eventTarget} [data-sources]`), event.sourceIds);
          await page.goBack(); await verifyTarget(samWritingRoute, "writing-sam-intelligence-age");
          await page.goBack(); await verifyTarget(samChapterRoute, "chapter-1", "#biography-1");
          await page.goForward(); await verifyTarget(samWritingRoute, "writing-sam-intelligence-age");
          await page.reload(); await verifyTarget(samWritingRoute, "writing-sam-intelligence-age");
          const sameTargetHistory = await page.evaluate(() => history.length);
          await openFirst("The Intelligence Age", samWritingRoute, "#writing-sam-intelligence-age");
          assert.equal(await page.evaluate(() => history.length), sameTargetHistory);
          passed.push(`${scenario}: exact writing/event landing, Back/Forward, refresh and repeated deep-link selection`);

          await openFirst("OpenAI Gym", gymRoute, `#${gymTarget}`);
          await verifyTarget(gymRoute, gymTarget, `#biography-${gymChapterIndex + 1}`);
          const gymUrl = writingSource(writings.find(writing => writing.sourceId === "openai-gym-paper")).url;
          await expect(page.locator(`#${gymTarget} .writing-inline[href="${gymUrl}"]`)).toBeVisible();
          await page.reload(); await verifyTarget(gymRoute, gymTarget, `#biography-${gymChapterIndex + 1}`);
          await page.keyboard.press("Tab");
          assert.ok(await page.locator(`#${gymTarget}`).evaluate(element => element.contains(document.activeElement)), "Keyboard reading should continue inside the discovered passage");
          passed.push(`${scenario}: nonfeatured original opens its existing chapter, including refresh and keyboard continuation`);

          // Check every original once per engine without inflating every mobile
          // scenario. The destination must actually contain that original link.
          if (colorScheme === "light" && viewport.width === 1440) {
            assert.equal(writings.length, 21, "The existing 21-writing catalogue is the discovery baseline");
            for (const writing of writings) {
              const input = await searchFor(writing.title);
              const hit = page.locator(".search-result").first();
              await expect(hit).toContainText(writing.title);
              const href = await hit.getAttribute("href");
              const url = new URL(href.slice(1), "https://atlas.example");
              const authorId = url.pathname.split("/")[2];
              assert.ok(writing.personIds.includes(authorId), `${writing.title}: result must belong to a credited author`);
              const section = url.searchParams.get("section");
              assert.ok(section, `${writing.title}: result must carry a passage target`);
              await input.press("Enter");
              await expect(page).toHaveURL(`${base}${href}`);
              await settled();
              const target = page.locator(`[id="${section}"]`);
              await expect(target).toBeFocused();
              await expect(target.locator(`a[href="${writingSource(writing).url}"]`).first()).toBeVisible();
            }
            passed.push(`${scenario}: every one of 21 original writings resolves to its actual reading link`);

            for (const [route, normalized, heading] of [
              ["#/person/sam-altman?section=missing-chapter", "#/person/sam-altman", "Sam Altman"],
              [`#/person/sam-altman?section=${encodeURIComponent('<img src=x onerror="alert(1)">')}`, "#/person/sam-altman", "Sam Altman"],
              ["#/person/sam-altman?section=main", "#/person/sam-altman", "Sam Altman"],
              ["#/company/openai?section=event-codex-agent-preview", "#/company/openai", "OpenAI"],
            ]) {
              await goto(route);
              await expect(page).toHaveURL(`${base}${normalized}`);
              await expect(page.locator("h1")).toHaveText(heading);
              await expect(page.locator('img[src="x"]')).toHaveCount(0);
              await expect(page.getByRole("dialog")).toHaveCount(0);
            }
            passed.push(`${scenario}: invalid, HTML and nonreading targets are removed safely from the route`);

            // A coauthor can have a catalogue source without an inline title.
            // Its fallback must land on that author's actual source row.
            const fallbackRoute = "#/person/dario-amodei?section=source-amplification-2018";
            await goto(fallbackRoute);
            await verifyTarget(fallbackRoute, "source-amplification-2018");
            await expect(page.locator('#source-amplification-2018 a[href="https://arxiv.org/abs/1810.08575"]')).toBeVisible();
            await searchFor("Supervising strong learners by amplifying weak experts");
            const coauthorResult = page.locator(`.search-result[href="${fallbackRoute}"]`);
            await expect(coauthorResult).toContainText("Dario Amodei");
            await coauthorResult.click();
            await verifyTarget(fallbackRoute, "source-amplification-2018");
            passed.push(`${scenario}: coauthored writing without an inline mention has an exact source-row fallback`);

            await searchFor("OpenAI Gym");
            const originalSearchRoute = page.url();
            const popupPromise = context.waitForEvent("page");
            await page.locator(".search-result").first().click({ modifiers: ["Control"] });
            const popup = await popupPromise;
            try {
              await popup.waitForLoadState();
              await expect(popup).toHaveURL(`${base}${gymRoute}`);
              await expect(popup.locator(`#${gymTarget}`)).toBeFocused();
              await expect(popup.locator(`#biography-${gymChapterIndex + 1}`)).toHaveJSProperty("open", true);
              await expect(page.getByRole("dialog")).toBeVisible();
              await expect(page.locator("#atlas-search")).toHaveValue("OpenAI Gym");
              assert.equal(page.url(), originalSearchRoute, "Modified clicks must preserve the original reading page");
            } finally { await popup.close(); }
            await page.keyboard.press("Escape");
            passed.push(`${scenario}: Ctrl-click opens a contextual new tab while retaining the original search`);

            // TOC choices are shareable but replace the current reading address;
            // stepping through a long profile must not fill the Back stack.
            await goto("#/person/sam-altman");
            const tocHistoryLength = await page.evaluate(() => history.length);
            for (const chapter of [2, 4]) {
              await page.locator(`.chapter-nav [data-jump="chapter-${chapter}"]`).click();
              await verifyTarget(`#/person/sam-altman?section=chapter-${chapter}`, `chapter-${chapter}`, `#biography-${chapter}`);
              assert.equal(await page.evaluate(() => history.length), tocHistoryLength, "TOC navigation should replace the current history entry");
            }
            await page.reload();
            await verifyTarget("#/person/sam-altman?section=chapter-4", "chapter-4", "#biography-4");
            assert.equal(await page.evaluate(() => history.length), tocHistoryLength);
            passed.push(`${scenario}: TOC addresses update without extra Back entries and refresh opens the shared chapter`);
          }
          console.log(`PASS ${scenario}: discovery, contextual reading and keyboard regressions`);
        } catch (error) {
          await screenshot("failure").catch(() => {});
          throw error;
        } finally { await context.close(); }
      }
    }
    assert.deepEqual(errors, []);
    const result = { date: new Date().toISOString(), browser: browserName, version: browser.version(), mode: "production dist", passed: passed.filter(item => item.startsWith(`${browserName}-`)), errors };
    await fs.writeFile(path.join(outputDir, `discovery-${browserName}.json`), JSON.stringify(result, null, 2) + "\n");
  } catch (error) {
    await fs.writeFile(path.join(outputDir, `discovery-${browserName}-failure.json`), JSON.stringify({ scenario, error: error.stack, passed, errors }, null, 2) + "\n");
    throw error;
  } finally { await close(); }
}
console.log(`All ${passed.length} discovery regression groups passed.`);
