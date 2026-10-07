import { companies, people, additionalEntities, relationships } from "./data.ts";
import type { Relationship } from "./data.ts";

export const graphLabels: Record<string, string> = {
  all: "全部关系", employment: "人物与任职", governance: "组织与治理",
  product: "产品与技术", investment: "投资与合作",
};
export const graphStatusLabels = { current: "近期核验", historical: "历史记录", snapshot: "资料快照", event: "发布事件", navigation: "导航连接" };
export const timeLabels: Record<string, string> = { recent: "较新资料", historical: "历史记录", all: "全部" };
export const knownEntity = (id: string) => [...companies, ...people, ...additionalEntities].some(e => e.id === id);
export const directRelations = (root: string) => relationships.filter(r => r.from === root || r.to === root);
export const otherEndpoint = (r: Relationship, root: string) => r.from === root ? r.to : r.from;
export const founderIdentity = (personId: string, root: string) => people.some(p => p.id === personId && p.companyId === root && /联合创始人|共同创始人|co-founder/i.test(p.role));
export type Neighbor = { id: string; records: Relationship[] };
export type GraphState = {
  root: string; filter: string; status: string; relation: string; page: number; pageSize: number;
  view: "graph" | "list"; from: string; neighbors: Neighbor[]; visible: Neighbor[];
  selected?: Relationship; target: string; pageCount: number; recordCount: number;
};
const family = new Set(["openai", "openai-foundation", "openai-group-pbc"]);
export function graphState(fallback: string, params: URLSearchParams, pageSize = 6): GraphState {
  const requested = relationships.find(r => r.id === params.get("relation"));
  const explicitRoot = params.get("root");
  let root = explicitRoot && knownEntity(explicitRoot) ? explicitRoot : fallback;
  // Old dossier URLs included Foundation/Group facts. Recover their actual endpoint,
  // while keeping unrelated records out of an OpenAI legacy route.
  if (!explicitRoot && requested && fallback === "openai" && ![requested.from, requested.to].includes(root)) {
    root = [requested.from, requested.to].find(id => family.has(id)) || root;
  }
  const direct = directRelations(root);
  const linked = direct.find(r => r.id === requested?.id);
  const filterValue = params.get("filter") || "";
  const filter = Object.hasOwn(graphLabels, filterValue) ? filterValue : linked?.type || (root === "openai" ? "employment" : "all");
  const statusValue = params.get("status") || "";
  const status = Object.hasOwn(timeLabels, statusValue) ? statusValue : linked ? "all" : filter === "employment" && root === "openai" ? "recent" : "all";
  const records = direct.filter(r => (filter === "all" || r.type === filter) &&
    (status === "all" || status === "historical" && r.status === "historical" || status === "recent" && ["current", "snapshot"].includes(r.status)));
  const byEntity = new Map<string, Neighbor>();
  for (const r of records) {
    const id = otherEndpoint(r, root);
    if (!byEntity.has(id)) byEntity.set(id, { id, records: [] });
    byEntity.get(id)!.records.push(r);
  }
  const neighbors = [...byEntity.values()];
  const pageCount = Math.max(1, Math.ceil(neighbors.length / pageSize));
  const pageValue = Number(params.get("page") || 1);
  let page = Math.min(pageCount, Math.max(1, Number.isInteger(pageValue) ? pageValue : 1));
  let selected = records.find(r => r.id === linked?.id);
  if (selected) page = Math.floor(neighbors.findIndex(n => n.id === otherEndpoint(selected!, root)) / pageSize) + 1;
  const visible = neighbors.slice((page - 1) * pageSize, page * pageSize);
  selected ||= visible[0]?.records[0];
  return { root, filter, status, relation: selected?.id || "", page, pageSize, view: params.get("view") === "list" ? "list" : "graph",
    from: knownEntity(params.get("from") || "") && params.get("from") !== root ? params.get("from")! : "",
    neighbors, visible, selected, target: selected ? otherEndpoint(selected, root) : "", pageCount, recordCount: records.length };
}
export function canonicalGraphParams(params: URLSearchParams, state: GraphState) {
  const result = new URLSearchParams(params);
  for (const [key, value] of Object.entries({ root: state.root, filter: state.filter, status: state.status, relation: state.relation, page: String(state.page), view: state.view, from: state.from })) {
    if (value) result.set(key, value); else result.delete(key);
  }
  return result;
}
export const graphHref = (root: string, from = "") => `#/explore?${new URLSearchParams({ root, filter: "all", status: "all", ...(from && from !== root ? { from } : {}) })}`;

