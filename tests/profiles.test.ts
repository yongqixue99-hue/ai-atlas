import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { people, sources, datasetDate } from "../src/data.ts";
import { profiles } from "../src/profiles.ts";

test("background chapters belong to known people and cite resolvable sources", () => {
  const sourceIds = new Set(sources.map((s) => s.id));
  for (const [id, profile] of Object.entries(profiles)) {
    assert.ok(people.some((p) => p.id === id), id);
    assert.ok(profile.facts.length >= 2, id);
    assert.ok(profile.chapters.length >= 2, id);
    for (const chapter of profile.chapters) {
      assert.ok(chapter.title && chapter.text.length, `${id}: ${chapter.title}`);
      assert.ok(chapter.sourceIds.length, `${id}: ${chapter.title} has no source`);
      for (const sourceId of chapter.sourceIds) assert.ok(sourceIds.has(sourceId), sourceId);
    }
  }
});

const knownSources = new Set(sources.map(s => s.id));
function checkIds(ids: string[] | undefined, label: string) {
  assert.ok(ids?.length, `${label}: missing evidence`);
  assert.equal(new Set(ids).size, ids.length, `${label}: duplicate evidence`);
  for (const id of ids) assert.ok(knownSources.has(id), `${label}: ${id}`);
}

test("all ten existing background dossiers retain an explicit, bounded review date", () => {
  assert.equal(Object.keys(profiles).length, 10);
  for (const [id, profile] of Object.entries(profiles)) {
    assert.match(profile.reviewed, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(profile.reviewed <= datasetDate, id);
    assert.ok(profile.reviewNote.trim().length > 0, id);
  }
});

test("every quick fact has its own resolvable evidence", () => {
  for (const [id, profile] of Object.entries(profiles)) {
    for (const [label, text, ids] of profile.facts) {
      assert.ok(label.trim() && text.trim(), id);
      checkIds(ids, `${id}: ${label}`);
    }
  }
});

test("every biography paragraph has exact source mapping and no unused chapter citations", () => {
  for (const [id, profile] of Object.entries(profiles)) {
    for (const chapter of profile.chapters) {
      assert.equal(chapter.paragraphSourceIds.length, chapter.text.length, `${id}: ${chapter.title}`);
      chapter.paragraphSourceIds.forEach((ids, index) => checkIds(ids, `${id}: ${chapter.title} paragraph ${index + 1}`));
      assert.deepEqual([...new Set(chapter.paragraphSourceIds.flat())].sort(), [...chapter.sourceIds].sort(), `${id}: ${chapter.title}: chapter union`);
    }
  }
});

test("role conflicts remain a separately sourced warning and are not silently erased", () => {
  const note = profiles["demis-hassabis"].roleNote;
  assert.ok(note);
  assert.match(note.text, /2026 年 9 月 16 日/);
  assert.match(note.text, /待确认/);
  checkIds(note.sourceIds, "Demis role update");
});

test("any retained Wikipedia evidence stays explicitly labelled as secondary", () => {
  for (const [id, profile] of Object.entries(profiles)) {
    const ids = [...profile.facts.flatMap(f => f[2]), ...profile.chapters.flatMap(c => c.sourceIds)];
    for (const sourceId of ids.filter(sourceId => sourceId.startsWith("wiki-"))) {
      assert.match(sources.find(s => s.id === sourceId).title, /二手/);
      assert.match(profile.reviewNote, /二手/, id);
    }
  }
});

test("editorial audit covers all 45 original facts and 128 paragraphs exactly once", () => {
  const audit = JSON.parse(fs.readFileSync(new URL("../docs/editorial-audit-2026-10-08.json", import.meta.url), "utf8"));
  assert.equal(audit.baselineCommit, "77ab76bd42e33ce949024a6ca79c64cd2f362e4a");
  const expected = [];
  for (const [id, counts] of Object.entries(audit.baselineCounts) as [string, { facts: number; chapters: number; paragraphsByChapter: number[] }][]) {
    assert.ok(profiles[id]);
    assert.equal(counts.chapters, counts.paragraphsByChapter.length);
    for (let fact = 0; fact < counts.facts; fact++) expected.push(`${id}.facts[${fact}]`);
    counts.paragraphsByChapter.forEach((count, chapter) => {
      for (let paragraph = 0; paragraph < count; paragraph++) expected.push(`${id}.chapters[${chapter}].text[${paragraph}]`);
    });
  }
  assert.equal(audit.entries.filter((e: { kind: string }) => e.kind === "fact").length, 45);
  assert.equal(audit.entries.filter((e: { kind: string }) => e.kind === "paragraph").length, 128);
  assert.deepEqual(audit.entries.map((e: { ref: string }) => e.ref).sort(), expected.sort());
  for (const entry of audit.entries) {
    assert.match(entry.originalSha256, /^[a-f0-9]{64}$/);
    assert.ok(entry.note.trim());
    for (const id of entry.sourceIds || []) assert.ok(knownSources.has(id), id);
  }
});
