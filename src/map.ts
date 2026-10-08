import { companies, people, relationships } from "./data.ts";

// Foundation and Group PBC are read as part of the OpenAI node on the overview map;
// the relationship explorer keeps them as separate endpoints.
const family: Record<string, string> = { "openai-foundation": "openai", "openai-group-pbc": "openai" };
const nodeOf = (id: string) => family[id] || id;
const isCompany = (id: string) => companies.some(c => c.id === id);
const isPerson = (id: string) => people.some(p => p.id === id);

export type MapEdge = { a: string; b: string; past: boolean };
// Only sourced records become lines. A pair is dashed when every record between
// the two is historical; one current or snapshot record makes it solid.
export function mapEdges(): MapEdge[] {
  const pairs = new Map<string, MapEdge>();
  for (const r of relationships) {
    if (r.navigationOnly) continue;
    const a = nodeOf(r.from), b = nodeOf(r.to);
    if (a === b || ![a, b].every(id => isCompany(id) || isPerson(id))) continue;
    const key = [a, b].sort().join("|");
    const edge = pairs.get(key) || { a, b, past: true };
    if (r.status !== "historical") edge.past = false;
    pairs.set(key, edge);
  }
  return [...pairs.values()];
}

type Point = [number, number];
type Layout = { w: number; h: number; pos: Record<string, Point> };
const ring = (c: Point, r: number, angles: Record<string, number>) =>
  Object.fromEntries(Object.entries(angles).map(([id, deg]) => [id, [c[0] + r * Math.cos(deg * Math.PI / 180), c[1] + r * Math.sin(deg * Math.PI / 180)] as Point]));
// Hand-placed so that people who moved sit between the two organisations.
// An entity without a position here is left off the map, not guessed.
export const mapLayouts: Record<"wide" | "tall", Layout> = {
  wide: { w: 1000, h: 800, pos: {
    openai: [470, 400], microsoft: [120, 130], xai: [335, 72], "meta-ai": [92, 400], "google-deepmind": [138, 655], deepseek: [592, 722],
    anthropic: [872, 118], ssi: [876, 398], "thinking-machines": [872, 678],
    "dario-amodei": [702, 226], "ilya-sutskever": [716, 398], "mira-murati": [706, 566], "demis-hassabis": [262, 640],
    ...ring([470, 400], 185, { "sam-altman": 270, "greg-brockman": 244, "thibault-sottiaux": 188, "jakub-pachocki": 160, "fidji-simo": 132, "brad-lightcap": 106, "bret-taylor": 80, "paul-christiano": 54 }),
  } },
  tall: { w: 600, h: 820, pos: {
    openai: [300, 330], microsoft: [84, 78], deepseek: [300, 56], "google-deepmind": [516, 78], "meta-ai": [66, 512], xai: [534, 512],
    anthropic: [104, 688], ssi: [300, 752], "thinking-machines": [496, 688],
    "dario-amodei": [176, 584], "ilya-sutskever": [300, 604], "mira-murati": [424, 584], "demis-hassabis": [414, 96],
    ...ring([300, 330], 135, { "sam-altman": 280, "greg-brockman": 250, "thibault-sottiaux": 310, "jakub-pachocki": 340, "fidji-simo": 10, "brad-lightcap": 210, "bret-taylor": 180, "paul-christiano": 150 }),
  } },
};
const shortName: Record<string, string> = { "google-deepmind": "DeepMind", ssi: "Safe Superintelligence", "thinking-machines": "Thinking Machines" };

