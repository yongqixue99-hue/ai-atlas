import { companies, people, additionalEntities, events } from "./data.ts";
import type { Person } from "./data.ts";
import { profiles } from "./profiles.ts";
import { personWritings } from "./writings.ts";
import type { Writing } from "./writings.ts";

export type SearchKind = "company" | "person" | "product" | "organization" | "event";
export interface SearchResult {
  id: string;
  kind: SearchKind;
  name: string;
  sub: string;
  href: string;
  markId: string;
  score: number;
}

type FieldKind = "name" | "title" | "metadata" | "body";
interface SearchField {
  text: string;
  normalized: string;
  kind: FieldKind;
  href: string;
  context?: string;
  excerpt?: string;
}
interface SearchEntry {
  result: Omit<SearchResult, "score">;
  fields: SearchField[];
}

const compact = (text: string) => text.replace(/\s+/gu, " ").trim();
/** Literal phrase matching only; no HTML, regular expressions or fuzzy aliases. */
export const normalizeSearchQuery = (query: string) => compact(query).toLowerCase();
const sectionHref = (href: string, section: string) => `${href}?section=${encodeURIComponent(section)}`;

function field(text: string, kind: FieldKind, href: string, context?: string, excerpt?: string): SearchField {
  const plain = compact(text);
  return { text: plain, normalized: plain.toLowerCase(), kind, href, context, excerpt };
}

/** Find this author's cited occurrence; never link to a nonexistent reading card. */
function writingHref(person: Person, writing: Writing, href: string): string {
  if (writing.featuredFor.includes(person.id)) return sectionHref(href, `writing-${writing.sourceId}`);
  const chapters = profiles[person.id]?.chapters || [];
  // Prefer the paragraph where the exact original title is linked in the view.
  const hasMention = (text: string) => writing.mentions.some(mention => text.includes(mention)) || text.includes(writing.title);
  const chapterIndex = chapters.findIndex(chapter => chapter.text.some((text, i) =>
    chapter.paragraphSourceIds[i]?.includes(writing.sourceId) && hasMention(text)));
  return sectionHref(href, chapterIndex >= 0 ? `chapter-${chapterIndex + 1}` : `source-${writing.sourceId}`);
}

/** Built once, keeping individual fields so phrases cannot span unrelated paragraphs. */
const index: SearchEntry[] = [
  ...companies.map(company => {
    const href = `#/company/${company.id}`;
    return {
      result: { id: company.id, kind: "company" as const, name: company.name, sub: company.tagline, href, markId: company.id },
      fields: [
        field(company.name, "name", href),
        ...(company.cnName ? [field(company.cnName, "name", href)] : []),
        ...[company.tagline, company.category, ...company.topics, company.location, company.founded]
          .map(text => field(text, "metadata", href, "公司概览")),
        ...company.description.map(text => field(text, "body", href, "公司概览")),
      ],
    };
  }),
  ...people.map(person => {
    const href = `#/person/${person.id}`;
    const profile = profiles[person.id];
    const fields = [
      field(person.name, "name", href),
      field(person.cnName, "name", href, "中文名"),
      ...(person.aliases || []).map(alias => field(alias, "name", href, "常用称呼")),
      field(person.role, "metadata", href, "公开记录中的角色"),
      field(person.summary, "metadata", href, "人物简介"),
      ...(profile?.facts || []).map(([label, text]) => field(`${label}：${text}`, "metadata", href, "人物速览")),
      ...(profile?.roleNote ? [field(profile.roleNote.text, "metadata", href, "职务更新说明")] : []),
      ...person.paragraphs.map(text => field(text, "body", sectionHref(href, "person-roles"), "公开记录中的角色")),
    ];
    for (const [chapterIndex, chapter] of (profile?.chapters || []).entries()) {
      const chapterHref = sectionHref(href, `chapter-${chapterIndex + 1}`);
      fields.push(field(chapter.title, "title", chapterHref, chapter.title, chapter.text[0]));
      fields.push(...chapter.text.map(text => field(text, "body", chapterHref, chapter.title)));
    }
    for (const writing of personWritings(person.id)) {
      const destination = writingHref(person, writing, href);
      fields.push(field(writing.title, "title", destination, writing.title, writing.summary));
      fields.push(...writing.mentions.map(mention => field(mention, "title", destination, writing.title, writing.summary)));
      fields.push(field(writing.summary, "metadata", destination, writing.title));
    }
    return {
      result: { id: person.id, kind: "person" as const, name: person.name, sub: person.role, href, markId: person.id },
      fields,
    };
  }),
  ...additionalEntities.map(entity => {
    const href = `#/entity/${entity.id}`;
    return {
      result: { id: entity.id, kind: entity.type, name: entity.name, sub: entity.summary, href, markId: entity.id },
      fields: [
        field(entity.name, "name", href),
        ...(entity.cnName ? [field(entity.cnName, "name", href, "中文名")] : []),
        field(entity.summary, "metadata", href, entity.type === "product" ? "产品概览" : "组织概览"),
      ],
    };
  }),
  ...events.map(event => {
    const href = sectionHref("#/timeline", `event-${event.id}`);
    return {
      result: { id: event.id, kind: "event" as const, name: event.title, sub: event.date, href, markId: event.id },
      fields: [field(event.title, "title", href), field(event.date, "metadata", href, "事件日期"), field(event.description, "body", href, event.date)],
    };
  }),
];

