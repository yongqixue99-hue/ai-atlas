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
const employmentCount = 5;
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
  // A hash-only navigation resolves before the hashchange handler renders, and a viewport change
  // re-renders on the next frame. Wait for both so checks never hold elements of a replaced page.
  await page.waitForFunction(() => document.documentElement.dataset.route === location.hash);
  await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  await page.evaluate(() => document.fonts.ready);
  await page.locator("main").evaluate(el => Promise.all(el.getAnimations({ subtree: true }).map(a => a.finished.catch(() => {}))));
}
async function openSettings() {
  const disclosure = page.locator(".atlas-controls");
  if (!(await disclosure.getAttribute("open"))) {
    if (!(await disclosure.evaluate(el => el.open))) await disclosure.locator("summary").click();
  }
}
async function graphControl(selector) {
  await openSettings();
  await page.locator(selector).click();
}
async function openEvidence() {
  const disclosure = page.locator(".atlas-evidence-disclosure");
  if (await disclosure.count() && !(await disclosure.evaluate(el => el.open))) await disclosure.locator("summary").click();
}
try {
  await check("Company-first home and loaded assets", async () => {
    await goto();
    assert.match(await page.locator("h1").innerText(), /看见公司/);
    assert.equal(
      await page.locator(".home-company-grid .company-card").count(),
      companyCount,
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
  await check("Relationship filtering, repeated selection, historical identity", async () => {
    await graphControl('[data-relation-filter="employment"]');
    await expect(page.locator(".graph-node")).toHaveCount(5);
    await graphControl('[data-relation-status="historical"]');
    await page.locator('[data-relation="ilya-openai-role"]').click();
    const count = await page.evaluate(() => history.length);
    await page.locator('[data-relation="ilya-openai-role"]').click();
    assert.equal(await page.evaluate(() => history.length), count);
    await expect(page.locator(".relation-detail")).toContainText("Ilya Sutskever");
    await expect(page.locator(".relation-detail .atlas-status")).toHaveText("历史记录");
  });
  await check("Evidence drawer close, Escape and focus restore", async () => {
    await openEvidence();
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
    await openEvidence();
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
      const original = page.url();
      await graphControl('[data-relation-status="recent"]');
      await page.locator('[data-relation="greg-openai-role"]').click();
      const greg = page.url();
      await graphControl('[data-relation-filter="product"]');
      const product = page.url();
      await page.goBack(); await expect(page).toHaveURL(greg);
      await expect(page.locator(".graph-node.selected")).toHaveAttribute("data-relation", "greg-openai-role");
      await page.goBack();
      await page.goBack(); await expect(page).toHaveURL(original);
      await expect(page.locator(".graph-node.selected")).toHaveAttribute("data-relation", "ilya-openai-role");
      await page.goForward(); await page.goForward(); await expect(page).toHaveURL(greg);
      await page.goForward(); await expect(page).toHaveURL(product);
      await page.reload(); await expect(page).toHaveURL(product);
      await expect(page.locator('[data-relation-filter="product"]')).toHaveAttribute("aria-pressed", "true");
    }
  });
  await check("Invalid graph state normalizes and legacy institution links retain actual endpoints", async () => {
    for (const route of ["/company/openai?tab=relationships&", "/explore?"]) {
      for (const query of ["filter=unknown&relation=bad", "filter=employment&relation=ilya-ssi-role", "filter=product&relation=greg-openai-role", "root=bad&filter=__proto__&status=bad&relation=%3Cscript%3E&page=-2"]) {
        await goto(`#${route}${query}`);
        await expect(page.locator(".graph-node.selected")).toHaveCount(1);
        const selected = await page.locator(".graph-node.selected").getAttribute("data-relation");
        const params = new URLSearchParams(page.url().split("?")[1]);
        assert.equal(params.get("relation"), selected);
        assert.equal(params.get("root"), "openai");
        assert.notEqual(selected, "ilya-ssi-role");
      }
      await goto(`#${route}relation=foundation-controls-group`);
      await expect(page.locator(".atlas-layout")).toHaveAttribute("data-root", "openai-foundation");
      await expect(page.locator(".relation-direction")).toHaveText("OpenAI Foundation → OpenAI Group PBC");
      await page.reload();
      await expect(page.locator(".graph-node.selected")).toHaveAttribute("data-relation", "foundation-controls-group");
      await page.locator('.header nav a[href="#/people"]').click();
      await page.locator('.header nav a[href="#/explore"]').click();
      await expect(page.locator('[data-relation-filter="employment"]')).toHaveAttribute("aria-pressed", "true");
    }
    await goto("#/company/anthropic?tab=relationships&filter=governance&relation=foundation-controls-group");
    await expect(page.locator(".explorer")).toHaveCount(0);
    assert.doesNotMatch(page.url(), /relation=|filter=/);
  });
  await check("Person context links center actual people and retain governance profile links", async () => {
    for (const person of people) {
      await goto(`#/person/${person.id}`);
      await page.getByRole("link", { name: "放回公司的脉络中阅读" }).click();
      await expect(page.locator(".atlas-layout")).toHaveAttribute("data-root", person.id);
      await expect(page.locator(".atlas-hub strong")).toHaveText(person.name);
      assert.match(page.url(), /root=.+&filter=all/);
    }
    const governancePeople = openaiRelations.filter(r => r.type === "governance" && !r.navigationOnly && people.some(p => p.id === r.from || p.id === r.to));
    for (const relation of governancePeople) {
      const person = people.find(p => p.id === relation.from || p.id === relation.to);
      await goto(`#/company/openai?tab=relationships&filter=governance&relation=${relation.id}`);
      await expect(page.locator(".relation-detail h3")).toHaveText(person.name);
      await expect(page.locator(".relation-detail a").first()).toHaveAttribute("href", `#/person/${person.id}`);
      await goto("#/company/openai?tab=governance");
      assert.ok(await page.locator(`.fact-list a[href="#/person/${person.id}"]`).count());
    }
  });
  await check("Fidji deduplication, all-record selection and accurate founder identity", async () => {
    await goto("#/explore?root=openai&filter=all&status=all&relation=fidji-openai-adviser");
    await expect(page.locator('[data-node="fidji-simo"]')).toHaveCount(1);
    await expect(page.locator('[data-relation-record] option')).toHaveCount(3);
    await openEvidence();
    for (const id of ["fidji-openai-applications-history", "fidji-openai-board-history", "fidji-openai-adviser"]) {
      await page.locator("[data-relation-record]").selectOption(id);
      const record = relationships.find(r => r.id === id);
      await expect(page.locator(".selected-role")).toHaveText(record.label);
      await expect(page.locator(".atlas-facts .date-label")).toHaveText(record.period);
      assert.match(page.url(), new RegExp(`relation=${id}`));
      await expect(page.locator(".atlas-source-card")).toHaveCount(record.sourceIds.length);
    }
    await goto("#/explore?root=openai&filter=all&status=all&relation=mira-openai-role");
    await expect(page.locator('[data-node="mira-murati"] .atlas-founder')).toHaveCount(0);
  });
  await check("Paul board roles, institutional control and strict endpoint geometry", async () => {
    for (const [id, root, endpoint] of [["paul-foundation-board", "openai-foundation", "OpenAI Foundation"], ["paul-group-observer", "openai-group-pbc", "OpenAI Group PBC"]]) {
      await goto(`#/company/openai?tab=relationships&relation=${id}`);
      await expect(page.locator(".atlas-layout")).toHaveAttribute("data-root", root);
      await expect(page.locator(".relation-direction")).toHaveText(`Paul Christiano → ${endpoint}`);
      await expect(page.locator(".selected-role")).toHaveText(relationships.find(r => r.id === id).label);
      const ids = await page.locator("[data-node]").evaluateAll(els => els.map(el => el.dataset.node));
      assert.ok(ids.every(id => relationships.some(r => (r.from === root && r.to === id) || (r.to === root && r.from === id))));
    }
    await graphControl('.atlas-root-switch [data-graph-root="openai-foundation"]');
    await page.locator('[data-node="openai-group-pbc"]').click();
    await expect(page.locator(".relation-direction")).toHaveText("OpenAI Foundation → OpenAI Group PBC");
  });
  await check("Tibo to Codex and Ilya to SSI recenter journeys preserve browser history", async () => {
    for (const [person, relation, next, destinationRelation] of [["thibault-sottiaux", "tibo-openai-role", "codex", "tibo-codex-role"], ["ilya-sutskever", "ilya-openai-role", "ssi", "ilya-ssi-role"]]) {
      await goto(`#/company/openai?tab=relationships&root=openai&filter=all&status=all&relation=${relation}`);
      const original = page.url();
      await page.locator(`.atlas-recenter[data-graph-root="${person}"]`).click();
      await expect(page.locator(".atlas-layout")).toHaveAttribute("data-root", person);
      assert.match(page.url(), /#\/explore\?/);
      await expect(page.locator(".atlas-person-timeline article")).toHaveCount(Math.min(people.find(p => p.id === person).milestones.length, 4));
      await page.locator(`[data-node="${next}"]`).click();
      await expect(page.locator(".graph-node.selected")).toHaveAttribute("data-relation", destinationRelation);
      await expect(page.locator(".atlas-status-note")).toContainText("不表示该职责已结束");
      const personState = page.url();
      await page.locator(`.atlas-recenter[data-graph-root="${next}"]`).click();
      await expect(page.locator(".atlas-layout")).toHaveAttribute("data-root", next);
      await page.goBack(); await expect(page).toHaveURL(personState);
      await page.reload(); await expect(page).toHaveURL(personState);
      await page.goBack(); await page.goBack(); await expect(page).toHaveURL(original);
    }
  });
  await check("OpenAI governance empty state directs readers to the actual institutions", async () => {
    await goto("#/company/openai?tab=relationships");
    await graphControl('[data-relation-filter="governance"]');
    await expect(page.locator(".graph-node")).toHaveCount(0);
    await expect(page.locator(".atlas-layout")).toHaveAttribute("data-root", "openai");
    await page.getByRole("link", {name:"查看 Foundation 的治理关系"}).click();
    await expect(page.locator(".atlas-layout")).toHaveAttribute("data-root", "openai-foundation");
    await expect(page.locator('[data-node="paul-christiano"]')).toHaveCount(1);
  });
  await check("Historical empty state and all release events remain readable", async () => {
    await goto("#/explore?root=openai&filter=product&status=historical");
    await expect(page.locator(".graph-node")).toHaveCount(0);
    await expect(page.locator(".atlas-empty")).toContainText("暂无已收录关系");
    await graphControl('[data-relation-status="all"]');
    for (const record of relationships.filter(r => r.status === "event")) {
      await page.locator(`[data-relation="${record.id}"]`).click();
      await expect(page.locator(".atlas-status")).toHaveText("发布事件");
      await expect(page.locator(".atlas-facts .date-label")).toHaveText(record.period);
    }
    await graphControl('[data-graph-reset]');
    await expect(page.locator(".graph-node")).toHaveCount(5);
    await expect(page.locator('[data-relation-status="recent"]')).toHaveAttribute("aria-pressed", "true");
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
          "#/explore?root=thibault-sottiaux&filter=all&relation=tibo-codex-role",
          "#/explore?root=openai-foundation&filter=all",
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
      await graphControl('[data-relation-filter="employment"]');
      await page.locator(".atlas-controls > summary").click();
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
      await graphControl('[data-relation-filter="employment"]');
      await page.locator(".atlas-controls > summary").click();
      await page.screenshot({
        path: new URL("relationships-desktop.png", out).pathname,
        fullPage: true,
      });
      await openEvidence();
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
  await check("Bounded pagination, list state, repeated focus and mobile adjacent detail", async () => {
    await goto("#/company/openai?tab=relationships&filter=all&status=all");
    await expect(page.locator(".graph-node")).toHaveCount(6);
    const stageHeight = await page.locator(".atlas-stage").evaluate(el => el.getBoundingClientRect().height);
    assert.equal(stageHeight, 500);
    await page.getByRole("button", { name: "下一页关联" }).click();
    assert.match(page.url(), /page=2/);
    assert.ok(await page.locator(".graph-node").count() <= 6);
    const id = await page.locator(".graph-node.selected").getAttribute("data-relation");
    const before = await page.evaluate(() => ({history:history.length,y:scrollY}));
    await page.locator(`[data-relation="${id}"]`).click(); await page.keyboard.press("Enter");
    assert.deepEqual(await page.evaluate(() => ({history:history.length,y:scrollY})), before);
    assert.equal(await page.evaluate(() => document.activeElement?.dataset.relation), id);
    await graphControl('[data-graph-view="list"]');
    await expect(page.locator(".atlas-stage")).toHaveAttribute("data-view", "list");
    const listUrl = page.url(); await page.reload(); await expect(page).toHaveURL(listUrl);
    await graphControl('[data-graph-view="graph"]'); await page.goBack();
    await expect(page.locator(".atlas-stage")).toHaveAttribute("data-view", "list");
    await openSettings();
    await page.locator('[data-relation-filter="all"]').scrollIntoViewIfNeeded();
    const count = await page.evaluate(() => history.length);
    await graphControl('[data-relation-filter="all"]'); await page.keyboard.press("Enter");
    assert.equal(await page.evaluate(() => history.length), count);
    assert.equal(await page.evaluate(() => document.activeElement?.dataset.relationFilter), "all");
    await page.emulateMedia({ reducedMotion:"reduce" });
    await page.setViewportSize({ width:390,height:844 });
    await goto("#/company/openai?tab=relationships");
    await expect(page.locator(".graph-node")).toHaveCount(4);
    await page.locator('[data-relation="greg-openai-role"]').click();
    const detailTop = await page.locator(".atlas-detail").evaluate(el => el.getBoundingClientRect().top);
    assert.ok(detailTop >= 0 && detailTop < 650, `Mobile selected detail top ${detailTop}`);
    assert.equal(await page.evaluate(() => document.activeElement?.id), "atlas-relation-detail");
    const gap = await page.evaluate(() => document.querySelector('.atlas-detail').getBoundingClientRect().top - document.querySelector('.atlas-graph-panel').getBoundingClientRect().bottom);
    assert.ok(gap >= 0 && gap <= 20);
    await page.locator('[data-back-to-graph]').click();
    assert.equal(await page.evaluate(() => document.activeElement?.dataset.relation), "greg-openai-role");
    await page.locator('[data-relation="greg-openai-role"]').click();
    assert.ok(await page.locator(".atlas-detail").evaluate(el => el.getBoundingClientRect().top < 650));
    await page.setViewportSize({width:1440,height:1000});
  });
  await check("Evidence action leads the quieter profile and recenter links", async () => {
    await goto("#/explore?root=thibault-sottiaux&filter=all&relation=tibo-codex-role");
    const primary = await page.locator(".atlas-evidence-disclosure > summary").evaluate(el => ({color:getComputedStyle(el).color,size:parseFloat(getComputedStyle(el).fontSize),weight:Number(getComputedStyle(el).fontWeight)}));
    const secondary = await page.locator(".atlas-detail-actions > a").evaluate(el => ({size:parseFloat(getComputedStyle(el).fontSize),background:getComputedStyle(el).backgroundColor}));
    assert.equal(primary.color, "rgb(35, 86, 71)");
    assert.ok(primary.size > secondary.size && primary.weight >= 600);
    assert.equal(secondary.background, "rgba(0, 0, 0, 0)");
  });
  await check("Source drawer closes on Back and root transitions", async () => {
    await goto("#/explore?root=thibault-sottiaux&filter=all&relation=tibo-codex-role");
    const before = page.url();
    await page.locator('.atlas-recenter[data-graph-root="codex"]').click();
    await openEvidence();
    await page.locator(".atlas-source-card").first().click();
    await expect(page.getByRole("dialog")).toHaveCount(1);
    await page.goBack(); await expect(page).toHaveURL(before);
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await openEvidence();
    await page.locator(".atlas-source-card").first().click();
    await page.keyboard.press("Escape");
    assert.equal(await page.evaluate(() => document.activeElement?.classList.contains("atlas-source-card")), true);
  });
  await check("Quiet graph defaults keep settings, evidence and explanatory copy closed", async () => {
    await goto("#/company/openai?tab=relationships");
    await expect(page.locator(".graph-node")).toHaveCount(5);
    for (const selector of [".atlas-controls-content", ".atlas-evidence-content", ".atlas-info-content"]) await expect(page.locator(selector)).toBeHidden();
    assert.equal(await page.locator(".atlas-node-meta, .atlas-node .atlas-founder, .atlas-disclaimer, .atlas-footnote").count(), 0);
    const metrics = await page.locator("main").evaluate(el => ({characters:el.innerText.replace(/\s/g, "").length,controls:[...el.querySelectorAll("a,button,input,select,summary")].filter(control => control.checkVisibility()).length,graphTop:el.querySelector(".atlas-stage").getBoundingClientRect().top}));
    assert.ok(metrics.characters < 420, JSON.stringify(metrics));
    assert.ok(metrics.controls <= 19, JSON.stringify(metrics));
    assert.ok(metrics.graphTop < 350, JSON.stringify(metrics));
    await page.locator(".atlas-info > summary").click();
    await expect(page.locator(".atlas-info-content")).toBeVisible();
    await expect(page.locator(".atlas-info-content")).toContainText("不是实时组织架构");
    await goto("#/explore?root=thibault-sottiaux&filter=all");
    await expect(page.locator(".atlas-timeline-content")).toBeHidden();
    await page.locator(".atlas-person-timeline > summary").click();
    await expect(page.locator(".atlas-timeline-content")).toBeVisible();
    await expect(page.locator(".atlas-person-timeline article")).toHaveCount(4);
  });
  await check("All 32 factual records expose dates, statuses and working source access on demand", async () => {
    const statusLabels = {current:"近期核验", historical:"历史记录", snapshot:"资料快照", event:"发布事件", navigation:"导航连接"};
    for (const record of relationships) {
      await goto(`#/explore?root=${record.from}&filter=all&status=all&relation=${record.id}`);
      await expect(page.locator(".atlas-evidence-content")).toBeHidden();
      await openEvidence();
      await expect(page.locator(".atlas-status")).toHaveText(statusLabels[record.status]);
      await expect(page.locator(".atlas-facts .date-label")).toHaveText(record.period);
      await expect(page.locator(".atlas-evidence-summary")).toHaveText(record.detail);
      await expect(page.locator(".atlas-source-card")).toHaveCount(record.sourceIds.length);
      await page.locator(".atlas-source-card").first().click();
      await expect(page.getByRole("dialog").locator('a[target="_blank"]')).toHaveCount(1);
      await page.keyboard.press("Escape");
      assert.equal(await page.evaluate(() => document.activeElement?.classList.contains("atlas-source-card")), true);
    }
  });
  await check("Disclosure closing, filtering, reset and history keep visible keyboard focus", async () => {
    await goto("#/company/openai?tab=relationships");
    await openSettings();
    await page.locator('[data-relation-status="historical"]').click();
    await expect(page.locator(".atlas-controls-content")).toBeVisible();
    assert.equal(await page.evaluate(() => document.activeElement?.dataset.relationStatus), "historical");
    await page.keyboard.press("Escape");
    await expect(page.locator(".atlas-controls-content")).toBeHidden();
    assert.equal(await page.evaluate(() => document.activeElement?.textContent?.trim().startsWith("浏览设置")), true);
    await openEvidence();
    await page.locator("[data-close-disclosure]").last().click();
    await expect(page.locator(".atlas-evidence-content")).toBeHidden();
    assert.equal(await page.evaluate(() => document.activeElement?.textContent?.trim().startsWith("查看依据")), true);
    await openEvidence();
    await page.locator(".graph-node.selected").click();
    await expect(page.locator(".atlas-evidence-content")).toBeHidden();
    await openEvidence();
    await graphControl("[data-graph-reset]");
    await expect(page.locator(".atlas-controls-content")).toBeHidden();
    await expect(page.locator(".atlas-evidence-content")).toBeHidden();
    assert.equal(await page.evaluate(() => document.activeElement?.textContent?.trim().startsWith("浏览设置")), true);
    await graphControl("[data-graph-reset]");
    await expect(page.locator(".atlas-controls-content")).toBeHidden();
    assert.equal(await page.evaluate(() => document.activeElement?.textContent?.trim().startsWith("浏览设置")), true);
    await openEvidence();
    await page.goBack();
    await expect(page.locator(".atlas-evidence-content")).toBeHidden();
    await expect(page.locator(".atlas-controls-content")).toBeHidden();
  });
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