type GraphHelpers = {
  esc: (value: unknown) => string; name: (id: string) => string; visual: (id: string) => string;
  profile: (id: string) => string; sourceCards: (ids: string[]) => string; sourceButton: (ids: string[], text: string) => string;
};
export function renderGraph(state: GraphState, h: GraphHelpers) {
  const { esc, name, visual } = h;
  const { root, selected, target, visible } = state;
  const rootPerson = people.find(p => p.id === root);
  const group = state.neighbors.find(n => n.id === target);
  const allTargetRecords = directRelations(root).filter(r => otherEndpoint(r, root) === target);
  const slots = visible.length <= 2 ? visible.map((_, i) => ({ x: 68, y: visible.length === 1 ? 50 : 28 + i * 44, side: "right" })) :
    visible.map((_, i) => {
      const leftCount = Math.floor(visible.length / 2), left = i < leftCount;
      const count = left ? leftCount : visible.length - leftCount;
      const j = left ? i : i - leftCount;
      return { x: left ? 2 : 68, y: count === 1 ? 50 : 18 + j * 64 / (count - 1), side: left ? "left" : "right" };
    });
  const hubX = visible.length <= 2 ? 27 : 50;
  const edges = visible.map((n, i) => {
    const slot = slots[i], end = slot.side === "left" ? 31 : 68;
    const start = slot.side === "left" ? hubX - 8 : hubX + 8;
    const current = n.id === target;
    const record = current ? selected! : n.records[0];
    return `<g class="atlas-edge ${current ? "is-selected" : ""} ${record.status === "historical" || record.status === "navigation" ? "is-dashed" : ""}" data-edge="${esc(n.id)}"><path d="M ${start * 10} 250 C ${((start + end) / 2) * 10} 250, ${((start + end) / 2) * 10} ${slot.y * 5}, ${end * 10} ${slot.y * 5}"/><circle cx="${end * 10}" cy="${slot.y * 5}" r="3"/></g>`;
  }).join("");
  const node = (n: Neighbor, i: number) => {
    const record = n.id === target ? selected! : n.records[0];
    return `<button class="graph-node atlas-node ${n.id === target ? "selected" : ""}" data-node="${esc(n.id)}" data-relation="${esc(record.id)}" aria-pressed="${n.id === target}" aria-controls="atlas-relation-detail" style="--node-x:${slots[i].x}%;--node-y:${slots[i].y}%">${visual(n.id)}<span class="atlas-node-copy"><strong>${esc(name(n.id))}</strong>${founderIdentity(n.id, root) ? '<span class="atlas-founder">联合创始人</span>' : ""}<small>${esc(record.label)}</small><span class="atlas-node-meta">${esc(graphStatusLabels[record.status])}${n.records.length > 1 ? ` · ${n.records.length} 条记录` : ""}</span></span></button>`;
  };
  return `<section class="atlas-explorer ${rootPerson ? "is-person-root" : ""}" aria-label="关系探索"><div class="atlas-heading"><div><div class="eyebrow">EXPLORE THE CONNECTIONS</div><h2>${rootPerson ? "公开关联与证据" : "公司与人物"}${rootPerson ? "" : "<span> / 关联浏览</span>"}</h2></div><div class="atlas-time-filters" aria-label="资料状态筛选">${Object.entries(timeLabels).map(([id, label]) => `<button data-relation-status="${id}" aria-pressed="${state.status === id}">${label}</button>`).join("")}</div></div>
  <div class="atlas-toolbar"><div class="atlas-type-filters" aria-label="关系类型筛选">${Object.entries(graphLabels).map(([id, label]) => `<button data-relation-filter="${id}" aria-pressed="${state.filter === id}">${label}</button>`).join("")}</div><span class="atlas-count">${state.neighbors.length} 个关联对象 · ${state.recordCount} 条记录</span></div>
  <div class="atlas-root-switch" aria-label="浏览中心"><span>浏览中心</span>${["openai", "openai-foundation", "openai-group-pbc"].map(id => `<button data-graph-root="${id}" aria-pressed="${root === id}">${esc(name(id))}</button>`).join("")}${!family.has(root) ? `<span class="atlas-current-root">${esc(name(root))}</span>` : ""}</div>
  <div class="explorer atlas-layout" data-root="${esc(root)}"><div class="atlas-graph-panel"><div class="atlas-stage-toolbar"><div>${state.from ? `<button data-graph-back="${esc(state.from)}">← 返回 ${esc(name(state.from))}</button>` : `<a href="#/company/openai">← 公司档案</a>`}<button data-graph-reset>重置视图</button></div><div class="atlas-view-toggle" aria-label="浏览方式"><button data-graph-view="graph" aria-pressed="${state.view === "graph"}">一跳关系</button><button data-graph-view="list" aria-pressed="${state.view === "list"}">列表</button></div></div>
  <div class="atlas-stage ${state.view === "list" ? "is-list" : ""} ${visible.length <= 2 ? "is-sparse" : ""}" data-view="${state.view}"><svg class="atlas-connections" viewBox="0 0 1000 500" preserveAspectRatio="none" aria-hidden="true">${edges}</svg><div class="atlas-hub" style="--hub-x:${hubX}%">${visual(root)}<strong>${esc(name(root))}</strong><span>${rootPerson ? "人物中心" : "浏览起点"}</span></div><div class="atlas-nodes">${visible.map(node).join("")}</div>${!visible.length ? `<div class="atlas-empty" role="status"><strong>这个筛选下暂无已收录关系</strong>${root === "openai" && state.filter === "governance" ? `<p>Foundation 与 Group PBC 的董事会记录分别收录。</p><a class="atlas-governance-route" href="${graphHref("openai-foundation", root)}">查看 Foundation 的治理关系 →</a><a href="${graphHref("openai-group-pbc", root)}">查看 Group PBC →</a>` : '<p>试试“全部”资料状态，或换一个关系类别。</p>'}<button data-graph-clear>查看全部关系</button></div>` : ""}</div>
  <div class="atlas-stage-bottom"><div class="atlas-legend"><span class="atlas-line-sample"></span>公开关联 <span class="atlas-line-sample dashed"></span>历史 / 导航</div><nav class="atlas-pagination" aria-label="关联对象分页"><button data-graph-page="${state.page - 1}" ${state.page === 1 ? "disabled" : ""} aria-label="上一页关联">←</button><span>第 ${state.page} / ${state.pageCount} 页</span><button data-graph-page="${state.page + 1}" ${state.page === state.pageCount ? "disabled" : ""} aria-label="下一页关联">→</button></nav></div><p class="atlas-disclaimer">连线表示公开关联，不表示上下级关系。每页最多 ${state.pageSize} 个对象；完整事实见关联详情。</p></div>
  <aside class="relation-detail atlas-detail" id="atlas-relation-detail" aria-live="polite" aria-label="已选关联详情" tabindex="-1">${selected ? `<span class="atlas-detail-kicker">已选关联</span><div class="atlas-detail-heading">${visual(target)}<div><h3>${esc(name(target))}</h3><span class="atlas-status status-${selected.status}">${esc(graphStatusLabels[selected.status])}</span><span class="atlas-detail-type">${esc(graphLabels[selected.type])}</span></div></div>${allTargetRecords.length > 1 ? `<label class="atlas-record-picker">此对象的关联记录 <span>${group?.records.length} / ${allTargetRecords.length} 条</span><select data-relation-record aria-label="选择此对象的关联记录">${group?.records.map(r => `<option value="${esc(r.id)}" ${r.id === selected.id ? "selected" : ""}>${esc(r.label)} · ${esc(graphStatusLabels[r.status])}</option>`).join("")}</select></label>${allTargetRecords.length !== group?.records.length ? '<button class="atlas-all-records" data-all-records>查看此对象全部记录 →</button>' : ""}` : ""}<dl class="atlas-facts"><div><dt>关联对象</dt><dd class="relation-direction">${esc(name(selected.from))} → ${esc(name(selected.to))}</dd></div><div><dt>关系</dt><dd class="selected-role">${esc(selected.label)}</dd></div><div><dt>公开资料时间</dt><dd class="date-label">${esc(selected.period)}</dd></div></dl><p class="atlas-evidence-summary">${esc(selected.detail)}</p>${selected.status === "snapshot" ? '<p class="atlas-status-note">资料快照不表示该职责已结束。</p>' : selected.status === "navigation" ? '<p class="atlas-status-note">导航用于浏览，不是法律控制关系。</p>' : ""}<div class="atlas-evidence"><h4>证据来源 <span>${selected.sourceIds.length}</span></h4>${h.sourceCards(selected.sourceIds)}${h.sourceButton(selected.sourceIds, "核对关联证据")}</div><div class="relation-actions atlas-detail-actions">${h.profile(target)}<button class="atlas-recenter" data-graph-root="${esc(target)}">以此为中心 →</button><button class="back-to-graph" data-back-to-graph>返回关系图 ↑</button></div>` : '<div class="atlas-detail-empty"><span>已选关联</span><h3>留白也是边界。</h3><p>目前没有符合筛选的公开记录。选择其他类别继续探索。</p></div>'}</aside></div>
  ${rootPerson ? `<section class="atlas-person-timeline" aria-label="人物资料时间线"><div class="atlas-timeline-heading"><h3>沿时间阅读</h3><a href="#/person/${esc(root)}">阅读完整人物档案 →</a></div><div class="atlas-timeline-items">${rootPerson.milestones.slice(-4).map(m => `<article><time>${esc(m.date)}</time><p>${esc(m.text)}</p>${h.sourceButton(m.sourceIds, "核对时间来源")}</article>`).join("")}</div><p class="atlas-timeline-note">日期按所引公开资料呈现；不由职称快照推断任命生效日。</p></section>` : ""}
  <div class="atlas-footnote"><span>i</span><p>你正在浏览 ${esc(name(root))} 的直接关联。资料状态由所引证据界定，不是实时组织架构。</p><a href="#/sources">查看来源 →</a></div></section>`;
}