const isWordCharacter = (character: string | undefined) => Boolean(character && /[\p{L}\p{N}_]/u.test(character));
function scoreField(candidate: SearchField, query: string): number {
  const at = candidate.normalized.indexOf(query);
  if (at < 0) return 0;
  if (candidate.kind === "metadata") return 400;
  if (candidate.kind === "body") return 200;
  // Exact identities and titles always beat partial names, metadata and prose.
  if (candidate.normalized === query) return candidate.kind === "name" ? 1000 : 950;
  const identityBonus = candidate.kind === "name" ? 100 : 0;
  if (at === 0) return 800 + identityBonus;
  let position = at;
  while (position >= 0) {
    if (!isWordCharacter(candidate.normalized[position - 1]) && !isWordCharacter(candidate.normalized[position + query.length])) return 750 + identityBonus;
    position = candidate.normalized.indexOf(query, position + 1);
  }
  return candidate.kind === "name" ? 825 : 700;
}

function excerpt(text: string, query = "", limit = 104): string {
  const plain = compact(text);
  if (plain.length <= limit) return plain;
  const at = query ? plain.toLowerCase().indexOf(query) : -1;
  // Include the entire match where it fits, with useful context on either side.
  const before = Math.min(28, Math.max(0, limit - query.length));
  const start = at < 0 ? 0 : Math.max(0, Math.min(at - before, plain.length - limit));
  return `${start ? "…" : ""}${plain.slice(start, start + limit)}${start + limit < plain.length ? "…" : ""}`;
}

function matchingSub(entry: SearchEntry, match: SearchField, query: string): string {
  if (match.kind === "name") {
    return match.context ? `${match.context} ${match.text} · ${excerpt(entry.result.sub, "", 76)}` : excerpt(entry.result.sub);
  }
  // An event title already appears in the result's familiar-name line.
  if (match.kind === "title" && !match.context) return excerpt(entry.result.sub);
  const detail = excerpt(match.excerpt || match.text, query);
  return match.context ? `${match.context} · ${detail}` : detail;
}

/** One compact result per entity, with the strongest matching section as its destination. */
export function searchAtlas(query: string, kind: string = "all"): SearchResult[] {
  const normalized = normalizeSearchQuery(query);
  const matches: { result: SearchResult; order: number }[] = [];
  index.forEach((entry, order) => {
    if (kind !== "all" && entry.result.kind !== kind && !(kind === "company" && entry.result.kind === "organization")) return;
    if (!normalized) {
      matches.push({ result: { ...entry.result, sub: excerpt(entry.result.sub), score: 0 }, order });
      return;
    }
    let best: SearchField | undefined;
    let score = 0;
    for (const candidate of entry.fields) {
      const candidateScore = scoreField(candidate, normalized);
      if (candidateScore > score) { best = candidate; score = candidateScore; }
    }
    if (best) matches.push({ result: { ...entry.result, sub: matchingSub(entry, best, normalized), href: best.href, score }, order });
  });
  if (normalized) matches.sort((a, b) => b.result.score - a.result.score || a.order - b.order);
  return matches.map(match => match.result);
}
