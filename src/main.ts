import "./style.css";
import "./graph.css";
import { graphState, canonicalGraphParams, renderGraph, graphHref } from "./graph";
import type { GraphState } from "./graph";
import "./home.css";
import "./polish.css";
import "./map.css";
import "./front.css";
import "./refine.css";
import "./biographies.css";
import { biographyFigures, personFigures, renderBiographyFigure, renderFigureCredit } from "./illustrations";
import { renderMap, bindMap } from "./map";
import { profiles } from "./profiles";
import { searchAtlas, normalizeSearchQuery } from "./search";
import { personWritings, featuredWritings, writingSource, writingSegments, writingKindLabels } from "./writings";
import openaiLogo from "./assets/openai.svg?raw";
import anthropicLogo from "./assets/anthropic.svg?raw";
import deepmindLogo from "./assets/deepmind.svg?raw";
import deepseekLogo from "./assets/deepseek.svg?raw";
import metaLogo from "./assets/meta.svg?raw";
import microsoftLogo from "./assets/microsoft.svg?raw";
import xaiLogo from "./assets/xai.svg?raw";
import {
  companies,
  people,
  relationships,
  events,
  sources,
  datasetDate,
  additionalEntities,
  foundationBoard,
} from "./data";

type Company = (typeof companies)[number];
type Person = (typeof people)[number];
type Relationship = (typeof relationships)[number];
const app = document.querySelector<HTMLDivElement>("#app")!;
// Hash routes own their reading target; native reload restoration can otherwise
// override a newly expanded chapter after WebKit finishes loading.
history.scrollRestoration = "manual";
const arrow =
  '<span class="arrow-mark" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M6 18 18 6M6 6h12v12"/></svg></span>';
const searchIcon =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></svg>';
const themeIcon =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 3.5v17a8.5 8.5 0 0 0 0-17Z" fill="currentColor"/></svg>';
const globe =
  '<svg viewBox="0 0 44 44" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><circle cx="22" cy="22" r="19"/><ellipse cx="22" cy="22" rx="9" ry="19"/><path d="M4 15h36M4 29h36M22 3v38"/></svg>';
const esc = (s: unknown) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
const companyById = (id: string) => companies.find((c) => c.id === id);
const personById = (id: string) => people.find((p) => p.id === id);
const extraById = (id: string) => additionalEntities.find((e) => e.id === id);
const scopedRelations = (companyId: string) => {
  const scope = new Set(
    companyId === "openai"
      ? [companyId, "openai-foundation", "openai-group-pbc"]
      : [companyId],
  );
  return relationships.filter((r) => scope.has(r.from) || scope.has(r.to));
};
const sourceById = (id: string) => sources.find((s) => s.id === id);
const labels: Record<string, string> = {
  all: "全部关系",
  governance: "组织与治理",
  employment: "人物与任职",
  investment: "投资与合作",
  product: "产品与技术",
};
let companyTab = "overview";
let activeGraph: GraphState | null = null;
let selectedCompanyFilter = "all";
let topicFilter = "all";
let searchKind = "all";
let lastFocused: HTMLElement | null = null;
let chapterSpy: IntersectionObserver | null = null;
const biographyOpenState = new Map<string, boolean>();
const printMedia = matchMedia("print");
let biographyPrintState: Map<HTMLDetailsElement, boolean> | null = null;

// WebKit keeps closed native <details> hidden even when print CSS exposes their
// contents. Open them for printing, then restore the reader's exact screen state.
function setBiographyPrintMode(printing: boolean) {
  if (printing) {
    biographyPrintState ??= new Map();
    app.querySelectorAll<HTMLDetailsElement>(".biography-disclosure").forEach(disclosure => {
      if (!biographyPrintState!.has(disclosure)) biographyPrintState!.set(disclosure, disclosure.open);
      disclosure.open = true;
    });
  } else if (biographyPrintState) {
    for (const [disclosure, open] of biographyPrintState) {
      if (disclosure.isConnected) disclosure.open = open;
    }
    biographyPrintState = null;
  }
}
window.addEventListener("beforeprint", () => setBiographyPrintMode(true));
window.addEventListener("afterprint", () => setBiographyPrintMode(false));
printMedia.addEventListener("change", event => setBiographyPrintMode(event.matches));

function personContextHref(p: Person) {
  return graphHref(p.id);
}

