import "./style.css";
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
const arrow =
  '<span class="arrow-mark" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M6 18 18 6M6 6h12v12"/></svg></span>';
const searchIcon =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></svg>';
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
const relationTarget = (r: Relationship, companyId: string) =>
  personById(r.from)
    ? r.from
    : personById(r.to)
      ? r.to
      : r.to === companyId
        ? r.from
        : r.to;
const sourceById = (id: string) => sources.find((s) => s.id === id);
const labels: Record<string, string> = {
  all: "全部关系",
  governance: "组织与治理",
  employment: "人物与任职",
  investment: "投资与合作",
  product: "产品与技术",
};
let companyTab = "overview";
let relationFilter = "employment";
let selectedRelation = "";
let selectedCompanyFilter = "all";
let topicFilter = "all";
let searchKind = "all";
let lastFocused: HTMLElement | null = null;

function relationState(companyId: string, params: URLSearchParams) {
  const all = scopedRelations(companyId);
  const requested = all.find((r) => r.id === params.get("relation"));
  const filterParam = params.get("filter") || "";
  const filter = Object.hasOwn(labels, filterParam)
    ? filterParam
    : requested?.type || "employment";
  const visible = all.filter((r) => filter === "all" || r.type === filter);
  return {
    filter,
    relation: visible.find((r) => r.id === requested?.id)?.id || visible[0]?.id || "",
  };
}

function personContextHref(p: Person) {
  const dossiers = companies.filter((c) => c.coverage === "dossier");
  const ordered = [
    ...dossiers.filter((c) => c.id === p.companyId),
    ...dossiers.filter((c) => c.id !== p.companyId),
  ];
  for (const c of ordered) {
    const matches = scopedRelations(c.id).filter(
      (r) => r.from === p.id || r.to === p.id,
    );
    const relation = matches[0];
    if (relation) {
      const params = new URLSearchParams({
        tab: "relationships",
        filter: relation.type,
        relation: relation.id,
      });
      return `#/company/${c.id}?${params}`;
    }
  }
  return `#/company/${p.companyId}`;
}

