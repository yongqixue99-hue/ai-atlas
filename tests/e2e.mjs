import { chromium } from "playwright";
import { expect } from "@playwright/test";
import { createServer } from "vite";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
const server = await createServer({
  server: { host: "127.0.0.1", port: 5181, strictPort: true },
});
await server.listen();
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const passed = [];
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
const base = "http://127.0.0.1:5181/";
const out = new URL("../docs/qa/", import.meta.url);
await fs.mkdir(out, { recursive: true });
async function check(name, fn) {
  await fn();
  passed.push(name);
  console.log("PASS", name);
}
async function goto(path = "") {
  await page.goto(base + path);
  await page.evaluate(() => document.fonts.ready);
}
try {
  await check("Company-first home and loaded assets", async () => {
    await goto();
    assert.match(await page.locator("h1").innerText(), /看见公司/);
    assert.equal(
      await page.locator(".home-company-grid .company-card").count(),
      3,
    );
    const images = await page
      .locator("img")
      .evaluateAll((els) => els.every((x) => x.complete && x.naturalWidth > 0));
    assert.ok(images);
    await page.screenshot({
      path: new URL("home-desktop.png", out).pathname,
      fullPage: true,
    });
  });
  await check("Skip-to-content keeps the current route", async () => {
    await page.locator(".skip-link").focus();
    await page.keyboard.press("Enter");
    assert.equal(await page.locator(".hero").count(), 1);
    assert.equal(await page.evaluate(() => document.activeElement?.id), "main");
  });
  await check("OpenAI dossier primary navigation", async () => {
    await page.getByRole("link", { name: "探索 OpenAI" }).click();
    await expect(page).toHaveTitle(/OpenAI/);
    assert.equal(await page.locator(".tabs a").count(), 6);
    await page.locator('.tabs a[href*="relationships"]').click();
    await expect(page.locator(".graph-node")).toHaveCount(5);
  });
  await check(
    "Relationship filtering, repeated selection, historical identity",
    async () => {
      await page
        .getByRole("button", { name: "人物与任职", exact: true })
        .click();
      assert.equal(await page.locator(".graph-node").count(), 5);
      await page.locator('[data-relation="ilya-openai-role"]').click();
      await page.locator('[data-relation="ilya-openai-role"]').click();
      assert.match(
        await page.locator(".relation-detail").innerText(),
        /Ilya Sutskever/,
      );
      assert.match(
        await page.locator(".relation-detail").innerText(),
        /2024|历史|前/,
      );
    },
  );
  await check("Evidence drawer close, Escape and focus restore", async () => {
    await page.getByRole("button", { name: "核对关联证据" }).click();
    assert.equal(await page.getByRole("dialog").count(), 1);
    assert.ok(
      await page.getByRole("dialog").locator('a[target="_blank"]').count(),
    );
    await page.keyboard.press("Escape");
    assert.equal(await page.getByRole("dialog").count(), 0);
    assert.equal(
      await page.evaluate(() => document.activeElement?.textContent?.trim()),
      "核对关联证据",
    );
    await page.getByRole("button", { name: "核对关联证据" }).click();
    await page.getByRole("button", { name: "关闭", exact: true }).click();
    assert.equal(await page.getByRole("dialog").count(), 0);
  });
  await check("Person journey, browser Back/Forward", async () => {
    await page.getByRole("link", { name: "阅读人物档案" }).click();
    await expect(page.locator("h1")).toContainText("Ilya Sutskever");
    assert.ok((await page.locator(".milestones article").count()) > 1);
    await page.goBack();
    assert.equal(await page.locator(".explorer").count(), 1);
    await page.goForward();
    await expect(page.locator("h1")).toContainText("Ilya");
  });
  await check(
    "Governance and product facts have differentiated evidence",
    async () => {
      await goto("#/company/openai?tab=governance");
      assert.match(await page.locator(".fact-list").innerText(), /Foundation/);
      assert.match(await page.locator(".fact-list").innerText(), /Group PBC/);
      await goto("#/company/openai?tab=products");
      assert.match(await page.locator(".fact-list").innerText(), /ChatGPT/);
      assert.ok((await page.locator(".fact-list [data-sources]").count()) >= 3);
    },
  );
  await check(
    "Search across people, companies and products, no-results and escaping",
    async () => {
      await page.keyboard.press("/");
      await page.locator("#atlas-search").fill("ChatGPT");
      await page.locator('[data-search-kind="product"]').click();
      assert.match(
        await page.locator("#search-results").innerText(),
        /ChatGPT/,
      );
      await page.locator('.search-result[href="#/entity/chatgpt"]').click();
      await expect(page.locator("h1")).toContainText("ChatGPT");
      assert.equal(await page.getByRole("dialog").count(), 0);
      await page.keyboard.press("/");
      await page.locator("#atlas-search").fill("<img src=x onerror=alert(1)>");
      assert.match(
        await page.locator("#search-results").innerText(),
        /还没有找到/,
      );
      assert.equal(await page.locator("#search-results img").count(), 0);
      await page.keyboard.press("Escape");
    },
  );
  await check("Keyboard focus trap, repeated open and close", async () => {
    for (let n = 0; n < 3; n++) {
      await page.keyboard.press("/");
      await page.getByRole("button", { name: "关闭", exact: true }).focus();
      await page.keyboard.press("Shift+Tab");
      assert.equal(
        await page.evaluate(() =>
          Boolean(document.activeElement?.closest(".modal")),
        ),
        true,
      );
      await page.keyboard.press("Escape");
    }
    assert.equal(await page.getByRole("dialog").count(), 0);
  });
  await check("Company index filters and preview disclosure", async () => {
    await goto("#/companies");
    assert.equal(await page.locator(".company-card").count(), 9);
    await page.getByRole("button", { name: "精选概览", exact: true }).click();
    assert.equal(await page.locator(".company-card").count(), 8);
    await page.getByRole("button", { name: "深度档案", exact: true }).click();
    assert.equal(await page.locator(".company-card").count(), 1);
    await goto("#/company/anthropic");
    assert.match(await page.locator("main").innerText(), /精选概览/);
    assert.equal(await page.locator(".tabs").count(), 0);
  });
  await check("Topics URL state survives Back/Forward", async () => {
    await goto("#/topics");
    await page.locator('[data-topic="GPT"]').click();
    const selected = page.url();
    await page.locator('[data-topic="all"]').click();
    await page.goBack();
    assert.equal(page.url(), selected);
    assert.equal(
      await page.locator('[data-topic="GPT"]').getAttribute("aria-pressed"),
      "true",
    );
  });
  await check(
    "All routes render without crashes and external links are safe",
    async () => {
      for (const path of [
        "#/companies",
        "#/people",
        "#/explore",
        "#/topics",
        "#/timeline",
        "#/sources",
        "#/about",
        "#/company/deepseek",
        "#/company/xai",
        "#/person/sam-altman",
        "#/person/greg-brockman",
        "#/person/mira-murati",
        "#/person/dario-amodei",
        "#/person/demis-hassabis",
        "#/entity/openai-foundation",
        "#/entity/openai-group-pbc",
        "#/entity/gpt4",
        "#/entity/openai-api",
      ]) {
        await goto(path);
        assert.ok(await page.locator("main").innerText(), path);
        const safe = await page
          .locator('a[target="_blank"]')
          .evaluateAll((els) =>
            els.every(
              (e) => e.rel.includes("noopener") && e.rel.includes("noreferrer"),
            ),
          );
        assert.ok(safe, path);
      }
    },
  );
  await check(
    "Desktop, tablet and mobile layouts at 1440/1024/768/390/320px do not overflow",
    async () => {
      for (const width of [1440, 1024, 768, 390, 320]) {
        await page.setViewportSize({ width, height: 844 });
        for (const path of [
          "",
          "#/companies",
          "#/people",
          "#/company/openai",
          "#/company/openai?tab=relationships",
          "#/company/openai?tab=governance",
          "#/person/sam-altman",
          "#/topics",
          "#/timeline",
          "#/sources",
        ]) {
          await goto(path);
          const size = await page.evaluate(() => ({
            scroll: document.documentElement.scrollWidth,
            width: innerWidth,
          }));
          assert.ok(
            size.scroll <= size.width + 1,
            `${width} ${path}: ${JSON.stringify(size)}`,
          );
        }
      }
      await page.setViewportSize({ width: 390, height: 844 });
      await goto();
      await page.screenshot({
        path: new URL("home-mobile.png", out).pathname,
        fullPage: true,
      });
      await goto("#/company/openai?tab=relationships");
      await page
        .getByRole("button", { name: "人物与任职", exact: true })
        .click();
      await page.screenshot({
        path: new URL("relationships-mobile.png", out).pathname,
        fullPage: true,
      });
    },
  );
  await check(
    "Desktop graph, person, and evidence visual captures",
    async () => {
      await page.setViewportSize({ width: 1440, height: 1000 });
      await goto("#/company/openai?tab=relationships");
      await page
        .getByRole("button", { name: "人物与任职", exact: true })
        .click();
      await page.screenshot({
        path: new URL("relationships-desktop.png", out).pathname,
        fullPage: true,
      });
      await page.getByRole("button", { name: "核对关联证据" }).click();
      await page.screenshot({
        path: new URL("evidence-desktop.png", out).pathname,
        fullPage: true,
      });
      await page.keyboard.press("Escape");
      await goto("#/person/sam-altman");
      await page.screenshot({
        path: new URL("person-desktop.png", out).pathname,
        fullPage: true,
      });
    },
  );
  await check(
    "All relation types preserve selected state and scroll position",
    async () => {
      await goto("#/company/openai?tab=relationships");
      await page.locator('[data-relation-filter="all"]').click();
      assert.ok((await page.locator(".graph-node").count()) > 10);
      const last = page.locator(".graph-node").last();
      const id = await last.getAttribute("data-relation");
      await last.click();
      await expect(page.locator(`[data-relation="${id}"]`)).toHaveAttribute(
        "aria-pressed",
        "true",
      );
      assert.ok(
        (await page.locator(".graph-scroll").evaluate((el) => el.scrollTop)) >
          0,
      );
      for (const kind of [
        "governance",
        "investment",
        "product",
        "employment",
      ]) {
        await page.locator(`[data-relation-filter="${kind}"]`).click();
        assert.ok(await page.locator(".graph-node").count());
        assert.equal(await page.locator(".graph-node.selected").count(), 1);
      }
      await page.setViewportSize({ width: 390, height: 844 });
      await page.locator('[data-relation="greg-openai-role"]').click();
      await page.locator("[data-back-to-graph]").click();
      await expect(page.locator(".graph-node.selected")).toHaveAttribute(
        "data-relation",
        "greg-openai-role",
      );
      await page.setViewportSize({ width: 1440, height: 1000 });
    },
  );
  await check("Unknown routes recover and no runtime errors", async () => {
    await goto("#/company/not-in-atlas");
    assert.match(await page.locator("h1").innerText(), /还没有被收录/);
    await page.getByRole("link", { name: "浏览公司索引" }).click();
    await expect(page.locator(".company-card")).toHaveCount(9);
    assert.deepEqual(errors, []);
  });
  await fs.writeFile(
    new URL("test-results.json", out),
    JSON.stringify(
      {
        date: new Date().toISOString(),
        browser: await browser.version(),
        passed,
        errors,
      },
      null,
      2,
    ),
  );
  console.log(`All ${passed.length} end-to-end checks passed.`);
} finally {
  await browser.close();
  await server.close();
}