const available = [
  "sam-altman",
  "greg-brockman",
  "mira-murati",
  "dario-amodei",
  "demis-hassabis",
  "bret-taylor",
  "fidji-simo",
];
function face(p: Person) {
  return `<span class="face portrait-${esc(p.id)}">${available.includes(p.id) ? `<img src="${import.meta.env.BASE_URL}assets/${esc(p.id)}.jpg" alt="">` : esc(p.initial)}</span>`;
}
const companyPeople = (companyId: string) => people.filter((p) => p.companyId === companyId);
function faceStack(companyId: string) {
  const list = companyPeople(companyId);
  return list.length
    ? `<span class="face-stack">${list.slice(0, 4).map(face).join("")}<span class="face-stack-note">${list.length === 1 ? esc(list[0].name) : `${esc(list[0].name)} 等 ${list.length} 位`}</span></span>`
    : "";
}
function portrait(p: Person, cls = "") {
  return `<div class="portrait ${cls} portrait-${esc(p.id)} ${available.includes(p.id) ? "" : "portrait-fallback"}">${available.includes(p.id) ? `<img src="${import.meta.env.BASE_URL}assets/${esc(p.id)}.jpg" alt="${esc(p.name)}" loading="lazy" onerror="this.style.display='none'">` : ""}<span class="portrait-initial" aria-hidden="true">${esc(p.initial)}</span><span class="portrait-caption">${esc(p.name.toUpperCase())} / PROFILE</span></div>`;
}
function brand(c: Company, cls = "") {
  return `<span class="brand brand-${esc(c.id)} ${cls}" aria-hidden="true">${({ openai: openaiLogo, anthropic: anthropicLogo, "google-deepmind": deepmindLogo, deepseek: deepseekLogo, "meta-ai": metaLogo, microsoft: microsoftLogo, xai: xaiLogo } as Record<string, string>)[c.id] || esc(c.initial)}</span>`;
}
function header(active = "") {
  return `<a class="skip-link" href="#main">跳至正文</a><header class="header"><a class="wordmark" href="#/" aria-label="AI Atlas 首页">AI Atlas</a><nav aria-label="主导航"><a href="#/companies" ${active === "companies" ? 'aria-current="page"' : ""}>公司</a><a href="#/people" ${active === "people" ? 'aria-current="page"' : ""}>人物</a><a href="#/explore" ${active === "explore" ? 'aria-current="page"' : ""}>图谱</a></nav><button class="search-trigger" data-action="search" aria-label="搜索公司、人物和关键词">${searchIcon}</button><button class="theme-toggle" data-action="theme" aria-label="切换浅色或深色外观">${themeIcon}</button></header>`;
}
function footer() {
  const column = (title: string, links: [string, string][]) => `<div><span>${title}</span>${links.map(([href, text]) => `<a href="${href}">${text}</a>`).join("")}</div>`;
  return `<footer class="footer site-footer"><div class="footer-lead"><a href="#/" class="footer-logo">AI Atlas</a><p>以公司为起点的中文 AI 百科。<br>连接人物、产品、治理与公开证据。</p></div><nav aria-label="页脚导航">${column("探索", [["#/companies", "公司"], ["#/people", "人物"], ["#/explore", "关系图谱"], ["#/timeline", "时间线"], ["#/topics", "专题"]])}${column("关于", [["#/about", "编辑原则"], ["#/sources", "来源索引"]])}</nav><p class="footer-meta"><span>独立百科 · 更新 ${esc(datasetDate)}</span><span>品牌图形仅作百科识别，不代表隶属或合作关系。</span></p></footer>`;
}
function sourceButton(ids: readonly string[], text = "查看来源") {
  return `<button class="text-link source-link" data-sources="${esc(ids.join(","))}">${text} ${arrow}</button>`;
}
function profileCitation(ids: readonly string[], label: string, mark = "↗") {
  return `<button class="profile-citation" data-sources="${esc(ids.join(","))}" aria-label="${esc(label)}" title="${esc(label)}">${esc(mark)}</button>`;
}
function sectionHeading(
  n: string,
  title: string,
  subtitle = "",
  href = "",
  link = "查看全部",
) {
  return `<div class="section-heading"><div><span class="section-no">${n}</span><h2>${title}</h2></div>${subtitle ? `<p>${subtitle}</p>` : ""}${href ? `<a class="text-link" href="${href}">${link} <span>→</span></a>` : ""}</div>`;
}
function companyCard(c: Company) {
  return `<a class="company-card" href="#/company/${esc(c.id)}"><div class="company-card-top">${brand(c)}<div><h3>${esc(c.name)}</h3><span class="company-category">${esc(c.category)}</span></div>${arrow}</div><p>${esc(c.tagline)}</p>${faceStack(c.id)}<div class="card-bottom"><span class="coverage ${c.coverage === "dossier" ? "complete" : ""}">${c.coverage === "dossier" ? "深度专题" : "精选概览"}</span><span>${esc(c.topics.slice(0, 2).join(" / "))}</span></div></a>`;
}
function personCard(p: Person) {
  return `<a class="person-card" href="#/person/${esc(p.id)}">${portrait(p)}<div class="person-copy"><span class="person-role">${esc(p.role)}</span><div class="person-card-title"><h3>${esc(p.name)}</h3>${arrow}</div><p>${esc(p.summary)}</p><span class="person-read">阅读人物档案 <span>→</span></span></div></a>`;
}
function heroCollage() {
  return renderMap({
    esc,
    brand: (id) => brand(companyById(id)!),
    face: (id) => face(personById(id)!),
  });
}
function frontHeading(title: string, note: string, href: string, link: string) {
  return `<div class="front-heading"><h2>${title}</h2><p>${note}</p><a href="${href}">${link} ${arrow}</a></div>`;
}
function home() {
  const moments = events.slice().sort((a, b) => a.date.localeCompare(b.date));
  return `${header()}<main id="main" class="home-page calm-home">
    <section class="hero"><div class="hero-copy"><h1>看见公司，<br>读懂 AI<span class="heading-dot">。</span></h1><p>从公司出发，认识塑造 AI 的人，<br>沿着有来源的连线继续读。</p><a class="button dark" href="#/company/openai">探索 OpenAI ${arrow}</a></div>${heroCollage()}</section>
    <section class="home-companies front-section">${frontHeading("公司", `${companies.length} 家机构。${companies.filter((c) => c.coverage === "dossier").length} 份深度档案，其余为精选概览。`, "#/companies", "公司索引")}<div class="home-company-grid ledger">${companies.map((c, i) => `<a class="company-card ledger-row" href="#/company/${esc(c.id)}"><span class="ledger-no">${String(i + 1).padStart(2, "0")}</span>${brand(c)}<div class="ledger-name"><h3>${esc(c.name)}</h3><small>${esc(c.category)} · ${c.coverage === "dossier" ? "深度档案" : "精选概览"}</small></div><p class="ledger-line">${esc(c.tagline)}</p><span class="ledger-meta">${esc(c.founded)}<br>${esc(c.location)}</span>${faceStack(c.id) || '<span class="face-stack is-empty">暂未收录人物</span>'}${arrow}</a>`).join("")}</div></section>
    <section class="front-section front-people">${frontHeading("人物", `${people.length} 位人物。角色依据标注日期的资料，不默认代表今天的任职。`, "#/people", "人物索引")}<div class="people-wall">${people.map((p) => `<a class="wall-person" href="#/person/${esc(p.id)}"><span class="wall-face">${face(p)}</span><span class="wall-copy"><strong>${esc(p.name)}</strong><small>${esc(p.role)}</small></span></a>`).join("")}</div></section>
    <section class="front-band">${frontHeading("关键时刻", `${moments.length} 个可追溯的节点，从 ${esc(moments[0].date.slice(0, 4))} 到 ${esc(moments[moments.length - 1].date.slice(0, 4))}。`, "#/timeline", "完整时间线")}<ol class="ribbon" tabindex="0" aria-label="按时间排列的关键时刻">${moments.map((e) => `<li><a href="#/timeline"><time datetime="${esc(e.date)}"><b>${esc(e.date.slice(0, 4))}</b>${esc(e.date.slice(5))}</time><strong>${esc(e.title)}</strong><span>${e.entityIds.slice(0, 2).map((id) => esc(relationshipName(id))).join(" / ")}</span></a></li>`).join("")}</ol></section>
    <section class="front-creed"><p>没有来源的关系，不画。<br>没有核验的现状，不猜。<br>未被覆盖的内容，留白。</p><a class="text-link" href="#/about">编辑原则 ${arrow}</a></section>
  </main>${footer()}`;
}
function breadcrumb(parts: { text: string; href?: string }[]) {
  return `<div class="breadcrumb"><a href="#/">首页</a>${parts.map((p) => `<span>/</span>${p.href ? `<a href="${p.href}">${esc(p.text)}</a>` : `<span>${esc(p.text)}</span>`}`).join("")}</div>`;
}
function indexPage(kind: "companies" | "people") {
  const isCompany = kind === "companies";
  return `${header(kind)}<main id="main">${breadcrumb([{ text: isCompany ? "公司索引" : "人物索引" }])}<section class="page-intro"><div class="eyebrow">THE ${isCompany ? "COMPANY" : "PEOPLE"} INDEX</div><h1>${isCompany ? "认识公司，理解方向。" : "认识推动变化的人。"}</h1><p>${isCompany ? "从研究实验室到产品公司，按线索探索 AI 生态。" : "沿着公开资料，阅读人物经历、具体贡献与组织之间的连接。"}</p></section><div class="index-toolbar"><div class="pills" aria-label="筛选">${(isCompany ? ["all", "dossier", "preview"] : ["all", "openai"]).map((v) => `<button data-index-filter="${v}" aria-pressed="${selectedCompanyFilter === v}">${v === "all" ? "全部" : v === "dossier" ? "深度档案" : v === "preview" ? "精选概览" : "OpenAI 关联"}</button>`).join("")}</div><span class="muted small">${isCompany ? companies.length + " 家组织" : people.length + " 位人物"} · 首版精选收录</span></div><div class="${isCompany ? "company-grid" : "people-grid index-people-grid"}" id="index-results">${
    isCompany
      ? companies
          .filter(
            (c) =>
              selectedCompanyFilter === "all" ||
              c.coverage === selectedCompanyFilter,
          )
          .map(companyCard)
          .join("")
      : people
          .filter(
            (p) =>
              selectedCompanyFilter === "all" ||
              scopedRelations("openai").some((r) => r.from === p.id || r.to === p.id),
          )
          .map(personCard)
          .join("")
  }</div><div class="quiet-note">${isCompany ? "深度档案包含完整专题与关系探索；精选概览只展示已核验的有限资料。" : "角色与经历均依据标注日期的资料呈现，不默认代表今天的任职状态。"}</div></main>${footer()}`;
}
function relationshipName(id: string) {
  return (
    personById(id)?.name ||
    companyById(id)?.name ||
    extraById(id)?.name ||
    (
      {
        chatgpt: "ChatGPT",
        gpt4: "GPT-4",
        "gpt-4": "GPT-4",
        "openai-foundation": "OpenAI Foundation",
        "openai-group": "OpenAI Group PBC",
      } as Record<string, string>
    )[id] ||
    id
  );
}
function relatedEntity(id: string) {
  const p = personById(id),
    c = companyById(id);
  return p
    ? `<a class="text-link" href="#/person/${esc(id)}">阅读人物档案 ${arrow}</a>`
    : c
      ? `<a class="text-link" href="#/company/${esc(id)}">阅读公司档案 ${arrow}</a>`
      : extraById(id)
        ? `<a class="text-link" href="#/entity/${esc(id)}">阅读条目 ${arrow}</a>`
        : "";
}
function entityConnections(entityId: string) {
  const relations = relationships.filter((r) => r.from === entityId || r.to === entityId);
  if (!relations.length) return "";
  return `<div class="content-heading"><h2>沿着关联，继续阅读。</h2><p>每条关系保留对应的时间、方向与资料。</p></div><div class="fact-list">${relations.map((r) => `<article data-entity-relation="${esc(r.id)}"><span class="date-label">${esc(r.period)} · ${labels[r.type]}</span><h3>${esc(relationshipName(r.from))} → ${esc(relationshipName(r.to))}</h3><span class="role-label">${esc(r.label)}</span><p>${esc(r.detail)}</p><div class="fact-actions">${relatedEntity(r.from === entityId ? r.to : r.from)}${sourceButton(r.sourceIds, "核对关联证据")}</div></article>`).join("")}</div>`;
}
function graphVisual(id: string) {
  const person = personById(id);
  if (person) return portrait(person, "atlas-avatar");
  const company = companyById(id);
  if (company) return `<span class="atlas-entity-symbol">${brand(company)}</span>`;
  const entity = extraById(id);
  return `<span class="atlas-entity-symbol ${entity?.type === "product" ? "is-product" : ""}" aria-hidden="true">${id === "codex" ? "›_" : id === "openai-foundation" || id === "openai-group-pbc" ? openaiLogo : esc(entity?.initial || id.slice(0, 2).toUpperCase())}</span>`;
}
function relationExplorer(_companyId = "openai") {
  if (!activeGraph) return "";
  return renderGraph(activeGraph, {
    esc, name: relationshipName, visual: graphVisual, profile: relatedEntity, sourceButton,
    sourceCards: (ids) => ids.map(id => {
      const source = sourceById(id);
      return source ? `<button class="atlas-source-card" data-sources="${esc(id)}"><span class="atlas-document-icon" aria-hidden="true">↗</span><span><strong>${esc(source.title)}</strong><small>${source.published ? `发布 ${esc(source.published)} · ` : ""}核验 ${esc(source.verified)}</small></span></button>` : "";
    }).join(""),
  });
}
const tabs = [
  ["overview", "概览"],
  ["relationships", "关系图谱"],
  ["governance", "组织治理"],
  ["products", "产品技术"],
  ["timeline", "时间线"],
  ["sources", "来源"],
];