type MapHelpers = { esc: (value: unknown) => string; brand: (id: string) => string; face: (id: string) => string };
export function renderMap(h: MapHelpers) {
  const { esc } = h;
  const edges = mapEdges();
  const linked = new Set(edges.flatMap(e => [e.a, e.b]));
  const placed = (id: string) => id in mapLayouts.wide.pos && id in mapLayouts.tall.pos;
  const svg = (name: "wide" | "tall") => {
    const { w, h: height, pos } = mapLayouts[name];
    return `<svg class="atlas-map-edges is-${name}" viewBox="0 0 ${w} ${height}" aria-hidden="true">${edges.filter(e => placed(e.a) && placed(e.b)).map(e =>
      `<line class="${e.past ? "is-past" : ""}" data-a="${esc(e.a)}" data-b="${esc(e.b)}" x1="${pos[e.a][0].toFixed(1)}" y1="${pos[e.a][1].toFixed(1)}" x2="${pos[e.b][0].toFixed(1)}" y2="${pos[e.b][1].toFixed(1)}"/>`).join("")}</svg>`;
  };
  const place = (id: string, i: number) => {
    const wide = mapLayouts.wide, tall = mapLayouts.tall;
    return `--x:${(wide.pos[id][0] / wide.w * 100).toFixed(2)}%;--y:${(wide.pos[id][1] / wide.h * 100).toFixed(2)}%;--tx:${(tall.pos[id][0] / tall.w * 100).toFixed(2)}%;--ty:${(tall.pos[id][1] / tall.h * 100).toFixed(2)}%;--i:${i}`;
  };
  const companyNodes = companies.filter(c => placed(c.id)).map((c, i) =>
    `<a class="map-node map-company ${c.id === "openai" ? "is-core" : ""} ${linked.has(c.id) ? "" : "is-unlinked"}" href="#/company/${esc(c.id)}" data-id="${esc(c.id)}" data-caption="${esc(`${c.name} · ${c.tagline}`)}" style="${place(c.id, i)}"><span class="map-mark">${h.brand(c.id)}</span><span class="map-label">${esc(c.id === "openai" ? c.name : shortName[c.id] || c.name)}</span></a>`);
  const personNodes = people.filter(p => placed(p.id)).map((p, i) =>
    `<a class="map-node map-person" href="#/person/${esc(p.id)}" data-id="${esc(p.id)}" data-caption="${esc(`${p.name} · ${p.role}`)}" style="${place(p.id, companies.length + i)}">${h.face(p.id)}<span class="map-label">${esc(p.name)}</span></a>`);
  return `<div class="atlas-map" data-atlas-map><div class="atlas-map-stage">${svg("wide")}${svg("tall")}${companyNodes.join("")}${personNodes.join("")}</div><div class="atlas-map-foot"><p class="atlas-map-caption" data-map-caption>${companies.length} 家公司 · ${people.length} 位人物 · ${relationships.length} 条有来源的关系</p><p class="atlas-map-legend"><span><i></i>资料所载的任职与合作</span><span><i class="is-past"></i>历史任职</span></p></div></div>`;
}

export function bindMap(root: ParentNode) {
  const map = root.querySelector<HTMLElement>("[data-atlas-map]");
  const caption = map?.querySelector<HTMLElement>("[data-map-caption]");
  if (!map || !caption) return;
  const idle = caption.textContent || "";
  const nodes = [...map.querySelectorAll<HTMLElement>(".map-node")];
  const lines = [...map.querySelectorAll<SVGLineElement>("line")];
  const activate = (node?: HTMLElement) => {
    const id = node?.dataset.id || "";
    const near = new Set([id]);
    for (const line of lines) {
      const on = !!id && (line.dataset.a === id || line.dataset.b === id);
      line.classList.toggle("is-on", on);
      if (on) { near.add(line.dataset.a!); near.add(line.dataset.b!); }
    }
    for (const n of nodes) n.classList.toggle("is-on", !!id && near.has(n.dataset.id!));
    map.classList.toggle("is-focused", !!id);
    caption.textContent = node?.dataset.caption || idle;
  };
  for (const node of nodes) {
    node.addEventListener("pointerenter", () => activate(node));
    node.addEventListener("focus", () => activate(node));
    node.addEventListener("pointerleave", () => activate());
    node.addEventListener("blur", () => activate());
  }
}
