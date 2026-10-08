import test from "node:test";
import assert from "node:assert/strict";
import { people, sources } from "../src/data.ts";
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