function companyPage(c: Company) {
  return `${header("companies")}<main id="main" class="${companyTab === "relationships" ? "relationship-page" : ""}">${breadcrumb([{ text: "公司", href: "#/companies" }, { text: c.name }])}${companyTab === "relationships" ? `<section class="company-hero">${brand(c)}<h1>${esc(c.name)}</h1></section>` : `<section class="company-hero dossier-hero"><div><div class="eyebrow">COMPANY DOSSIER / ${c.coverage === "dossier" ? "深度档案" : "精选概览"}</div><h1>${esc(c.name)}</h1><p>${esc(c.tagline)}</p></div><div class="hero-plate" aria-hidden="true">${brand(c)}</div></section>${factStrip(c)}`}${c.coverage === "dossier" ? `<nav class="tabs" aria-label="公司档案栏目">${tabs.map(([id, label]) => `<a href="#/company/${c.id}?tab=${id}" ${companyTab === id ? 'aria-current="page"' : ""}>${label}</a>`).join("")}</nav><div class="tab-content">${companyContent(c)}</div>` : `<div class="preview-content"><div class="eyebrow">A CONCISE INTRODUCTION</div><h2>从这里开始认识 ${esc(c.name)}</h2>${c.description.map((p) => `<p>${esc(p)}</p>`).join("")}<div class="tag-row">${c.topics.map((t) => `<a href="#/topics?topic=${encodeURIComponent(t)}">${esc(t)}</a>`).join("")}</div>${sourceButton(c.sourceIds)}${companyPeople(c.id).length ? `<section class="preview-people"><h3>已收录人物</h3><div class="people-grid compact-people">${companyPeople(c.id).map(personCard).join("")}</div></section>` : ""}<div class="quiet-note">这是精选概览，暂不提供完整人物图谱或实时组织架构。深度专题将从可核验的公开资料逐步扩展。</div></div>`}</main>${footer()}`;
}
function factStrip(c: Company) {
  const facts = [
    ["成立", esc(c.founded), ""],
    ["地点", esc(c.location), ""],
    ["收录人物", String(companyPeople(c.id).length), "is-figure"],
    ["关系记录", String(scopedRelations(c.id).filter((r) => !r.navigationOnly).length), "is-figure"],
    ["关键时刻", String(events.filter((e) => e.entityIds.includes(c.id)).length), "is-figure"],
    ["版本更新", esc(datasetDate), ""],
  ];
  return `<dl class="fact-strip">${facts.map(([term, value, cls]) => `<div class="${cls}"><dt>${term}</dt><dd>${value}</dd></div>`).join("")}</dl>`;
}
function foundationBoardRoster() {
  return `<article data-board-roster><span class="date-label">核验 ${esc(foundationBoard.verified)}</span><h3>Foundation 董事名单</h3><ul>${foundationBoard.members.map((member) => `<li>${member.personId && personById(member.personId) ? `<a href="#/person/${esc(member.personId)}">${esc(member.name)}</a>` : esc(member.name)} · ${esc(member.role)}</li>`).join("")}</ul><p>此处记录 OpenAI Foundation 董事名单；OpenAI Group 董事与观察员身份需分别查证。</p>${sourceButton(foundationBoard.sourceIds, "核对董事名单")}</article>`;
}
function companyContent(c: Company) {
  if (companyTab === "relationships") return relationExplorer(c.id);
  if (companyTab === "timeline") return timeline(c.id);
  if (companyTab === "sources")
    return `<div class="content-heading"><h2>资料从哪里来</h2><p>先读事实，再回到原始语境。</p></div>${sourceList([...new Set([...c.sourceIds, ...scopedRelations(c.id).flatMap((r) => r.sourceIds), ...events.filter((e) => e.entityIds.includes(c.id)).flatMap((e) => e.sourceIds)])])}`;
  if (companyTab === "governance")
    return `<div class="reading-layout"><div><div class="eyebrow">ORGANIZATION & GOVERNANCE</div><h2>先区分关系，再理解组织。</h2><p class="lead">控制权、任职与投资，是三种不同的连接。</p><p>本档案将治理关系与商业关系分开展示。投资或合作本身并不等于公司控制权，历史任职也不自动延续至今天。</p><div class="fact-list">${c.id === "openai" ? foundationBoardRoster() : ""}${scopedRelations(
      c.id,
    )
      .filter(
        (r) =>
          ["governance", "investment"].includes(r.type) && !r.navigationOnly,
      )
      .map(
        (r) =>
          `<article><span class="date-label">${esc(r.period)} · ${labels[r.type]}</span><h3>${esc(relationshipName(r.from))} → ${esc(relationshipName(r.to))}</h3><span class="role-label">${esc(r.label)}</span><p>${esc(r.detail)}</p><div class="fact-actions">${[r.from, r.to].filter((id) => personById(id)).map(relatedEntity).join(" ")}${sourceButton(r.sourceIds)}</div></article>`,
      )
      .join(
        "",
      )}</div></div><aside class="reading-aside"><span>阅读提示</span><h3>图谱不是组织架构</h3><p>关系的方向只为表达这条事实。我们不会根据职务、报道顺序或知名度推测汇报关系。</p><a class="text-link" href="#/company/${c.id}?tab=relationships">展开关系图谱 ${arrow}</a></aside></div>`;
  if (companyTab === "products")
    return `<div class="content-heading"><div class="eyebrow">RESEARCH INTO EVERYDAY LIFE</div><h2>从研究，到可以使用的产品。</h2><p>精选产品事件，不是完整或实时的产品目录。</p></div><div class="product-feature"><div class="product-visual"><div class="editorial-art art-dunes"></div><span>CONVERSATION AS AN INTERFACE</span></div><div><span class="eyebrow">PRODUCT SPOTLIGHT</span><h3>ChatGPT</h3><p>以对话为入口，将语言模型带入日常使用。沿着发布记录，理解产品与模型如何逐步变化。</p><a href="#/timeline" class="text-link">阅读发布脉络 ${arrow}</a></div></div><div class="fact-list">${relationships
      .filter((r) => (r.from === c.id || r.to === c.id) && r.type === "product")
      .map(
        (r) =>
          `<article><span class="date-label">${esc(r.period)}</span><h3>${esc(r.label)}</h3><p>${esc(r.detail)}</p>${sourceButton(r.sourceIds)}</article>`,
      )
      .join("")}</div>`;
  return `<div class="overview-layout"><article class="overview-story"><div class="eyebrow">THE BIG PICTURE</div><h2>不止于一款产品。<br>理解一家 AI 公司的全貌。</h2>${c.description.map((p) => `<p>${esc(p)}</p>`).join("")}${sourceButton(c.sourceIds, "阅读原始资料")}</article><aside class="dossier-card"><span class="eyebrow">IN THIS DOSSIER</span><h3>从一条线索出发</h3>${[
    ["relationships", "关联浏览", "人物、组织与产品的连接"],
    ["governance", "组织治理", "区分控制、任职与投资"],
    ["timeline", "关键时刻", "回看重要的变化与转折"],
  ]
    .map(
      ([id, name, sub]) =>
        `<a href="#/company/${c.id}?tab=${id}"><span><strong>${name}</strong><small>${sub}</small></span>${arrow}</a>`,
    )
    .join(
      "",
    )}<p>每条线索都有来源与时间边界</p></aside></div><section class="company-people">${sectionHeading("01", "相关人物", "认识故事中的人。", `#/company/${c.id}?tab=relationships`, "展开图谱")}<div class="people-grid compact-people">${people
    .filter((p) => p.companyId === c.id)
    .slice(0, 3)
    .map(personCard)
    .join(
      "",
    )}</div></section><div class="editor-note"><span>阅读边界</span><p>档案中的历史事件按日期排列。人员身份只在对应资料的时间范围内成立，未经核实的现状不会被补全。</p><a href="#/about">${arrow}</a></div>`;
}
function entityHref(id: string) {
  return `#/${personById(id) ? "person" : companyById(id) ? "company" : "entity"}/${id}`;
}
function entityMark(id: string) {
  const company = companyById(id) || companyById(id.startsWith("openai-") ? "openai" : "");
  return company ? brand(company) : `<span class="brand">${esc(extraById(id)?.initial || "")}</span>`;
}
// A person's own records, grouped by the organisation or product at the other end.
function personTies(p: Person) {
  const ties = new Map<string, Relationship[]>();
  for (const r of relationships) {
    if (r.from !== p.id && r.to !== p.id) continue;
    const other = r.from === p.id ? r.to : r.from;
    ties.set(other, [...(ties.get(other) || []), r]);
  }
  return [...ties].map(([id, records]) => ({ id, records, past: records.every((r) => r.status === "historical") }));
}
function egoMap(p: Person) {
  const ties = personTies(p);
  const points = ties.map((_, i) => {
    const angle = ((-35 + (i * 360) / ties.length) * Math.PI) / 180;
    return [50 + 40 * Math.cos(angle), 50 + 40 * Math.sin(angle)];
  });
  return `<div class="ego-map"><svg viewBox="0 0 100 100" aria-hidden="true">${ties.map((t, i) => `<line class="${t.past ? "is-past" : ""}" x1="50" y1="50" x2="${points[i][0].toFixed(1)}" y2="${points[i][1].toFixed(1)}"/>`).join("")}</svg><div class="ego-self">${face(p)}</div>${ties
    .map((t, i) => {
      const lead = t.records.find((r) => r.status !== "historical") || t.records[0];
      return `<a class="ego-node ${t.past ? "is-past" : ""} ${points[i][1] < 50 ? "is-up" : ""}" href="${esc(entityHref(t.id))}" style="--x:${points[i][0].toFixed(1)}%;--y:${points[i][1].toFixed(1)}%"><span class="ego-mark">${entityMark(t.id)}</span><span class="ego-label"><strong>${esc(relationshipName(t.id))}</strong><small>${esc(lead.label)}</small></span></a>`;
    })
    .join("")}</div>`;
}
function personLinks(p: Person) {
  const list = relationships.filter((r) => r.from === p.id || r.to === p.id);
  if (!list.length) return "";
  return `<div class="person-links"><span>公开资料中的关联</span><ul>${list
    .map((r) => {
      const other = r.from === p.id ? r.to : r.from;
      return `<li class="${r.status === "historical" ? "is-past" : ""}"><a href="${esc(entityHref(other))}">${entityMark(other)}<span><strong>${esc(relationshipName(other))}</strong><small>${esc(r.label)}</small><small>${esc(r.period)}</small></span></a></li>`;
    })
    .join("")}</ul><a href="${esc(personContextHref(p))}" class="text-link">在图谱中展开 ${arrow}</a></div>`;
}
function personNext(p: Person) {
  const family = (id: string) => (id.startsWith("openai-") ? "openai" : id);
  const mine = new Set(personTies(p).map((t) => family(t.id)));
  const near = people.filter((other) => other.id !== p.id && personTies(other).some((t) => mine.has(family(t.id))));
  const index = people.indexOf(p);
  const step = (to: Person, label: string, cls: string) => `<a class="${cls}" href="#/person/${esc(to.id)}"><small>${label}</small><strong>${esc(to.name)}</strong></a>`;
  return `${near.length ? `<section class="front-section person-next">${frontHeading("继续阅读", `与 ${esc(p.name)} 出现在同一机构记录里的人物。`, "#/people", "人物索引")}<div class="people-wall">${near.slice(0, 8).map((o) => `<a class="wall-person" href="#/person/${esc(o.id)}"><span class="wall-face">${face(o)}</span><span class="wall-copy"><strong>${esc(o.name)}</strong><small>${esc(o.role)}</small></span></a>`).join("")}</div></section>` : ""}<nav class="pager" aria-label="相邻人物">${step(people[(index + people.length - 1) % people.length], "上一位", "pager-prev")}${step(people[(index + 1) % people.length], "下一位", "pager-next")}</nav>`;
}
function linkedWritingText(text: string, personId: string, sourceIds: readonly string[]) {
  return writingSegments(text, personId, sourceIds).map(segment => {
    const source = segment.writing && writingSource(segment.writing);
    return source ? `<a class="writing-inline" href="${esc(source.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(segment.text)}，阅读原文（新标签页）">${esc(segment.text)}</a>` : esc(segment.text);
  }).join("");
}
function writingsSection(p: Person) {
  return `<p class="writings-intro">本人署名与合著原文精选。观点和预测保留作者语境，合著成果归于完整作者团队。链接均在新标签页打开。</p><ol class="writing-list">${featuredWritings(p.id).map(w => {
    const source = writingSource(w)!;
    return `<li id="writing-${esc(w.sourceId)}" data-writing="${esc(w.sourceId)}"><div class="writing-meta"><span>${writingKindLabels[w.kind]} · ${w.authorship === "coauthored" ? "共同署名" : "本人署名"}</span><span>${w.dateNote ? `${esc(w.dateNote)} ` : ""}${source.published ? `<time datetime="${esc(source.published)}">${esc(w.dateLabel || source.published)}</time>` : "原文未标日期"}</span></div><h3><a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(w.title)}，阅读原文（新标签页）">${esc(w.title)} ${arrow}</a></h3><p class="writing-summary">${esc(w.summary)}</p><p class="writing-byline">${esc(w.authors)}<span>${esc(new URL(source.url).hostname.replace(/^www\./, ""))}</span></p></li>`;
  }).join("")}</ol>`;
}
function personPage(p: Person) {
  const ties = personTies(p);
  const profile = profiles[p.id];
  const selectedWritings = featuredWritings(p.id);
  const allSources = [...new Set([...p.sourceIds, ...personFigures(p.id).flatMap(f => f.sourceIds), ...personWritings(p.id).map(w => w.sourceId), ...(profile?.chapters.flatMap((c) => c.sourceIds) || []), ...(profile?.facts.flatMap((f) => f[2] || []) || []), ...(profile?.roleNote?.sourceIds || [])])];
  const facts = [
    ["所属机构", `<a href="#/company/${esc(p.companyId)}">${esc(relationshipName(p.companyId))}</a>`, ""],
    ["关联记录", String(ties.reduce((n, t) => n + t.records.length, 0)), "is-figure"],
    ["时间节点", String(p.milestones.length), "is-figure"],
    ["资料来源", String(allSources.length), "is-figure"],
    ["版本更新", esc(datasetDate), ""],
  ];
  let citationNumber = 0;
  const chapters: { title: string; body: string; id?: string }[] = [
    ...(profile?.chapters || []).map((c, chapterIndex) => {
      const paragraphs = c.text.map((text, index) => `<p>${linkedWritingText(text, p.id, c.paragraphSourceIds[index])} ${profileCitation(c.paragraphSourceIds[index], `${c.title}，第 ${index + 1} 段的资料来源`, `[${++citationNumber}]`)}</p>`);
      const figures = personFigures(p.id).filter(figure => figure.chapterTitle === c.title);
      const key = `${p.id}:${c.title}`;
      const open = biographyOpenState.get(key) ?? chapterIndex === 0;
      return { title: c.title, body: `${paragraphs[0]}<details class="biography-disclosure" id="biography-${chapterIndex + 1}" data-biography-key="${esc(key)}" ${open ? "open" : ""}><summary><span class="when-closed">继续阅读 · ${paragraphs.length - 1} 段${figures.length ? " · 含配图" : ""}</span><span class="when-open">收起本章</span></summary><div class="biography-more">${paragraphs.slice(1).join("")}${figures.map(figure => renderBiographyFigure(figure, import.meta.env.BASE_URL)).join("")}</div></details>` };
    }),
    { title: profile ? "公开记录中的角色" : "经历与贡献", id: "person-roles", body: p.paragraphs.map((text, index) => `<p>${linkedWritingText(text, p.id, p.paragraphSourceIds?.[index] || [])}</p>${p.paragraphSourceIds?.[index]?.length ? sourceButton(p.paragraphSourceIds[index], "本段依据") : ""}`).join("") },
    ...(selectedWritings.length ? [{ title: "文章与观点", id: "person-writings", body: writingsSection(p) }] : []),
    { title: "沿着时间阅读", body: `<div class="milestones">${p.milestones.map((m) => `<article><time>${esc(m.date)}</time><div><p>${esc(m.text)}</p>${sourceButton(m.sourceIds)}</div></article>`).join("")}</div>` },
    { title: "人物资料来源", id: "person-sources", body: sourceList(allSources, true) },
  ];
  const no = (i: number) => String(i + 1).padStart(2, "0");
  return `${header("people")}<main id="main" class="person-page">${breadcrumb([{ text: "人物", href: "#/people" }, { text: p.name }])}<section class="person-hero"><div><div class="eyebrow">PEOPLE / 人物档案</div><h1>${esc(p.name)}</h1><p class="cn-name">${esc(p.cnName)}${p.aliases?.length ? `<span> · 常用称呼 ${esc(p.aliases[0])}</span>` : ""}</p><span class="role-label">${esc(p.role)}</span>${profile?.roleNote ? `<p class="profile-role-note">${esc(profile.roleNote.text)} ${profileCitation(profile.roleNote.sourceIds, "查看职务更新依据")}</p>` : ""}<p class="person-deck">${esc(p.summary)}</p>${profile ? `<dl class="quick-facts">${profile.facts.map(([term, value, ids]) => `<div><dt>${esc(term)}</dt><dd>${esc(value)}${ids?.length ? ` ${profileCitation(ids, `${term}的资料来源`)}` : ""}</dd></div>`).join("")}</dl>` : ""}<div class="person-reading-links"><a href="${esc(personContextHref(p))}" class="text-link">放回公司的脉络中阅读 ${arrow}</a>${selectedWritings.length ? `<button class="text-link writings-jump" data-jump="person-writings">阅读本人文章 <span>${selectedWritings.length}</span> ↓</button>` : ""}</div></div>${egoMap(p)}</section><dl class="fact-strip is-person">${facts.map(([term, value, cls]) => `<div class="${cls}"><dt>${term}</dt><dd>${value}</dd></div>`).join("")}</dl><div class="reading-layout person-reading"><nav class="chapter-nav" aria-label="本页目录"><span>本页目录</span>${chapters.map((c, i) => `<button data-jump="${c.id || `chapter-${i + 1}`}"><i>${no(i)}</i>${esc(c.title)}</button>`).join("")}</nav><article>${profile ? `<div class="biography-controls"><span>${profile.chapters.length} 个背景章节${personFigures(p.id).length ? ` · ${personFigures(p.id).length} 幅配图` : ""}</span><button data-biographies="expand" aria-controls="${profile.chapters.map((_, i) => `biography-${i + 1}`).join(" ")}" aria-expanded="false">展开全文</button></div>` : ""}${chapters.map((c, i) => `<section class="chapter" id="${c.id || `chapter-${i + 1}`}"><header><span>${no(i)}</span><h2>${esc(c.title)}</h2></header>${c.body}</section>`).join("")}</article><aside class="reading-aside">${personLinks(p)}<div class="person-note"><span>阅读须知</span><p>这里不将集体成果归于某一个人，也不以历史头衔暗示当前职位。请结合事件日期和原始资料阅读。</p>${profile?.reviewNote ? `<p class="profile-review-note">${esc(profile.reviewNote)}</p><p class="profile-reviewed">背景复核 <time datetime="${esc(profile.reviewed || "")}">${esc(profile.reviewed || "")}</time></p>` : profile ? "<p>生平背景章节依据维基百科条目整理，属于二手汇编；任职与治理事实以「公开记录中的角色」所引的原始公告为准。</p>" : ""}</div></aside></div>${personNext(p)}</main>${footer()}`;
}
function timeline(entityId?: string) {
  const list = events.filter(
    (e) => !entityId || e.entityIds.includes(entityId),
  );
  return `<div class="content-heading"><div class="eyebrow">MOMENTS THAT MATTER</div><h2>沿着时间，理解变化。</h2><p>精选公开事件 · ${list.length} 个可追溯的节点</p></div><div class="timeline">${list
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date))
    .map(
      (e, i, sorted) =>
        `${e.date.slice(0, 4) !== sorted[i - 1]?.date.slice(0, 4) ? `<div class="timeline-year" aria-hidden="true">${esc(e.date.slice(0, 4))}</div>` : ""}<article id="event-${esc(e.id)}"><time>${esc(e.date)}</time><div class="timeline-dot"></div><div><h3>${esc(e.title)}</h3><p>${esc(e.description)}</p><div class="timeline-foot"><span>${e.entityIds.map((id) => esc(relationshipName(id))).join(" / ")}</span>${sourceButton(e.sourceIds, "事件来源")}</div></div></article>`,
    )
    .join("")}</div>`;
}
function sourceList(ids: readonly string[], anchors = false) {
  return `<div class="sources-list">${[...new Set(ids)]
    .map((id, index) => {
      const s = sourceById(id);
      return s
        ? `<article${anchors ? ` id="source-${esc(id)}"` : ""}><span class="source-index">${String(index + 1).padStart(2, "0")}</span><div><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)} ${arrow}</a><p>${esc(new URL(s.url).hostname)}${s.published ? ` · 发布 ${esc(s.published)}` : ""} · 核验 ${esc(s.verified)}</p></div></article>`
        : "";
    })
    .join("")}</div>`;
}
function sourcesPage() {
  const cited = new Map<string, number>();
  const cite = (ids: readonly string[]) => new Set(ids).forEach((id) => cited.set(id, (cited.get(id) || 0) + 1));
  for (const c of companies) cite(c.sourceIds);
  for (const p of people) cite([...p.sourceIds, ...personWritings(p.id).map(w => w.sourceId), ...p.milestones.flatMap((m) => m.sourceIds), ...(p.paragraphSourceIds || []).flat()]);
  for (const figure of biographyFigures) cite(figure.sourceIds);
  for (const p of Object.values(profiles)) cite([...p.chapters.flatMap(c => c.sourceIds), ...p.facts.flatMap(f => f[2] || []), ...(p.roleNote?.sourceIds || [])]);
  for (const r of relationships) cite(r.sourceIds);
  for (const e of events) cite(e.sourceIds);
  for (const e of additionalEntities) cite(e.sourceIds);
  const host = (url: string) => new URL(url).hostname.replace(/^www\./, "");
  const groups = new Map<string, typeof sources>();
  for (const source of sources) groups.set(host(source.url), [...(groups.get(host(source.url)) || []), source]);
  const ordered = [...groups].sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]));
  return `${header()}<main id="main" class="sources-page">${breadcrumb([{ text: "来源索引" }])}<section class="page-intro"><div class="eyebrow">THE EVIDENCE INDEX</div><h1>回到资料，继续阅读。</h1><p>${sources.length} 份公开资料，来自 ${groups.size} 个发布方 · 各条来源分别标注核验日期 · 外链将在新标签页打开</p></section><div class="source-tools"><label class="search-input">${searchIcon}<input type="search" data-source-filter placeholder="按标题或发布方筛选…" autocomplete="off" aria-label="筛选来源"></label><span data-source-count aria-live="polite">${sources.length} 份资料</span></div><div class="source-ledger">${ordered
    .map(
      ([name, list]) =>
        `<section class="source-group"><header><h2>${esc(name)}</h2><span>${list.length} 份</span></header><ul>${list
          .map(
            (item) =>
              `<li data-source-row="${esc(`${item.title} ${name}`.toLocaleLowerCase())}"><a href="${esc(item.url)}" target="_blank" rel="noopener noreferrer">${esc(item.title)} ${arrow}</a><span class="source-dates">${item.published ? `<span>发布 ${esc(item.published)}</span>` : ""}<span>核验 ${esc(item.verified)}</span><span>被引用 ${cited.get(item.id) || 0} 处</span></span></li>`,
          )
          .join("")}</ul></section>`,
    )
    .join("")}</div><p class="empty-state source-empty" hidden>没有匹配的来源，换一个关键词试试。</p></main>${footer()}`;
}
function topicsPage() {
  const topics = [...new Set(companies.flatMap((c) => c.topics))];
  return `${header("topics")}<main id="main">${breadcrumb([{ text: "专题探索" }])}<section class="page-intro"><div class="eyebrow">WAYS OF SEEING</div><h1>换个角度，看见连接。</h1><p>用一个主题串联公司，再沿着档案走向人物、产品与证据。</p></section><div class="pills topic-filters">${["all", ...topics].map((t) => `<button data-topic="${esc(t)}" aria-pressed="${topicFilter === t}">${t === "all" ? "全部主题" : esc(t)}</button>`).join("")}</div><div class="company-grid">${
    companies
      .filter((c) => topicFilter === "all" || c.topics.includes(topicFilter))
      .map(companyCard)
      .join("") ||
    '<p class="empty-state">此主题尚无公司条目，请选择其他主题。</p>'
  }</div><a href="#/timeline" class="wide-link"><span><small>另一种阅读顺序</small><strong>按时间，重新认识 AI</strong></span>${arrow}</a></main>${footer()}`;
}
function aboutPage() {
  return `${header()}<main id="main">${breadcrumb([{ text: "关于与编辑原则" }])}<section class="page-intro"><div class="eyebrow">ABOUT THE ATLAS</div><h1>让好奇，有据可循。</h1><p>AI Atlas 是一本以公司为起点的中文人工智能百科。</p></section><div class="reading-layout"><article class="about-copy"><h2>不是排行榜，而是理解的入口。</h2><p>我们连接公司、人物、产品与关键时刻，希望让复杂的 AI 生态变得可以阅读、可以探索、可以核对。</p><h2>我们如何处理事实</h2><ol><li><strong>优先原始资料。</strong>公司公告、论文和当事人的公开陈述各有局限；来源支持某项陈述，不意味着我们认同来源的一切观点。</li><li><strong>给历史加上日期。</strong>创始身份、过去任职与目前任职不是同一回事。本版以日期明确的资料为基础，不宣称实时完整。</li><li><strong>区分不同的关系。</strong>治理、任职、投资合作与产品各有自己的含义。关系图不推断汇报线，也不是权力排序。</li><li><strong>明确收录边界。</strong>OpenAI 为首版深度专题，其他组织是精选概览。缺失不等于不存在，概览也不等于完整公司数据库。</li></ol><h2>版本与核验</h2><p>本版最近编辑日期：${esc(datasetDate)}，各条来源分别标注核验日期。这是静态编辑版本，没有自动抓取实时新闻或人员变动。事实上的新变化应回到官方原文确认。</p><h2>图像、署名与许可</h2><p>沙丘、纸张与室内空间是 AI 生成的概念插画，不是公司的实景或产品界面。人物肖像均为真实照片，以 CSS 灰度和响应式裁切显示；摄影者及人物不为本站背书。未取得可用照片的人物使用字母识别，不以生成肖像代替本人。</p><ul class="asset-credits"><li><a href="https://commons.wikimedia.org/wiki/File:Sam_Altman_CropEdit_James_Tamim.jpg" target="_blank" rel="noopener noreferrer">Sam Altman · 照片来源</a><span>Steve Jennings / TechCrunch，2019 · <a href="https://creativecommons.org/licenses/by/2.0/" target="_blank" rel="noopener noreferrer">CC BY 2.0</a></span></li><li><a href="https://commons.wikimedia.org/wiki/File:Disrupt_SF_TechCrunch_Disrupt_San_Francisco_2019_-_Day_2_(48838200316)_(cropped).jpg" target="_blank" rel="noopener noreferrer">Greg Brockman · 照片来源</a><span>Steve Jennings / TechCrunch，2019 · <a href="https://creativecommons.org/licenses/by/2.0/" target="_blank" rel="noopener noreferrer">CC BY 2.0</a></span></li><li><a href="https://commons.wikimedia.org/wiki/File:Dario_Amodei_at_TechCrunch_Disrupt_2023_01_(cropped).jpg" target="_blank" rel="noopener noreferrer">Dario Amodei · 照片来源</a><span>Kimberly White / TechCrunch，2023 · <a href="https://creativecommons.org/licenses/by/2.0/" target="_blank" rel="noopener noreferrer">CC BY 2.0</a></span></li><li><a href="https://commons.wikimedia.org/wiki/File:Guests_at_the_2026_Met_Gala_274_(Mira_Murati).jpg" target="_blank" rel="noopener noreferrer">Mira Murati · 照片来源</a><span>SWinxy，2026 · <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a></span></li><li><a href="https://commons.wikimedia.org/wiki/File:Demis_Hassabis_in_2025_by_Christopher_Michel.jpg" target="_blank" rel="noopener noreferrer">Demis Hassabis · 照片来源</a><span>Christopher Michel，2025 · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a></span></li><li><a href="https://commons.wikimedia.org/wiki/File:TechCrunch_Disrupt_2024_D2_Bret_Taylor-3.jpg" target="_blank" rel="noopener noreferrer">Bret Taylor · 照片来源</a><span>Katelyn Tucker / Slava Blazer Photography，TechCrunch，2024 · <a href="https://creativecommons.org/licenses/by/2.0/" target="_blank" rel="noopener noreferrer">CC BY 2.0</a></span></li><li><a href="https://commons.wikimedia.org/wiki/File:Fidji_Simo_(cropped).jpg" target="_blank" rel="noopener noreferrer">Fidji Simo · 照片来源</a><span>Loïc Le Meur，2016；Nouvelles Odes 来源裁切 · <a href="https://creativecommons.org/licenses/by/2.0/" target="_blank" rel="noopener noreferrer">CC BY 2.0</a></span></li></ul><p>传记中的研究流程与时间线是本站依据所列资料绘制的原创解释图，不是历史现场照片或原论文插图。</p><p>Demis Hassabis 照片及其显示处理遵循 CC BY-SA 4.0。其余肖像按各自许可署名。品牌图形仅作百科识别，不代表隶属或合作关系。</p><a class="text-link" href="#/sources">浏览所有公开资料 ${arrow}</a></article><aside class="reading-aside"><span>编辑立场</span><h3>克制地连接，<br>清楚地标注。</h3><p>没有来源的关系，不画。<br>没有核验的现状，不猜。<br>未被覆盖的内容，留白。</p></aside></div></main>${footer()}`;
}
function notFound() {
  return `${header()}<main id="main" class="not-found"><div class="eyebrow">404 / NOT IN THE ATLAS</div><h1>这条线索还没有被收录。</h1><p>回到索引，换一个起点继续探索。</p><a class="button dark" href="#/companies">浏览公司索引 →</a></main>${footer()}`;
}
function render() {
  const [path, query = ""] = (location.hash.slice(1) || "/").split("?");
  let params = new URLSearchParams(query);
  const parts = path.split("/").filter(Boolean);
  companyTab = params.get("tab") || "overview";
  if (!tabs.some((t) => t[0] === companyTab)) companyTab = "overview";
  // Read every route afresh so a selection never leaks across pages or companies.
  activeGraph = null;
  selectedCompanyFilter = "all";
  const graphCompany =
    parts[0] === "explore"
      ? "openai"
      : parts[0] === "company" &&
          companyTab === "relationships" &&
          companyById(parts[1])?.coverage === "dossier"
        ? parts[1]
        : "";
  if (graphCompany) {
    activeGraph = graphState(graphCompany, params, matchMedia("(max-width:600px)").matches ? 4 : 6);
    params = canonicalGraphParams(params, activeGraph);
  } else if (parts[0] === "companies" || parts[0] === "people") {
    const choices = parts[0] === "companies"
      ? ["all", "dossier", "preview"]
      : ["all", "openai"];
    const requested = params.get("filter") || "all";
    selectedCompanyFilter = choices.includes(requested) ? requested : "all";
    if (params.has("filter")) params.set("filter", selectedCompanyFilter);
    params.delete("relation");
  } else {
    params.delete("filter");
    for (const key of ["relation", "root", "status", "page", "view", "from"]) params.delete(key);
  }
  const normalizedHash = `#${path}${params.size ? `?${params}` : ""}`;
  if (location.hash && location.hash !== normalizedHash) {
    history.replaceState(history.state, "", normalizedHash);
  }
  if (parts[0] === "company") {
    const c = companyById(parts[1]);
    app.innerHTML = c ? companyPage(c) : notFound();
    document.title = `${c?.name || "未收录"} · AI Atlas`;
  } else if (parts[0] === "entity") {
    const e = extraById(parts[1]);
    app.innerHTML = e
      ? `${header()}<main id="main">${breadcrumb([{ text: e.type === "product" ? "产品条目" : "组织条目" }, { text: e.name }])}<section class="page-intro"><div class="eyebrow">${e.type === "product" ? "PRODUCT" : "ORGANIZATION"} / 精选条目</div><h1>${esc(e.name)}</h1><p>${esc(e.summary)}</p></section><div class="preview-content"><a class="text-link" href="#/company/openai?tab=${e.type === "product" ? "products" : "governance"}">返回 OpenAI 档案 ${arrow}</a>${entityConnections(e.id)}<h2>公开资料</h2>${sourceList(e.sourceIds)}</div></main>${footer()}`
      : notFound();
    document.title = `${e?.name || "未收录"} · AI Atlas`;
  } else if (parts[0] === "person") {
    const p = personById(parts[1]);
    app.innerHTML = p ? personPage(p) : notFound();
    document.title = `${p?.name || "未收录"} · AI Atlas`;
  } else if (parts[0] === "companies" || parts[0] === "people") {
    app.innerHTML = indexPage(parts[0]);
    document.title = `${parts[0] === "companies" ? "公司索引" : "人物索引"} · AI Atlas`;
  } else if (parts[0] === "explore") {
    const rootName = relationshipName(activeGraph!.root);
    app.innerHTML = `${header("explore")}<main id="main" class="graph-page">${breadcrumb([{ text: "关系图谱", href: "#/explore" }, { text: rootName }])}<section class="page-intro atlas-intro">${graphVisual(activeGraph!.root)}<h1>${esc(rootName)}</h1></section>${relationExplorer()}</main>${footer()}`;
    document.title = "关系图谱 · AI Atlas";
  } else if (parts[0] === "topics") {
    topicFilter = params.get("topic") || "all";
    app.innerHTML = topicsPage();
    document.title = "专题探索 · AI Atlas";
  } else if (parts[0] === "timeline") {
    app.innerHTML = `${header("topics")}<main id="main">${breadcrumb([{ text: "关键时刻" }])}${timeline()}</main>${footer()}`;
    document.title = "关键时刻 · AI Atlas";
  } else if (parts[0] === "sources") {
    app.innerHTML = sourcesPage();
    document.title = "来源索引 · AI Atlas";
  } else if (parts[0] === "about") {
    app.innerHTML = aboutPage();
    document.title = "关于与编辑原则 · AI Atlas";
  } else {
    app.innerHTML = parts.length ? notFound() : home();
    document.title = parts.length
      ? "未收录 · AI Atlas"
      : "AI Atlas · 看见公司，理解 AI 的未来";
  }
  const section = params.get("section");
  if (section && !readingTarget(section)) {
    params.delete("section");
    history.replaceState(history.state, "", `#${path}${params.size ? `?${params}` : ""}`);
  }
  bindEvents();
  // Marks which route is on screen; the end-to-end suite waits on it after navigating.
  document.documentElement.dataset.route = location.hash;
}
function updateQuery(
  values: Record<string, string>,
  focusSelector: string,
  showDetail = false,
  route = "",
) {
  const [path, query = ""] = (location.hash.slice(1) || "/").split("?");
  let params = new URLSearchParams(query);
  for (const [key, value] of Object.entries(values)) {
    if (value) params.set(key, value);
    else params.delete(key);
  }
  if (activeGraph) params = canonicalGraphParams(params, graphState(activeGraph.root, params, activeGraph.pageSize));
  if (route === "/explore") params.delete("tab");
  const hash = `#${route || path}${params.size ? `?${params}` : ""}`;
  if (location.hash !== hash) {
    const scroll = { left: window.scrollX, top: window.scrollY };
    closeModal(false);
    history.pushState(null, "", hash);
    render();
    window.scrollTo({ ...scroll, behavior: "instant" });
  }
  const focusTarget = app.querySelector<HTMLElement>(focusSelector);
  const activeDisclosure = focusTarget?.closest<HTMLDetailsElement>("details");
  app.querySelectorAll<HTMLDetailsElement>(".atlas-disclosure[open]").forEach(detail => {
    if (detail !== activeDisclosure) detail.open = false;
  });
  if (activeDisclosure) activeDisclosure.open = focusTarget?.tagName !== "SUMMARY";
  focusTarget?.focus({ preventScroll: true });
  if (showDetail && matchMedia("(max-width:600px)").matches) {
    app.querySelector<HTMLElement>(".atlas-detail")?.focus({ preventScroll: true });
    app.querySelector(".atlas-detail")?.scrollIntoView({
      block: "start",
      behavior: matchMedia("(prefers-reduced-motion:reduce)").matches
        ? "instant"
        : "smooth",
    });
  }
}
function bindEvents() {
  bindMap(app);
  const biographyDisclosures = [...app.querySelectorAll<HTMLDetailsElement>(".biography-disclosure")];
  const biographyToggle = app.querySelector<HTMLButtonElement>("[data-biographies]");
  const syncBiographyToggle = () => {
    if (!biographyToggle) return;
    const allOpen = biographyDisclosures.every(disclosure => disclosure.open);
    biographyToggle.dataset.biographies = allOpen ? "collapse" : "expand";
    biographyToggle.textContent = allOpen ? "收起全文" : "展开全文";
    biographyToggle.setAttribute("aria-expanded", String(allOpen));
  };
  syncBiographyToggle();
  biographyDisclosures.forEach(disclosure => {
    disclosure.addEventListener("toggle", () => {
      if (!biographyPrintState?.has(disclosure)) biographyOpenState.set(disclosure.dataset.biographyKey!, disclosure.open);
      syncBiographyToggle();
    });
    disclosure.addEventListener("keydown", event => {
      if (event.key === "Escape" && disclosure.open && !document.querySelector(".modal")) {
        event.preventDefault();
        disclosure.open = false;
        disclosure.querySelector("summary")?.focus();
      }
    });
  });
  biographyToggle?.addEventListener("click", () => {
    const open = biographyToggle.dataset.biographies === "expand";
    biographyDisclosures.forEach(disclosure => {
      disclosure.open = open;
      biographyOpenState.set(disclosure.dataset.biographyKey!, open);
    });
    syncBiographyToggle();
  });
  if (biographyPrintState || printMedia.matches) setBiographyPrintMode(true);
  // Highlight the chapter being read in the page contents.
  chapterSpy?.disconnect();
  const jumps = [...app.querySelectorAll<HTMLButtonElement>(".chapter-nav [data-jump]")];
  if (jumps.length && "IntersectionObserver" in window) {
    chapterSpy = new IntersectionObserver(
      (entries) => {
        const current = entries.filter((entry) => entry.isIntersecting).pop()?.target.id;
        if (current) jumps.forEach((b) => (b.dataset.jump === current ? b.setAttribute("aria-current", "true") : b.removeAttribute("aria-current")));
      },
      { rootMargin: "-18% 0px -72% 0px" },
    );
    app.querySelectorAll(".chapter").forEach((chapter) => chapterSpy!.observe(chapter));
    jumps[0].setAttribute("aria-current", "true");
  }
  app.querySelectorAll<HTMLButtonElement>("[data-jump]").forEach((b) =>
    b.addEventListener("click", () => {
      const section = b.dataset.jump!;
      const [path, query = ""] = (location.hash.slice(1) || "/").split("?");
      // Keep the current reading location shareable without adding a Back step
      // for every table-of-contents click. Search navigation still creates history.
      if (path.startsWith("/person/")) {
        const params = new URLSearchParams(query);
        params.set("section", section);
        const hash = `#${path}?${params}`;
        if (location.hash !== hash) history.replaceState(history.state, "", hash);
        document.documentElement.dataset.route = location.hash;
      }
      focusReadingTarget(document.getElementById(section));
    }),
  );
  app.querySelector<HTMLInputElement>("[data-source-filter]")?.addEventListener("input", (e) => {
    const q = (e.target as HTMLInputElement).value.trim().toLocaleLowerCase();
    let shown = 0;
    app.querySelectorAll<HTMLElement>(".source-group").forEach((group) => {
      let any = false;
      group.querySelectorAll<HTMLElement>("[data-source-row]").forEach((row) => {
        row.hidden = !!q && !row.dataset.sourceRow!.includes(q);
        if (!row.hidden) { any = true; shown++; }
      });
      group.hidden = !any;
    });
    app.querySelector("[data-source-count]")!.textContent = `${shown} 份资料`;
    app.querySelector<HTMLElement>(".source-empty")!.hidden = shown > 0;
  });
  app.querySelector('[data-action="theme"]')?.addEventListener("click", () => {
    const root = document.documentElement;
    const dark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme:dark)").matches;
    root.dataset.theme = dark ? "light" : "dark";
    try { localStorage.setItem("atlas-theme", root.dataset.theme); } catch { /* private mode: the choice lasts for this visit */ }
  });
  app.querySelectorAll<HTMLButtonElement>("[data-close-disclosure]").forEach(button => button.addEventListener("click", () => {
    const disclosure = button.closest<HTMLDetailsElement>("details");
    if (disclosure) {
      disclosure.open = false;
      disclosure.querySelector<HTMLElement>("summary")?.focus({ preventScroll: true });
    }
  }));
  app.querySelectorAll<HTMLDetailsElement>(".atlas-disclosure").forEach(disclosure => {
    disclosure.addEventListener("keydown", event => {
      if (event.key === "Escape" && disclosure.open && !document.querySelector(".modal")) {
        event.preventDefault();
        event.stopPropagation();
        disclosure.open = false;
        disclosure.querySelector<HTMLElement>("summary")?.focus({ preventScroll: true });
      }
    });
  });
  app.querySelector("[data-back-to-graph]")?.addEventListener("click", () => {
    app.querySelector<HTMLElement>(".graph-node.selected")?.focus({ preventScroll: true });
    document.querySelector(".atlas-stage")?.scrollIntoView({
      block: "start",
      behavior: matchMedia("(prefers-reduced-motion:reduce)").matches
        ? "instant"
        : "smooth",
    });
  });
  app
    .querySelector<HTMLAnchorElement>(".skip-link")
    ?.addEventListener("click", (e) => {
      e.preventDefault();
      const main = document.querySelector<HTMLElement>("main");
      main?.setAttribute("tabindex", "-1");
      main?.focus();
      main?.scrollIntoView({ block: "start" });
    });
  app
    .querySelectorAll<HTMLButtonElement>('[data-action="search"]')
    .forEach((b) => b.addEventListener("click", openSearch));
  app
    .querySelectorAll<HTMLButtonElement>("[data-sources]")
    .forEach((b) =>
      b.addEventListener("click", () =>
        openSources(b.dataset.sources!.split(","), b.dataset.figureSource),
      ),
    );
  app.querySelectorAll<HTMLButtonElement>("[data-index-filter]").forEach((b) =>
    b.addEventListener("click", () => {
      updateQuery(
        { filter: b.dataset.indexFilter! },
        `[data-index-filter="${CSS.escape(b.dataset.indexFilter!)}"]`,
      );
    }),
  );
  app.querySelectorAll<HTMLButtonElement>("[data-relation-filter]").forEach(b => b.addEventListener("click", () => {
    const filter = b.dataset.relationFilter!;
    updateQuery({ filter, status: activeGraph?.status === "recent" && ["product", "all"].includes(filter) ? "all" : activeGraph?.status || "all", relation: activeGraph?.relation || "", page: "1" }, `[data-relation-filter="${CSS.escape(filter)}"]`);
  }));
  app.querySelectorAll<HTMLButtonElement>("[data-relation-status]").forEach(b => b.addEventListener("click", () => {
    updateQuery({ status: b.dataset.relationStatus!, relation: activeGraph?.relation || "", page: "1" }, `[data-relation-status="${CSS.escape(b.dataset.relationStatus!)}"]`);
  }));
  app.querySelectorAll<HTMLButtonElement>("[data-relation]").forEach(b => b.addEventListener("click", () => {
    updateQuery({ relation: b.dataset.relation! }, `[data-relation="${CSS.escape(b.dataset.relation!)}"]`, true);
  }));
  app.querySelector<HTMLSelectElement>("[data-relation-record]")?.addEventListener("change", e => {
    updateQuery({ relation: (e.target as HTMLSelectElement).value }, "[data-relation-record]");
  });
  app.querySelectorAll<HTMLButtonElement>("[data-graph-root], [data-graph-back]").forEach(b => b.addEventListener("click", () => {
    const root = b.dataset.graphRoot || b.dataset.graphBack!;
    if (root === activeGraph?.root) { b.focus(); return; }
    updateQuery({ root, from: b.dataset.graphBack ? "" : activeGraph?.root || "", filter: "all", status: "all", relation: "", page: "1" }, `.atlas-hub`, false, b.matches(".atlas-recenter") ? "/explore" : "");
    const hub = app.querySelector<HTMLElement>(".atlas-hub");
    hub?.setAttribute("tabindex", "-1"); hub?.focus({ preventScroll: true });
  }));
  app.querySelectorAll<HTMLButtonElement>("[data-graph-view]").forEach(b => b.addEventListener("click", () => {
    updateQuery({ view: b.dataset.graphView! }, `[data-graph-view="${b.dataset.graphView}"]`);
  }));
  app.querySelectorAll<HTMLButtonElement>("[data-graph-page]").forEach(b => b.addEventListener("click", () => {
    updateQuery({ page: b.dataset.graphPage!, relation: "" }, ".graph-node.selected");
  }));
  app.querySelector("[data-graph-reset]")?.addEventListener("click", () => {
    updateQuery({ filter: activeGraph?.root === "openai" ? "employment" : "all", status: activeGraph?.root === "openai" ? "recent" : "all", relation: "", page: "1", view: "graph" }, ".atlas-controls > summary");
  });
  app.querySelector("[data-graph-clear]")?.addEventListener("click", () => {
    updateQuery({ filter: "all", status: "all", relation: "", page: "1" }, ".graph-node.selected");
  });
  app.querySelector("[data-all-records]")?.addEventListener("click", () => {
    updateQuery({ filter: "all", status: "all" }, "[data-relation-record]");
  });
  app.querySelectorAll<HTMLButtonElement>("[data-topic]").forEach((b) =>
    b.addEventListener("click", () => {
      location.hash = `/topics?topic=${encodeURIComponent(b.dataset.topic!)}`;
    }),
  );
}
function openModal(content: string, cls = "") {
  closeModal(false);
  lastFocused = document.activeElement as HTMLElement;
  const overlay = document.createElement("div");
  overlay.className = `modal-overlay ${cls}`;
  overlay.innerHTML = `<section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button class="modal-close" aria-label="关闭" data-close>×</button>${content}</section>`;
  document.body.append(overlay);
  document.body.classList.add("modal-open");
  overlay
    .querySelector("[data-close]")
    ?.addEventListener("click", () => closeModal());
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });
  overlay.querySelector<HTMLElement>("input,button,a")?.focus();
}
function closeModal(restore = true) {
  document.querySelector(".modal-overlay")?.remove();
  document.body.classList.remove("modal-open");
  if (restore) lastFocused?.focus({ preventScroll: true });
}
function openSources(ids: string[], figureId?: string) {
  const figure = figureId ? biographyFigures.find(item => item.id === figureId) : undefined;
  const attribution = figure ? `<div class="figure-attribution"><h3>${esc(figure.title)}</h3><p class="figure-credit">${renderFigureCredit(figure)}</p></div>` : "";
  openModal(
    `<div class="eyebrow">CHECK THE EVIDENCE</div><h2 id="modal-title">${figure ? figure.kind === "photo" ? "图片来源与许可" : "图解来源" : "这条线索的来源"}</h2>${attribution}<p class="modal-intro">保留原始语境，检查发布与核验日期。</p>${sourceList(ids)}<div class="quiet-note">资料可能描述历史状态。核验日期并不表示来源中每个角色都延续至今。</div>`,
    "source-drawer",
  );
}
function openSearch() {
  searchKind = "all";
  openModal(
    `<div class="eyebrow">FIND YOUR NEXT CONNECTION</div><h2 id="modal-title">想从哪里开始？</h2><label class="search-input">${searchIcon}<input id="atlas-search" type="search" placeholder="姓名、文章标题或正文关键词…" autocomplete="off" aria-label="搜索 Atlas"></label><div class="pills search-filters">${[
      ["all", "全部"],
      ["company", "公司"],
      ["person", "人物"],
      ["product", "产品"],
      ["event", "事件"],
    ]
      .map(
        ([v, n]) =>
          `<button data-search-kind="${v}" aria-pressed="${v === "all"}">${n}</button>`,
      )
      .join("")}</div><div id="search-results" aria-live="polite"></div><p class="search-keys" aria-hidden="true"><kbd>↑</kbd><kbd>↓</kbd> 选择<kbd>Enter</kbd> 打开<kbd>Esc</kbd> 关闭</p>`,
    "search-modal",
  );
  const input = document.querySelector<HTMLInputElement>("#atlas-search")!;
  input.focus();
  input.addEventListener("input", () => search(input.value));
  document.querySelector<HTMLElement>(".search-modal .modal")?.addEventListener("keydown", (e) => {
    if (e.isComposing || e.keyCode === 229) return;
    const results = [...document.querySelectorAll<HTMLElement>("#search-results .search-result")];
    if (e.key === "Enter" && e.target === input) results[0]?.click();
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const stops = [input, ...results];
    const next = stops.indexOf(document.activeElement as HTMLElement) + (e.key === "ArrowDown" ? 1 : -1);
    stops[Math.min(stops.length - 1, Math.max(0, next))].focus();
  });
  document
    .querySelectorAll<HTMLButtonElement>("[data-search-kind]")
    .forEach((b) =>
      b.addEventListener("click", () => {
        searchKind = b.dataset.searchKind!;
        document
          .querySelectorAll("[data-search-kind]")
          .forEach((x) =>
            x.setAttribute(
              "aria-pressed",
              String((x as HTMLElement).dataset.searchKind === searchKind),
            ),
          );
        search(input.value);
      }),
    );
  search("");
}
function search(query: string) {
  const q = normalizeSearchQuery(query);
  const hits = searchAtlas(query, searchKind);
  const elsewhere = q && !hits.length && searchKind !== "all" ? searchAtlas(query).length : 0;
  const box = document.querySelector("#search-results")!;
  const lit = (text: string) => {
    const at = q ? text.toLocaleLowerCase().indexOf(q) : -1;
    return at < 0 ? esc(text) : `${esc(text.slice(0, at))}<mark>${esc(text.slice(at, at + q.length))}</mark>${esc(text.slice(at + q.length))}`;
  };
  const kinds: Record<string, string> = { company: "公司", organization: "组织", person: "人物", product: "产品", event: "事件" };
  const mark = (id: string, kind: string) => {
    const company = companyById(id), person = personById(id), entity = extraById(id);
    if (company) return brand(company);
    if (person) return face(person);
    const event = kind === "event" && events.find(e => e.id === id);
    return `<span class="brand">${esc(entity?.initial || (event && event.date.slice(2, 4)) || "")}</span>`;
  };
  box.innerHTML = `<p class="search-count">${q ? `找到 ${hits.length} 条线索` : "探索索引中的精选条目"}</p>${hits.length ? hits.map(e => `<a class="search-result" href="${esc(e.href)}"><span class="result-mark">${mark(e.markId, e.kind)}</span><span><strong>${lit(e.name)}</strong><small><span class="result-kind">${kinds[e.kind]}</span> · ${lit(e.sub)}</small></span>${arrow}</a>`).join("") : `<div class="empty-state"><h3>${elsewhere ? "这个分类中没有匹配项" : "还没有找到这条线索"}</h3><p>${elsewhere ? `其他分类还有 ${elsewhere} 条相关线索。` : "试试缩短关键词，或搜索人物姓名、文章标题和正文中的词语。"}</p>${elsewhere ? '<button class="text-link" data-search-reset>查看全部分类</button>' : ""}</div>`}`;
  box.querySelector<HTMLButtonElement>("[data-search-reset]")?.addEventListener("click", () => {
    searchKind = "all";
    document.querySelectorAll<HTMLElement>("[data-search-kind]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.searchKind === "all")));
    search(query);
    document.querySelector<HTMLInputElement>("#atlas-search")?.focus();
  });
  box.querySelectorAll<HTMLAnchorElement>("a.search-result").forEach(a => a.addEventListener("click", event => {
    // Modified clicks retain native new-tab behavior and the current search.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    closeModal(false);
    if (a.hash === location.hash) {
      event.preventDefault();
      focusRoute();
    }
  }));
}

function readingTarget(section: string): HTMLElement | null {
  const path = (location.hash.slice(1) || "/").split("?")[0];
  if (!path.startsWith("/person/") && path !== "/timeline") return null;
  const target = document.getElementById(section);
  return target && app.contains(target) && target.matches(".person-page .chapter, .person-page .writing-list > li, .person-page #person-sources .sources-list > article, .timeline > article") ? target : null;
}
function focusReadingTarget(target: HTMLElement | null) {
  if (!target) return false;
  const disclosure = target.querySelector<HTMLDetailsElement>(".biography-disclosure");
  if (disclosure) {
    disclosure.open = true;
    biographyOpenState.set(disclosure.dataset.biographyKey!, true);
  }
  target.setAttribute("tabindex", "-1");
  target.scrollIntoView({ block: "start", behavior: "instant" });
  target.focus({ preventScroll: true });
  return true;
}
function focusRoute() {
  const params = new URLSearchParams((location.hash.slice(1) || "/").split("?")[1] || "");
  if (focusReadingTarget(readingTarget(params.get("section") || ""))) return;
  window.scrollTo({ top: 0, behavior: "instant" });
  const main = app.querySelector<HTMLElement>("main");
  main?.setAttribute("tabindex", "-1");
  main?.focus({ preventScroll: true });
}
// Opacity only, so measured geometry never shifts while a page arrives.
function fadeIn() {
  if (matchMedia("(prefers-reduced-motion:reduce)").matches) return;
  app.querySelector("main")?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 320, easing: "ease" });
}
// On a document reload WebKit completes native restoration after module
// evaluation. Reapply a deep target at pageshow, once layout is ready.
window.addEventListener("pageshow", () => {
  const route = location.hash;
  if (!new URLSearchParams(route.split("?")[1] || "").has("section")) return;
  requestAnimationFrame(() => {
    if (location.hash === route && !document.querySelector(".modal")) focusRoute();
  });
});
window.addEventListener("hashchange", () => {
  closeModal(false);
  render();
  fadeIn();
  focusRoute();
});
matchMedia("(max-width:600px)").addEventListener("change", () => {
  if (activeGraph) {
    const focused = (document.activeElement as HTMLElement)?.dataset.relation;
    render();
    if (focused) app.querySelector<HTMLElement>(`[data-relation="${CSS.escape(focused)}"]`)?.focus({ preventScroll: true });
  }
});
document.addEventListener("keydown", (e) => {
  if (e.isComposing || e.keyCode === 229) return;
  const modal = document.querySelector<HTMLElement>(".modal");
  if (e.key === "Escape" && modal) {
    e.preventDefault();
    closeModal();
  }
  if (
    !modal &&
    ((e.key === "/" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) ||
      (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)))
  ) {
    e.preventDefault();
    openSearch();
  }
  if (e.key === "Tab" && modal) {
    const all = [
      ...modal.querySelectorAll<HTMLElement>(
        'a[href],button:not([disabled]),input,[tabindex="0"]',
      ),
    ];
    const first = all[0],
      last = all[all.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});
render();
if (new URLSearchParams(location.hash.split("?")[1] || "").has("section")) focusRoute();
fadeIn();
