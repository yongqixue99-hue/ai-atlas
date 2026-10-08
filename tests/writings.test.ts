import test from "node:test";
import assert from "node:assert/strict";
import { people, sources, datasetDate } from "../src/data.ts";
import { profiles } from "../src/profiles.ts";
import { writings, writingSource, personWritings, featuredWritings, writingSegments } from "../src/writings.ts";

test("authored works have unique primary sources, explicit authorship and safe URLs", () => {
  assert.equal(new Set(writings.map(w => w.sourceId)).size, writings.length);
  for (const w of writings) {
    const s = writingSource(w);
    assert.ok(s, w.sourceId);
    assert.equal(new URL(s.url).protocol, "https:");
    assert.ok(!s.id.startsWith("wiki-"));
    assert.ok(w.title && w.authors && w.summary);
    assert.ok(["individual", "coauthored"].includes(w.authorship));
    assert.ok(s.verified <= datasetDate);
    for (const personId of w.personIds) assert.ok(people.some(p => p.id === personId));
    for (const personId of w.featuredFor) assert.ok(w.personIds.includes(personId));
    assert.equal(new Set(w.mentions).size, w.mentions.length);
    assert.ok(w.mentions.every(Boolean));
  }
});

test("each person has at most three curated reading entries without an empty claim", () => {
  for (const p of people) {
    assert.ok(featuredWritings(p.id).length <= 3, p.id);
    assert.ok(personWritings(p.id).every(w => sources.some(s => s.id === w.sourceId)));
  }
  assert.equal(featuredWritings("brad-lightcap").length, 0);
  assert.equal(featuredWritings("thibault-sottiaux").length, 0);
});

test("inline linking preserves every biography paragraph and respects its source mapping", () => {
  let linked = 0;
  for (const [personId, profile] of Object.entries(profiles)) {
    for (const c of profile.chapters) c.text.forEach((text, i) => {
      const segments = writingSegments(text, personId, c.paragraphSourceIds[i]);
      assert.equal(segments.map(s => s.text).join(""), text);
      for (const segment of segments.filter(s => s.writing)) {
        assert.ok(c.paragraphSourceIds[i].includes(segment.writing!.sourceId));
        linked++;
      }
    });
  }
  assert.ok(linked >= 5);
});

test("exact repeated title matching cannot attribute a work to the wrong person or paragraph", () => {
  const text = "《OpenAI Gym》与《OpenAI Gym》 <script>alert(1)</script>";
  const segments = writingSegments(text, "greg-brockman", ["openai-gym-paper"]);
  assert.equal(segments.filter(s => s.writing).length, 2);
  assert.equal(segments.map(s => s.text).join(""), text);
  assert.equal(writingSegments(text, "sam-altman", ["openai-gym-paper"]).filter(s => s.writing).length, 0);
  assert.equal(writingSegments(text, "greg-brockman", ["openai-founding"]).filter(s => s.writing).length, 0);
  assert.equal(writingSegments("", "greg-brockman", ["openai-gym-paper"]).length, 0);
  assert.equal(writingSegments("OpenAI Gym is a product name", "greg-brockman", ["openai-gym-paper"]).filter(s => s.writing).length, 0);
});

test("coauthored research does not become one person's essay", () => {
  for (const id of ["openai-gym-paper", "seq2seq", "rlhf-human-preferences", "ai-safety-debate-2018"]) {
    const w = writings.find(w => w.sourceId === id)!;
    assert.equal(w.authorship, "coauthored");
    assert.equal(w.kind, "technical");
  }
});
