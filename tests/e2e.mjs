import { chromium } from "playwright";
import { expect } from "@playwright/test";
import { createServer } from "vite";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { companies, people, relationships, foundationBoard } from "../src/data.ts";
const openaiScope = new Set(["openai", "openai-foundation", "openai-group-pbc"]);
const openaiRelations = relationships.filter(
  (r) => openaiScope.has(r.from) || openaiScope.has(r.to),
);
const employmentCount = openaiRelations.filter((r) => r.type === "employment").length;
const companyCount = companies.length;
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
    await expect(page.locator(".graph-node")).toHaveCount(employmentCount);
  });
  await check(
    "Relationship filtering, repeated selection, historical identity",
    async () => {
      await page
        .getByRole("button", { name: "人物与任职", exact: true })
        .click();
      assert.equal(await page.locator(".graph-node").count(), employmentCount);
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
  await check("Graph deep links, reload and Back/Forward restore exact state", async () => {
    for (const route of ["/company/openai?tab=relationships&", "/explore?"]) {
      await goto(`#${route}filter=employment&relation=ilya-openai-role`);
      await expect(page.locator(".graph-node.selected")).toHaveAttribute("data-relation", "ilya-openai-role");
      await page.reload();
      await expect(page.locator(".relation-detail h3")).toHaveText("Ilya Sutskever");
      await expect(page.locator('[data-relation-filter="employment"]')).toHaveAttribute("aria-pressed", "true");
      const original = page.url();
      await page.locator('[data-relation="greg-openai-role"]').click();
      const greg = page.url();
      assert.match(greg, /relation=greg-openai-role/);
      await page.locator('[data-relation-filter="product"]').click();
      const product = page.url();
      await page.goBack();
      await expect(page).toHaveURL(greg);
      await expect(page.locator(".graph-node.selected")).toHaveAttribute("data-relation", "greg-openai-role");
      await expect(page.locator('[data-relation-filter="employment"]')).toHaveAttribute("aria-pressed", "true");
      await page.goBack();
      await expect(page).toHaveURL(original);
      await expect(page.locator(".graph-node.selected")).toHaveAttribute("data-relation", "ilya-openai-role");
      await page.goForward();
      await expect(page).toHaveURL(greg);
      await page.goForward();
      await expect(page).toHaveURL(product);
      await expect(page.locator('[data-relation-filter="product"]')).toHaveAttribute("aria-pressed", "true");
      await page.reload();
      await expect(page).toHaveURL(product);
    }
  });
  await check("Invalid and out-of-scope graph state recovers without leaking", async () => {
    for (const route of ["/company/openai?tab=relationships&", "/explore?"]) {
      for (const query of [
        "filter=unknown&relation=not-a-relation",
        "filter=employment&relation=ilya-ssi-role",
        "filter=product&relation=greg-openai-role",
        "filter=__proto__&relation=%3Cscript%3E",
      ]) {
        await goto(`#${route}${query}`);
        assert.equal(await page.locator(".graph-node.selected").count(), 1);
        const selected = await page.locator(".graph-node.selected").getAttribute("data-relation");
        const params = new URLSearchParams(page.url().split("?")[1]);
        assert.equal(params.get("relation"), selected);
        assert.ok(openaiRelations.some((r) => r.id === selected));
        assert.notEqual(selected, "ilya-ssi-role");
        assert.ok(["all", "employment", "governance", "investment", "product"].includes(params.get("filter")));
      }
      await goto(`#${route}relation=foundation-controls-group`);
      await expect(page.locator('[data-relation-filter="governance"]')).toHaveAttribute("aria-pressed", "true");
      await expect(page.locator(".relation-detail h3")).toHaveText("OpenAI Group PBC");
      await page.locator('.header nav a[href="#/people"]').click();
      await page.locator('.header nav a[href="#/explore"]').click();
      await expect(page.locator('[data-relation-filter="employment"]')).toHaveAttribute("aria-pressed", "true");
      await expect(page.locator(".graph-node.selected")).not.toHaveAttribute("data-relation", "foundation-controls-group");
    }
    await goto("#/company/anthropic?tab=relationships&filter=governance&relation=foundation-controls-group");
    assert.equal(await page.locator(".explorer").count(), 0);
    assert.doesNotMatch(page.url(), /relation=|filter=/);
  });
  await check("Person context links select that person and governance facts link profiles", async () => {
    const connected = people.filter((p) => openaiRelations.some((r) => r.from === p.id || r.to === p.id));
    for (const person of connected) {
      await goto(`#/person/${person.id}`);
      await page.getByRole("link", { name: "放回公司的脉络中阅读" }).click();
      await expect(page.locator(".relation-detail h3")).toHaveText(person.name);
      await expect(page.locator(".graph-node.selected")).toHaveCount(1);
      assert.match(page.url(), /filter=.+&relation=/);
    }
    const governancePeople = openaiRelations.filter((r) =>
      r.type === "governance" && !r.navigationOnly &&
      people.some((p) => p.id === r.from || p.id === r.to),
    );
    for (const relation of governancePeople) {
      const person = people.find((p) => p.id === relation.from || p.id === relation.to);
      await goto(`#/company/openai?tab=relationships&filter=governance&relation=${relation.id}`);
      await expect(page.locator(".relation-detail h3")).toHaveText(person.name);
      await expect(page.locator(".relation-direction")).toContainText(person.name);
      await expect(page.locator(".relation-detail a").first()).toHaveAttribute("href", `#/person/${person.id}`);
      await goto("#/company/openai?tab=governance");
      assert.ok(await page.locator(`.fact-list a[href="#/person/${person.id}"]`).count());
    }
  });
  await check(
    "Governance and product facts have differentiated evidence",
    async () => {
      await goto("#/company/openai?tab=governance");
      assert.match(await page.locator(".fact-list").innerText(), /Foundation/);
      assert.match(await page.locator(".fact-list").innerText(), /Group PBC/);
      const roster = page.locator("[data-board-roster]");
      await expect(roster.locator("li")).toHaveCount(foundationBoard.members.length);
      await expect(roster).toContainText(foundationBoard.verified);
      await expect(roster).toContainText("Group 董事与观察员身份需分别查证");
      for (const member of foundationBoard.members) {
        await expect(roster).toContainText(member.name);
        if (member.personId) await expect(roster.locator(`a[href="#/person/${member.personId}"]`)).toHaveCount(1);
      }
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
  await check("Person aliases find their profile through search", async () => {
    for (const person of people.filter((p) => p.aliases?.length)) {
      for (const alias of person.aliases) {
        await page.keyboard.press("/");
        await page.locator("#atlas-search").fill(alias);
        await page.locator('[data-search-kind="person"]').click();
        await expect(page.locator(`.search-result[href="#/person/${person.id}"]`)).toHaveCount(1);
        await page.locator(`.search-result[href="#/person/${person.id}"]`).click();
        await expect(page.locator("h1")).toHaveText(person.name);
        assert.equal(await page.getByRole("dialog").count(), 0);
      }
    }
  });
  await check("Mapped profile paragraphs expose their specific evidence", async () => {
    for (const person of people.filter((p) => p.paragraphSourceIds?.length)) {
      await goto(`#/person/${person.id}`);
      const citations = page.getByRole("button", { name: "本段依据" });
      await expect(citations).toHaveCount(person.paragraphSourceIds.filter((ids) => ids.length).length);
      const firstSources = person.paragraphSourceIds.find((ids) => ids.length);
      assert.equal(await citations.first().getAttribute("data-sources"), firstSources.join(","));
      await citations.first().click();
      await expect(page.getByRole("dialog").locator(".sources-list article")).toHaveCount(new Set(firstSources).size);
      await page.keyboard.press("Escape");
    }
  });
  await check("Organization and product pages expose their direct relationships", async () => {
    for (const id of ["codex", "openai-foundation", "openai-group-pbc"]) {
      await goto(`#/entity/${id}`);
      const direct = relationships.filter((r) => r.from === id || r.to === id);
      await expect(page.locator("[data-entity-relation]")).toHaveCount(direct.length);
      for (const relation of direct) {
        const article = page.locator(`[data-entity-relation="${relation.id}"]`);
        const counterpart = relation.from === id ? relation.to : relation.from;
        const route = people.some((p) => p.id === counterpart) ? "person" : companies.some((c) => c.id === counterpart) ? "company" : "entity";
        await expect(article.locator(`a[href="#/${route}/${counterpart}"]`)).toHaveCount(1);
        assert.equal(await article.locator("[data-sources]").getAttribute("data-sources"), relation.sourceIds.join(","));
      }
    }
  });
  await check("Company index filters and preview disclosure", async () => {
    await goto("#/companies");
    assert.equal(await page.locator(".company-card").count(), companyCount);
    await page.getByRole("button", { name: "精选概览", exact: true }).click();
    assert.equal(await page.locator(".company-card").count(), companies.filter((c) => c.coverage === "preview").length);
    await page.getByRole("button", { name: "深度档案", exact: true }).click();
    assert.equal(await page.locator(".company-card").count(), companies.filter((c) => c.coverage === "dossier").length);
    await goto("#/company/anthropic");
    assert.match(await page.locator("main").innerText(), /精选概览/);
    assert.equal(await page.locator(".tabs").count(), 0);
  });
  await check("Index filters survive reload and history with scoped validation", async () => {
    for (const [kind, choice, count, cards] of [
      ["companies", "preview", companies.filter((c) => c.coverage === "preview").length, ".company-card"],
      ["people", "openai", people.filter((p) => openaiRelations.some((r) => r.from === p.id || r.to === p.id)).length, ".person-card"],
    ]) {
      await goto(`#/${kind}?filter=${choice}`);
      await expect(page.locator(`[data-index-filter="${choice}"]`)).toHaveAttribute("aria-pressed", "true");
      await expect(page.locator(cards)).toHaveCount(count);
      await page.reload();
      await expect(page.locator(cards)).toHaveCount(count);
      await page.locator('[data-index-filter="all"]').click();
      await expect(page).toHaveURL(new RegExp(`${kind}\\?filter=all$`));
      await page.goBack();
      await expect(page.locator(`[data-index-filter="${choice}"]`)).toHaveAttribute("aria-pressed", "true");
      await expect(page.locator(cards)).toHaveCount(count);
      await page.goForward();
      await expect(page.locator('[data-index-filter="all"]')).toHaveAttribute("aria-pressed", "true");
      await goto(`#/${kind}?filter=${kind === "people" ? "preview" : "openai"}`);
      await expect(page.locator('[data-index-filter="all"]')).toHaveAttribute("aria-pressed", "true");
      assert.match(page.url(), /filter=all$/);
    }
    await goto("#/people?filter=openai");
    for (const id of ["ilya-sutskever", "mira-murati", "dario-amodei"]) {
      await expect(page.locator(`.person-card[href="#/person/${id}"]`)).toHaveCount(1);
    }
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
        ...people.map((p) => `#/person/${p.id}`),
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
      for (const person of people) {
        await goto(`#/person/${person.id}`);
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), person.name);
      }
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
      const beforeRepeated = await page.evaluate(() => ({
        history: history.length,
        graph: document.querySelector(".graph-scroll").scrollTop,
        y: scrollY,
      }));
      await page.locator(`[data-relation="${id}"]`).click();
      await page.keyboard.press("Enter");
      assert.deepEqual(await page.evaluate(() => ({
        history: history.length,
        graph: document.querySelector(".graph-scroll").scrollTop,
        y: scrollY,
      })), beforeRepeated);
      assert.equal(await page.evaluate(() => document.activeElement?.dataset.relation), id);
      await page.locator('[data-relation-filter="all"]').scrollIntoViewIfNeeded();
      const beforeFilter = await page.evaluate(() => ({
        history: history.length,
        graph: document.querySelector(".graph-scroll").scrollTop,
        y: scrollY,
      }));
      await page.locator('[data-relation-filter="all"]').click();
      await page.keyboard.press("Enter");
      assert.deepEqual(await page.evaluate(() => ({
        history: history.length,
        graph: document.querySelector(".graph-scroll").scrollTop,
        y: scrollY,
      })), beforeFilter);
      assert.equal(await page.evaluate(() => document.activeElement?.dataset.relationFilter), "all");
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
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.setViewportSize({ width: 390, height: 844 });
      await page.locator('[data-relation="greg-openai-role"]').click();
      const detailTop = await page.locator(".relation-detail").evaluate((el) => el.getBoundingClientRect().top);
      assert.ok(detailTop >= -1 && detailTop < 150, `Mobile selected detail top: ${detailTop}`);
      await page.locator("[data-back-to-graph]").click();
      await expect(page.locator(".graph-node.selected")).toHaveAttribute(
        "data-relation",
        "greg-openai-role",
      );
      assert.equal(await page.evaluate(() => document.activeElement?.dataset.relation), "greg-openai-role");
      await page.locator('[data-relation="greg-openai-role"]').click();
      assert.ok(await page.locator(".relation-detail").evaluate((el) => el.getBoundingClientRect().top < 150));
      await page.setViewportSize({ width: 1440, height: 1000 });
    },
  );
  await check("Unknown routes recover and no runtime errors", async () => {
    await goto("#/company/not-in-atlas");
    assert.match(await page.locator("h1").innerText(), /还没有被收录/);
    await page.getByRole("link", { name: "浏览公司索引" }).click();
    await expect(page.locator(".company-card")).toHaveCount(companyCount);
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
