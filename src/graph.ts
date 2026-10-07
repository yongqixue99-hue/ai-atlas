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
  const slots = visible.length <= 2 ? visible.map((_, i) => ({ x: 77, y: visible.length === 1 ? 50 : 28 + i * 44, side: "right" })) :
    visible.map((_, i) => {
      const leftCount = Math.floor(visible.length / 2), left = i < leftCount;
      const count = left ? leftCount : visible.length - leftCount;
      const j = left ? i : i - leftCount;
      return { x: left ? 17 : 83, y: count === 1 ? 50 : 20 + j * 60 / (count - 1), side: left ? "left" : "right" };
    });
  const hubX = visible.length <= 2 ? 30 : 50;
  const edges = visible.map((n, i) => {
    const slot = slots[i], end = slot.x;
    const start = slot.side === "left" ? hubX - 9 : hubX + 9;
    const current = n.id === target;
    const record = current ? selected! : n.records[0];
    return `<g class="atlas-edge ${current ? "is-selected" : ""} ${record.status === "historical" || record.status === "navigation" ? "is-dashed" : ""}" data-edge="${esc(n.id)}"><path d="M ${start * 10} 250 C ${((start + end) / 2) * 10} 250, ${((start + end) / 2) * 10} ${slot.y * 5}, ${end * 10} ${slot.y * 5}"/></g>`;
  }).join("");
  const node = (n: Neighbor, i: number) => {
    const record = n.id === target ? selected! : n.records[0];
    const caption = rootPerson && !people.some(person => person.id === n.id)
      ? record.type === "employment" && record.status === "historical" ? "历史任职" : ({ employment: "任职关联", product: "产品关联", governance: "治理关联", investment: "投资合作" } as Record<string, string>)[record.type]
      : record.label;
    return `<button class="graph-node atlas-node ${n.id === target ? "selected" : ""}" data-node="${esc(n.id)}" data-relation="${esc(record.id)}" aria-pressed="${n.id === target}" aria-controls="atlas-relation-detail" style="--node-x:${slots[i].x}%;--node-y:${slots[i].y}%">${visual(n.id)}<span class="atlas-node-copy"><strong>${esc(name(n.id))}</strong><small>${esc(caption)}</small></span></button>`;
  };
  const controls = `<details class="atlas-controls atlas-disclosure"><summary aria-controls="atlas-controls-content">浏览设置 <span aria-hidden="true">⌄</span></summary><div class="atlas-controls-content" id="atlas-controls-content"><div class="atlas-control-heading"><strong>筛选与视图</strong><button data-close-disclosure aria-label="关闭浏览设置">×</button></div><fieldset><legend>资料状态</legend><div class="atlas-time-filters">${Object.entries(timeLabels).map(([id, label]) => `<button data-relation-status="${id}" aria-pressed="${state.status === id}">${label}</button>`).join("")}</div></fieldset><fieldset><legend>关系类型</legend><div class="atlas-type-filters">${Object.entries(graphLabels).map(([id, label]) => `<button data-relation-filter="${id}" aria-pressed="${state.filter === id}">${label}</button>`).join("")}</div></fieldset><fieldset><legend>浏览中心</legend><div class="atlas-root-switch">${["openai", "openai-foundation", "openai-group-pbc"].map(id => `<button data-graph-root="${id}" aria-pressed="${root === id}">${esc(name(id))}</button>`).join("")}${!family.has(root) ? `<span class="atlas-current-root">${esc(name(root))}</span>` : ""}</div></fieldset><fieldset><legend>浏览方式</legend><div class="atlas-view-toggle"><button data-graph-view="graph" aria-pressed="${state.view === "graph"}">一跳关系</button><button data-graph-view="list" aria-pressed="${state.view === "list"}">列表</button></div></fieldset><button class="atlas-reset" data-graph-reset>重置视图</button></div></details>`;
  const evidence = selected ? `<details class="atlas-evidence-disclosure atlas-disclosure"><summary aria-controls="atlas-evidence-content">查看依据 <span aria-hidden="true">↗</span></summary><div class="atlas-evidence-content" id="atlas-evidence-content"><div class="atlas-record-context"><span class="atlas-status status-${selected.status}">${esc(graphStatusLabels[selected.status])}</span><span class="atlas-detail-type">${esc(graphLabels[selected.type])}</span>${founderIdentity(target, root) ? '<span class="atlas-founder">联合创始人</span>' : ""}</div>${allTargetRecords.length > 1 ? `<label class="atlas-record-picker">此对象的关联记录 <span>${group?.records.length} / ${allTargetRecords.length} 条</span><select data-relation-record aria-label="选择此对象的关联记录">${group?.records.map(r => `<option value="${esc(r.id)}" ${r.id === selected.id ? "selected" : ""}>${esc(r.label)} · ${esc(graphStatusLabels[r.status])}</option>`).join("")}</select></label>${allTargetRecords.length !== group?.records.length ? '<button class="atlas-all-records" data-all-records>查看此对象全部记录 →</button>' : ""}` : ""}<dl class="atlas-facts"><div><dt>关联对象</dt><dd class="relation-direction">${esc(name(selected.from))} → ${esc(name(selected.to))}</dd></div><div><dt>关系</dt><dd class="selected-role">${esc(selected.label)}</dd></div><div><dt>公开资料时间</dt><dd class="date-label">${esc(selected.period)}</dd></div></dl><p class="atlas-evidence-summary">${esc(selected.detail)}</p>${selected.status === "snapshot" ? '<p class="atlas-status-note">资料快照不表示该职责已结束。</p>' : selected.status === "navigation" ? '<p class="atlas-status-note">导航用于浏览，不是法律控制关系。</p>' : selected.status === "current" ? '<p class="atlas-status-note">近期核验以所引资料为准，不代表实时状态。</p>' : ""}<div class="atlas-evidence"><h4>证据来源 <span>${selected.sourceIds.length}</span></h4>${h.sourceCards(selected.sourceIds)}${h.sourceButton(selected.sourceIds, "核对关联证据")}</div><button class="atlas-close-evidence" data-close-disclosure>收起依据 ↑</button></div></details>` : "";
  return `<section class="atlas-explorer ${rootPerson ? "is-person-root" : ""}" aria-label="关系探索"><div class="atlas-heading"><div class="atlas-context">${state.from ? `<button class="atlas-back" data-graph-back="${esc(state.from)}">← ${esc(name(state.from))}</button>` : ""}<span class="atlas-count">${state.neighbors.length} 个关联</span></div>${controls}</div>
  <div class="explorer atlas-layout" data-root="${esc(root)}"><div class="atlas-graph-panel"><div class="atlas-stage ${state.view === "list" ? "is-list" : ""} ${visible.length <= 2 ? "is-sparse" : ""}" data-view="${state.view}"><svg class="atlas-connections" viewBox="0 0 1000 500" preserveAspectRatio="none" aria-hidden="true">${edges}</svg><div class="atlas-hub" style="--hub-x:${hubX}%" tabindex="-1">${visual(root)}<strong>${esc(name(root))}</strong></div><div class="atlas-nodes">${visible.map(node).join("")}</div>${!visible.length ? `<div class="atlas-empty" role="status"><strong>这个筛选下暂无已收录关系</strong>${root === "openai" && state.filter === "governance" ? `<p>董事会记录按机构分别收录。</p><a class="atlas-governance-route" href="${graphHref("openai-foundation", root)}">查看 Foundation 的治理关系 →</a><a href="${graphHref("openai-group-pbc", root)}">查看 Group PBC →</a>` : '<p>换一个资料状态或关系类别。</p>'}<button data-graph-clear>查看全部关系</button></div>` : ""}</div>${state.pageCount > 1 ? `<nav class="atlas-pagination" aria-label="关联对象分页"><button data-graph-page="${state.page - 1}" ${state.page === 1 ? "disabled" : ""} aria-label="上一页关联">←</button><span>${state.page} / ${state.pageCount}</span><button data-graph-page="${state.page + 1}" ${state.page === state.pageCount ? "disabled" : ""} aria-label="下一页关联">→</button></nav>` : ""}</div>
  <aside class="relation-detail atlas-detail" id="atlas-relation-detail" aria-live="polite" aria-label="已选关联详情" tabindex="-1">${selected ? `<div class="atlas-detail-heading">${visual(target)}<div><h3>${esc(name(target))}</h3><p class="atlas-selected-role">${rootPerson ? "关系：" : ""}${esc(selected.label)}</p></div></div><p class="atlas-selected-summary">${rootPerson ? `${esc(people.find(p => p.id === selected.from)?.aliases?.[0] || name(selected.from))} → ${esc(people.find(p => p.id === selected.to)?.aliases?.[0] || name(selected.to))}` : `公开资料记录其与 ${esc(name(root))} 的关联。`}</p>${evidence}<div class="relation-actions atlas-detail-actions">${h.profile(target)}<button class="atlas-recenter" data-graph-root="${esc(target)}">以此为中心 →</button><button class="back-to-graph" data-back-to-graph>返回关系图 ↑</button></div>` : '<div class="atlas-detail-empty"><p>选择其他类别，继续探索。</p></div>'}</aside></div>
  ${rootPerson ? `<details class="atlas-person-timeline atlas-disclosure"><summary>沿时间阅读 <span aria-hidden="true">＋</span></summary><div class="atlas-timeline-content"><a href="#/person/${esc(root)}">阅读完整人物档案 →</a><div class="atlas-timeline-items">${rootPerson.milestones.slice(-4).map(m => `<article><time>${esc(m.date)}</time><p>${esc(m.text)}</p>${h.sourceButton(m.sourceIds, "核对时间来源")}</article>`).join("")}</div><p class="atlas-timeline-note">日期按所引公开资料呈现；不由职称快照推断任命生效日。</p></div></details>` : ""}
  <details class="atlas-info atlas-disclosure"><summary>图谱说明 <span aria-hidden="true">＋</span></summary><div class="atlas-info-content"><p>你正在浏览 ${esc(name(root))} 的直接关联。连线表示公开关联，不表示上下级关系。</p><p>资料状态由所引证据界定，不是实时组织架构。实线表示公开关联，虚线表示历史记录或导航连接。</p><p>此筛选共 ${state.neighbors.length} 个对象、${state.recordCount} 条记录；每页最多 ${state.pageSize} 个对象，完整事实见「查看依据」。</p><a href="#/sources">查看来源索引 →</a></div></details></section>`;
}