function portrait(p: Person, cls = "") {
  const available = [
    "sam-altman",
    "greg-brockman",
    "mira-murati",
    "dario-amodei",
    "demis-hassabis",
  ];
  return `<div class="portrait ${cls} portrait-${esc(p.id)} ${available.includes(p.id) ? "" : "portrait-fallback"}">${available.includes(p.id) ? `<img src="${import.meta.env.BASE_URL}assets/${esc(p.id)}.jpg" alt="${esc(p.name)}" loading="lazy" onerror="this.style.display='none'">` : ""}<span class="portrait-initial" aria-hidden="true">${esc(p.initial)}</span><span class="portrait-caption">${esc(p.name.toUpperCase())} / PROFILE</span></div>`;
}
function brand(c: Company, cls = "") {
  return `<span class="brand brand-${esc(c.id)} ${cls}" aria-hidden="true">${({ openai: openaiLogo, anthropic: anthropicLogo, "google-deepmind": deepmindLogo, deepseek: deepseekLogo, "meta-ai": metaLogo, microsoft: microsoftLogo, xai: xaiLogo } as Record<string, string>)[c.id] || esc(c.initial)}</span>`;
}
function header(active = "") {
  return `<a class="skip-link" href="#main">跳至正文</a><header class="header"><a class="wordmark" href="#/" aria-label="AI Atlas 首页">${globe}<span>AI Atlas</span><small>人工智能公司与人物</small></a><nav aria-label="主导航"><a href="#/companies" ${active === "companies" ? 'aria-current="page"' : ""}>公司</a><a href="#/people" ${active === "people" ? 'aria-current="page"' : ""}>人物</a><a href="#/explore" ${active === "explore" ? 'aria-current="page"' : ""}>图谱</a><a href="#/topics" ${active === "topics" ? 'aria-current="page"' : ""}>专题</a></nav><button class="search-trigger" data-action="search" aria-label="搜索公司、人物和关键词">${searchIcon}<span>搜索 Atlas</span><kbd>/</kbd></button></header>`;
}
function footer() {
  return `<footer class="footer"><a href="#/" class="footer-logo">AI Atlas<span>从公司出发，看见更大的图景。</span></a><div><a href="#/about">关于与编辑原则</a><a href="#/sources">来源索引 ${arrow}</a><p>首版精选档案 · 版本更新 ${esc(datasetDate)}<br>独立编辑项目，与所收录组织无隶属关系</p></div><span class="footer-end">A LIVING INDEX<br>OF ARTIFICIAL INTELLIGENCE</span></footer>`;
}
function sourceButton(ids: readonly string[], text = "查看来源") {
  return `<button class="text-link source-link" data-sources="${esc(ids.join(","))}">${text} ${arrow}</button>`;
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
  return `<a class="company-card" href="#/company/${esc(c.id)}"><div class="company-card-top">${brand(c)}<div><h3>${esc(c.name)}</h3><span class="company-category">${esc(c.category)}</span></div>${arrow}</div><p>${esc(c.tagline)}</p><div class="card-bottom"><span class="coverage ${c.coverage === "dossier" ? "complete" : ""}">${c.coverage === "dossier" ? "深度专题" : "精选概览"}</span><span>${esc(c.topics.slice(0, 2).join(" / "))}</span></div></a>`;
}
function personCard(p: Person) {
  return `<a class="person-card" href="#/person/${esc(p.id)}">${portrait(p)}<div class="person-copy"><span class="person-role">${esc(p.role)}</span><div class="person-card-title"><h3>${esc(p.name)}</h3>${arrow}</div><p>${esc(p.summary)}</p><span class="person-read">阅读人物档案 <span>→</span></span></div></a>`;
}
function heroCollage() {
  const sam = personById("sam-altman") || people[0];
  return `<div class="hero-collage" aria-label="由 OpenAI 出发，探索人物、产品与组织关系"><svg class="collage-lines" viewBox="0 0 700 600" aria-hidden="true"><path d="M143 145C340 120 275 485 568 457M109 425C186 349 360 370 460 148M330 290Q565 235 606 387"/></svg><a href="#/company/openai?tab=products" class="collage-note note-product"><span>产品与技术 ${arrow}</span><div class="editorial-art art-dunes"></div><h3>ChatGPT</h3><p>从一次对话，<br>走向日常生活。</p></a><a href="#/person/${sam.id}" class="collage-person">${portrait(sam)}<div class="collage-person-label"><span>人物入口 ${arrow}</span><h3>Sam<br>Altman</h3><i></i><p>连接人物、组织<br>与关键时刻。</p></div></a><a class="collage-center" href="#/company/openai"><span class="orbit-mark">${openaiLogo}</span><h2>OpenAI</h2><p>研究、产品与组织<br>一家公司的多面图景</p><span class="mini-label">COMPANY / 001</span></a><a href="#/company/openai?tab=relationships" class="collage-note note-research"><span>研究与连接 ${arrow}</span><div class="editorial-art art-folds"></div><p>沿着公开证据，<br>认识 AI 背后的人。</p></a><a href="#/company/openai?tab=governance" class="collage-note note-governance"><span>组织与治理 ${arrow}</span><div class="editorial-art art-space"></div><p>辨别控制、任职与投资，<br>从关系中理解组织。</p></a></div>`;
}
function home() {
  return `${header()}<main id="main" class="home-page"><section class="hero"><div class="hero-copy"><div class="eyebrow">人工智能公司与人物</div><h1>看见公司，<br>理解 AI 的未来<span class="heading-dot">。</span></h1><p>从公司出发，连接人物、产品与关键脉络。<br>一本有来源，也有时间坐标的 AI 百科。</p><a class="button dark" href="#/company/openai">探索 OpenAI <span>→</span></a><div class="hero-footnote"><span>本期聚焦</span><span>OPENAI / 公司、人物与转折</span></div></div>${heroCollage()}</section><section class="home-companies">${sectionHeading("01", "公司索引", "认识塑造人工智能的组织。", "#/companies")}<div class="company-grid home-company-grid">${companies.slice(0, 3).map(companyCard).join("")}</div></section><section class="home-people">${sectionHeading("02", "从人物开始", "技术的演进，也是人的故事。", "#/people")}<div class="people-grid home-people-grid">${people.slice(0, 2).map(personCard).join("")}</div></section><section class="topics-section">${sectionHeading("03", "换个角度，继续探索", "一条线索，通往更完整的理解。")}<div class="topic-grid"><a href="#/company/openai?tab=products"><span class="topic-num">LENS 01</span><h3>产品与技术 ${arrow}</h3><p>从 ChatGPT 出发，<br>理解研究如何走向日常。</p><span class="topic-line"></span></a><a href="#/company/openai?tab=governance"><span class="topic-num">LENS 02</span><h3>组织与治理 ${arrow}</h3><p>读懂机构之间的关系，<br>辨别控制、任职与投资。</p><span class="topic-line"></span></a><a href="#/timeline"><span class="topic-num">LENS 03</span><h3>关键时刻 ${arrow}</h3><p>沿时间线回看，<br>找到重要的变化与转折。</p><span class="topic-line"></span></a></div></section><div class="editor-note"><span>编者注</span><p>关系图是理解线索的入口，并非实时组织架构。每条关联都标注时间与来源。</p><a href="#/about" aria-label="阅读编辑原则">${arrow}</a></div></main>${footer()}`;
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
function relationExplorer(companyId = "openai") {
  const all = scopedRelations(companyId),
    visible = all.filter(
      (r) => relationFilter === "all" || r.type === relationFilter,
    );
  const selected = visible.find((r) => r.id === selectedRelation) || visible[0];
  const target = selected ? relationTarget(selected, companyId) : "";
  const p = personById(target);
  const spacing = visible.length > 6 ? 90 : 108;
  const height = Math.max(540, visible.length * spacing + 36);
  const hubY = Math.min(height / 2, 300);
  const nodeY = (i: number) =>
    (height - (visible.length - 1) * spacing) / 2 + i * spacing;
  const paths = visible
    .map(
      (r, i) =>
        `<path class="${r.id === selected?.id ? "is-selected" : ""} ${r.navigationOnly ? "is-navigation" : ""}" d="M156 ${hubY} C260 ${hubY}, 275 ${nodeY(i)}, 400 ${nodeY(i)}"/>`,
    )
    .join("");
  return `<div class="relationship-heading"><div><div class="eyebrow">EXPLORE THE CONNECTIONS</div><h2>${relationFilter === "employment" ? "公司与人物" : "公司与世界"} <span>/ 关联浏览</span></h2></div><span class="relation-count">${visible.length} 条公开关联</span></div><div class="relationship-toolbar"><div class="pills relationship-filters" aria-label="关系类型筛选">${Object.entries(
    labels,
  )
    .map(
      ([id, label]) =>
        `<button data-relation-filter="${id}" aria-pressed="${relationFilter === id}">${label}</button>`,
    )
    .join(
      "",
    )}</div><span class="graph-instruction">选择一个节点，继续阅读</span></div><div class="explorer" data-company="${esc(companyId)}"><div class="graph"><div class="graph-scroll"><div class="graph-scene" style="--graph-height:${height}px"><svg class="graph-connections" viewBox="0 0 740 ${height}" preserveAspectRatio="none" aria-hidden="true">${paths}</svg><div class="graph-hub" style="top:${hubY}px">${brand(companyById(companyId) || companies[0])}<h3>${esc(relationshipName(companyId))}</h3><span>公司档案</span></div><div class="graph-nodes">${
    visible
      .map((r, i) => {
        const id = relationTarget(r, companyId);
        const person = personById(id);
        return `<button class="graph-node ${r.id === selected?.id ? "selected" : ""} ${r.navigationOnly ? "navigation-node" : ""}" style="top:${nodeY(i)}px" data-relation="${esc(r.id)}" aria-pressed="${r.id === selected?.id}"><span class="node-body">${person ? portrait(person, "node-portrait") : `<span class="node-organization">${companyById(id) ? brand(companyById(id)!) : globe}</span>`}<span class="node-text"><strong>${esc(relationshipName(id))}</strong><small>${esc(r.label)}</small><span class="node-date">${esc(r.period.split(" / ")[0])}</span></span><span class="node-arrow">${arrow}</span></span></button>`;
      })
      .join("") || '<p class="empty-state">此类别暂无已收录关系</p>'
  }</div></div></div>${visible.length > 7 ? `<div class="graph-scroll-hint">在图内向下滚动，浏览全部 ${visible.length} 条关联 ↓</div>` : ""}<div class="graph-disclaimer"><span>i</span>中心公司是浏览起点；确切方向见关联详情，不代表当前汇报关系。虚线仅表示导航。</div></div><aside class="relation-detail" aria-live="polite">${selected ? `<div class="detail-kicker"><span>当前${p ? "人物" : "条目"}</span><span>${labels[selected.type]}</span></div>${p ? portrait(p, "detail-portrait") : `<div class="relation-symbol">${companyById(target) ? brand(companyById(target)!) : globe}</div>`}<h3>${esc(relationshipName(target))}</h3><p class="selected-role">${esc(selected.label)}</p><span class="date-label">${esc(selected.period)}</span><p>${esc(selected.detail)}</p><p class="relation-direction">${esc(relationshipName(selected.from))} → ${esc(relationshipName(selected.to))}</p><div class="relation-actions">${relatedEntity(target)}${sourceButton(selected.sourceIds, "核对关联证据")}<button class="back-to-graph" data-back-to-graph>返回关系图 ↑</button></div>` : "<p>选择其他关系类别继续探索。</p>"}</aside></div><div class="explorer-footer"><div><h3>把人物放回公司的脉络</h3><p>从公司概览，继续阅读研究、产品与发展时间线。</p></div><a class="text-link" href="#/company/${companyId}">公司概览 ${arrow}</a><a class="text-link" href="#/company/${companyId}?tab=sources">资料来源 ${arrow}</a></div>`;
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
  return `${header("companies")}<main id="main">${breadcrumb([{ text: "公司", href: "#/companies" }, { text: c.name }])}<section class="company-hero"><div><div class="eyebrow">COMPANY DOSSIER / ${c.coverage === "dossier" ? "深度档案" : "精选概览"}</div><h1>${esc(c.name)}</h1><p>${esc(c.tagline)}</p><div class="company-meta"><span>${esc(c.founded)} · 成立</span><span>${esc(c.location)}</span><span>版本更新 ${esc(datasetDate)}</span></div></div><div class="company-hero-art"><div class="editorial-art art-space"></div><span>概念空间 · 非公司实景</span></div></section>${c.coverage === "dossier" ? `<nav class="tabs" aria-label="公司档案栏目">${tabs.map(([id, label]) => `<a href="#/company/${c.id}?tab=${id}" ${companyTab === id ? 'aria-current="page"' : ""}>${label}</a>`).join("")}</nav><div class="tab-content">${companyContent(c)}</div>` : `<div class="preview-content"><div class="eyebrow">A CONCISE INTRODUCTION</div><h2>从这里开始认识 ${esc(c.name)}</h2>${c.description.map((p) => `<p>${esc(p)}</p>`).join("")}<div class="tag-row">${c.topics.map((t) => `<a href="#/topics?topic=${encodeURIComponent(t)}">${esc(t)}</a>`).join("")}</div>${sourceButton(c.sourceIds)}<div class="quiet-note">这是精选概览，暂不提供完整人物图谱或实时组织架构。深度专题将从可核验的公开资料逐步扩展。</div></div>`}</main>${footer()}`;
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
function personPage(p: Person) {
  return `${header("people")}<main id="main">${breadcrumb([{ text: "人物", href: "#/people" }, { text: p.name }])}<section class="person-hero"><div><div class="eyebrow">PEOPLE / 人物档案</div><h1>${esc(p.name)}</h1><p class="cn-name">${esc(p.cnName)}</p><span class="role-label">${esc(p.role)}</span><p class="person-deck">${esc(p.summary)}</p><a href="${esc(personContextHref(p))}" class="text-link">放回公司的脉络中阅读 ${arrow}</a></div>${portrait(p, "profile-portrait")}</section><div class="reading-layout person-reading"><article><div class="eyebrow">THE STORY</div><h2>经历与贡献</h2>${p.paragraphs.map((text, index) => `<p>${esc(text)}</p>${p.paragraphSourceIds?.[index]?.length ? sourceButton(p.paragraphSourceIds[index], "本段依据") : ""}`).join("")}<h2 class="milestone-heading">沿着时间阅读</h2><div class="milestones">${p.milestones.map((m) => `<article><time>${esc(m.date)}</time><div><p>${esc(m.text)}</p>${sourceButton(m.sourceIds)}</div></article>`).join("")}</div><h2 class="milestone-heading">人物资料来源</h2>${sourceList(p.sourceIds)}</article><aside class="reading-aside"><span>人物档案 / 阅读须知</span><h3>贡献需要语境。</h3><p>这里不将集体成果归于某一个人，也不以历史头衔暗示当前职位。请结合事件日期和原始资料阅读。</p><a href="#/company/${esc(p.companyId)}" class="text-link">${esc(relationshipName(p.companyId))} 公司档案 ${arrow}</a></aside></div></main>${footer()}`;
}
function timeline(entityId?: string) {
  const list = events.filter(
    (e) => !entityId || e.entityIds.includes(entityId),
  );
  return `<div class="content-heading"><div class="eyebrow">MOMENTS THAT MATTER</div><h2>沿着时间，理解变化。</h2><p>精选公开事件 · ${list.length} 个可追溯的节点</p></div><div class="timeline">${list
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date))
    .map(
      (e) =>
        `<article><time>${esc(e.date)}</time><div class="timeline-dot"></div><div><h3>${esc(e.title)}</h3><p>${esc(e.description)}</p><div class="timeline-foot"><span>${e.entityIds.map((id) => esc(relationshipName(id))).join(" / ")}</span>${sourceButton(e.sourceIds, "事件来源")}</div></div></article>`,
    )
    .join("")}</div>`;
}
function sourceList(ids: readonly string[]) {
  return `<div class="sources-list">${[...new Set(ids)]
    .map((id, index) => {
      const s = sourceById(id);
      return s
        ? `<article><span class="source-index">${String(index + 1).padStart(2, "0")}</span><div><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)} ${arrow}</a><p>${esc(new URL(s.url).hostname)}${s.published ? ` · 发布 ${esc(s.published)}` : ""} · 核验 ${esc(s.verified)}</p></div></article>`
        : "";
    })
    .join("")}</div>`;
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
  return `${header()}<main id="main">${breadcrumb([{ text: "关于与编辑原则" }])}<section class="page-intro"><div class="eyebrow">ABOUT THE ATLAS</div><h1>让好奇，有据可循。</h1><p>AI Atlas 是一本以公司为起点的中文人工智能百科。</p></section><div class="reading-layout"><article class="about-copy"><h2>不是排行榜，而是理解的入口。</h2><p>我们连接公司、人物、产品与关键时刻，希望让复杂的 AI 生态变得可以阅读、可以探索、可以核对。</p><h2>我们如何处理事实</h2><ol><li><strong>优先原始资料。</strong>公司公告、论文和当事人的公开陈述各有局限；来源支持某项陈述，不意味着我们认同来源的一切观点。</li><li><strong>给历史加上日期。</strong>创始身份、过去任职与目前任职不是同一回事。本版以日期明确的资料为基础，不宣称实时完整。</li><li><strong>区分不同的关系。</strong>治理、任职、投资合作与产品各有自己的含义。关系图不推断汇报线，也不是权力排序。</li><li><strong>明确收录边界。</strong>OpenAI 为首版深度专题，其他组织是精选概览。缺失不等于不存在，概览也不等于完整公司数据库。</li></ol><h2>版本与核验</h2><p>本版最近编辑日期：${esc(datasetDate)}，各条来源分别标注核验日期。这是静态编辑版本，没有自动抓取实时新闻或人员变动。事实上的新变化应回到官方原文确认。</p><h2>图像、署名与许可</h2><p>沙丘、纸张与室内空间是 AI 生成的概念插画，不是公司的实景或产品界面。人物肖像均为真实照片，以 CSS 灰度和响应式裁切显示；摄影者及人物不为本站背书。未取得可用照片的人物使用字母识别，不以生成肖像代替本人。</p><ul class="asset-credits"><li><a href="https://commons.wikimedia.org/wiki/File:Sam_Altman_CropEdit_James_Tamim.jpg" target="_blank" rel="noopener noreferrer">Sam Altman · 照片来源</a><span>Steve Jennings / TechCrunch，2019 · <a href="https://creativecommons.org/licenses/by/2.0/" target="_blank" rel="noopener noreferrer">CC BY 2.0</a></span></li><li><a href="https://commons.wikimedia.org/wiki/File:Disrupt_SF_TechCrunch_Disrupt_San_Francisco_2019_-_Day_2_(48838200316)_(cropped).jpg" target="_blank" rel="noopener noreferrer">Greg Brockman · 照片来源</a><span>Steve Jennings / TechCrunch，2019 · <a href="https://creativecommons.org/licenses/by/2.0/" target="_blank" rel="noopener noreferrer">CC BY 2.0</a></span></li><li><a href="https://commons.wikimedia.org/wiki/File:Dario_Amodei_at_TechCrunch_Disrupt_2023_01_(cropped).jpg" target="_blank" rel="noopener noreferrer">Dario Amodei · 照片来源</a><span>Kimberly White / TechCrunch，2023 · <a href="https://creativecommons.org/licenses/by/2.0/" target="_blank" rel="noopener noreferrer">CC BY 2.0</a></span></li><li><a href="https://commons.wikimedia.org/wiki/File:Guests_at_the_2026_Met_Gala_274_(Mira_Murati).jpg" target="_blank" rel="noopener noreferrer">Mira Murati · 照片来源</a><span>SWinxy，2026 · <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a></span></li><li><a href="https://commons.wikimedia.org/wiki/File:Demis_Hassabis_in_2025_by_Christopher_Michel.jpg" target="_blank" rel="noopener noreferrer">Demis Hassabis · 照片来源</a><span>Christopher Michel，2025 · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a></span></li></ul><p>Demis Hassabis 照片及其显示处理遵循 CC BY-SA 4.0。其余肖像按各自许可署名。品牌图形仅作百科识别，不代表隶属或合作关系。</p><a class="text-link" href="#/sources">浏览所有公开资料 ${arrow}</a></article><aside class="reading-aside"><span>编辑立场</span><h3>克制地连接，<br>清楚地标注。</h3><p>没有来源的关系，不画。<br>没有核验的现状，不猜。<br>未被覆盖的内容，留白。</p></aside></div></main>${footer()}`;
}
function notFound() {
  return `${header()}<main id="main" class="not-found"><div class="eyebrow">404 / NOT IN THE ATLAS</div><h1>这条线索还没有被收录。</h1><p>回到索引，换一个起点继续探索。</p><a class="button dark" href="#/companies">浏览公司索引 →</a></main>${footer()}`;
}
function render() {
  const [path, query = ""] = (location.hash.slice(1) || "/").split("?");
  const params = new URLSearchParams(query);
  const parts = path.split("/").filter(Boolean);
  companyTab = params.get("tab") || "overview";
  if (!tabs.some((t) => t[0] === companyTab)) companyTab = "overview";
  // Read every route afresh so a selection never leaks across pages or companies.
  relationFilter = "employment";
  selectedRelation = "";
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
    const state = relationState(graphCompany, params);
    relationFilter = state.filter;
    selectedRelation = state.relation;
    params.set("filter", relationFilter);
    if (selectedRelation) params.set("relation", selectedRelation);
    else params.delete("relation");
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
    params.delete("relation");
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
    app.innerHTML = `${header("explore")}<main id="main">${breadcrumb([{ text: "关系图谱" }])}<section class="page-intro"><div class="eyebrow">THE RELATIONSHIP ATLAS</div><h1>每一条连接，都是线索。</h1><p>从 OpenAI 出发，探索不同类型的关系与它们的公开证据。</p></section>${relationExplorer()}</main>${footer()}`;
    document.title = "关系图谱 · AI Atlas";
  } else if (parts[0] === "topics") {
    topicFilter = params.get("topic") || "all";
    app.innerHTML = topicsPage();
    document.title = "专题探索 · AI Atlas";
  } else if (parts[0] === "timeline") {
    app.innerHTML = `${header("topics")}<main id="main">${breadcrumb([{ text: "关键时刻" }])}${timeline()}</main>${footer()}`;
    document.title = "关键时刻 · AI Atlas";
  } else if (parts[0] === "sources") {
    app.innerHTML = `${header()}<main id="main">${breadcrumb([{ text: "来源索引" }])}<section class="page-intro"><div class="eyebrow">THE EVIDENCE INDEX</div><h1>回到资料，继续阅读。</h1><p>${sources.length} 份公开资料 · 各条来源分别标注核验日期 · 外链将在新标签页打开</p></section>${sourceList(sources.map((s) => s.id))}</main>${footer()}`;
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
  bindEvents();
  // A pasted URL or history entry should reveal its selected graph node.
  const graph = app.querySelector<HTMLElement>(".graph-scroll");
  const selected = app.querySelector<HTMLElement>(".graph-node.selected");
  if (graph && selected) {
    graph.scrollTop = Math.max(0, selected.offsetTop - graph.clientHeight / 2);
  }
}
function updateQuery(
  values: Record<string, string>,
  focusSelector: string,
  showDetail = false,
) {
  const [path, query = ""] = (location.hash.slice(1) || "/").split("?");
  const params = new URLSearchParams(query);
  for (const [key, value] of Object.entries(values)) {
    if (value) params.set(key, value);
    else params.delete(key);
  }
  const hash = `#${path}${params.size ? `?${params}` : ""}`;
  if (location.hash !== hash) {
    const scroll = { left: window.scrollX, top: window.scrollY };
    const graph = app.querySelector(".graph-scroll");
    const graphScroll = { left: graph?.scrollLeft || 0, top: graph?.scrollTop || 0 };
    history.pushState(null, "", hash);
    render();
    app.querySelector(".graph-scroll")?.scrollTo(graphScroll);
    window.scrollTo({ ...scroll, behavior: "instant" });
  }
  app.querySelector<HTMLElement>(focusSelector)?.focus({ preventScroll: true });
  if (showDetail && matchMedia("(max-width:600px)").matches) {
    app.querySelector(".relation-detail")?.scrollIntoView({
      block: "start",
      behavior: matchMedia("(prefers-reduced-motion:reduce)").matches
        ? "instant"
        : "smooth",
    });
  }
}
function bindEvents() {
  app.querySelector("[data-back-to-graph]")?.addEventListener("click", () => {
    app.querySelector<HTMLElement>(".graph-node.selected")?.focus({ preventScroll: true });
    document.querySelector(".graph")?.scrollIntoView({
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
        openSources(b.dataset.sources!.split(",")),
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
  app
    .querySelectorAll<HTMLButtonElement>("[data-relation-filter]")
    .forEach((b) =>
      b.addEventListener("click", () => {
        const filter = b.dataset.relationFilter!;
        const companyId = app.querySelector<HTMLElement>(".explorer")!.dataset.company!;
        const state = relationState(companyId, new URLSearchParams({
          filter,
          relation: selectedRelation,
        }));
        updateQuery(
          { filter, relation: state.relation },
          `[data-relation-filter="${CSS.escape(filter)}"]`,
        );
      }),
    );
  app.querySelectorAll<HTMLButtonElement>("[data-relation]").forEach((b) =>
    b.addEventListener("click", () => {
      updateQuery(
        { relation: b.dataset.relation! },
        `[data-relation="${CSS.escape(b.dataset.relation!)}"]`,
        true,
      );
    }),
  );
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
function openSources(ids: string[]) {
  openModal(
    `<div class="eyebrow">CHECK THE EVIDENCE</div><h2 id="modal-title">这条线索的来源</h2><p class="modal-intro">保留原始语境，检查发布与核验日期。</p>${sourceList(ids)}<div class="quiet-note">资料可能描述历史状态。核验日期并不表示来源中每个角色都延续至今。</div>`,
    "source-drawer",
  );
}
function openSearch() {
  searchKind = "all";
  openModal(
    `<div class="eyebrow">FIND YOUR NEXT CONNECTION</div><h2 id="modal-title">想从哪里开始？</h2><label class="search-input">${searchIcon}<input id="atlas-search" type="search" placeholder="公司、人物、产品或关键词…" autocomplete="off" aria-label="搜索 Atlas"></label><div class="pills search-filters">${[
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
      .join("")}</div><div id="search-results" aria-live="polite"></div>`,
    "search-modal",
  );
  const input = document.querySelector<HTMLInputElement>("#atlas-search")!;
  input.focus();
  input.addEventListener("input", () => search(input.value));
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
  const q = query.trim().toLocaleLowerCase();
  const entries = [
    ...companies.map((c) => ({
      kind: "company",
      name: c.name,
      sub: c.tagline,
      text: [c.name, c.cnName, c.tagline, ...c.description, ...c.topics].join(
        " ",
      ),
      href: `#/company/${c.id}`,
    })),
    ...people.map((p) => ({
      kind: "person",
      name: p.name,
      sub: p.role,
      text: [p.name, p.cnName, ...(p.aliases || []), p.summary, p.role, ...p.paragraphs].join(" "),
      href: `#/person/${p.id}`,
    })),
    ...additionalEntities.map((e) => ({
      kind: e.type === "product" ? "product" : "organization",
      name: e.name,
      sub: e.summary,
      text: e.name + " " + e.cnName + " " + e.summary,
      href: `#/entity/${e.id}`,
    })),
    ...events.map((e) => ({
      kind: "event",
      name: e.title,
      sub: e.date,
      text: e.title + " " + e.description,
      href: "#/timeline",
    })),
  ];
  const hits = entries.filter(
    (e) =>
      (searchKind === "all" ||
        e.kind === searchKind ||
        (searchKind === "company" && e.kind === "organization")) &&
      (!q || e.text.toLocaleLowerCase().includes(q)),
  );
  const box = document.querySelector("#search-results")!;
  box.innerHTML = `<p class="search-count">${q ? `找到 ${hits.length} 条线索` : "探索索引中的精选条目"}</p>${hits.length ? hits.map((e) => `<a class="search-result" href="${e.href}"><span class="result-kind">${({ company: "公司", organization: "组织", person: "人物", product: "产品", event: "事件" } as Record<string, string>)[e.kind]}</span><span><strong>${esc(e.name)}</strong><small>${esc(e.sub)}</small></span>${arrow}</a>`).join("") : `<div class="empty-state"><h3>还没有找到这条线索</h3><p>试试「OpenAI」「治理」「ChatGPT」或人物的英文名。</p></div>`}`;
  box
    .querySelectorAll("a")
    .forEach((a) => a.addEventListener("click", () => closeModal(false)));
}
window.addEventListener("hashchange", () => {
  closeModal(false);
  render();
  window.scrollTo({ top: 0, behavior: "instant" });
  document.querySelector<HTMLElement>("main")?.setAttribute("tabindex", "-1");
  document.querySelector<HTMLElement>("main")?.focus({ preventScroll: true });
});
document.addEventListener("keydown", (e) => {
  const modal = document.querySelector<HTMLElement>(".modal");
  if (e.key === "Escape" && modal) {
    e.preventDefault();
    closeModal();
  }
  if (
    e.key === "/" &&
    !modal &&
    !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)
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
