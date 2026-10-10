import test from "node:test";
import assert from "node:assert/strict";
import { companies, people, additionalEntities, events, sources } from "../src/data.ts";
import { profiles } from "../src/profiles.ts";
import { writings } from "../src/writings.ts";
import { searchAtlas, normalizeSearchQuery } from "../src/search.ts";

const personResult = (query: string, id: string) => {
  const result = searchAtlas(query, "person").find(result => result.id === id);
  assert.ok(result, `${id}: missing ${query.slice(0, 70)}`);
  assert.equal(result.name, people.find(person => person.id === id)!.name);
  assert.equal(result.markId, id);
  return result;
};

test("exact identities and aliases lead ahead of incidental company and biography mentions", () => {
  for (const [query, id] of [["Sam Altman", "sam-altman"], ["ChatGPT", "chatgpt"], ["GPT-4", "gpt4"], ["Codex", "codex"], ["Tibo", "thibault-sottiaux"], ["山姆·奥特曼", "sam-altman"]]) {
    const results = searchAtlas(query);
    assert.equal(results[0]?.id, id, query);
    assert.equal(results[0]?.score, 1000, query);
    assert.ok(results.every((result, i) => !i || results[i - 1].score >= result.score));
    assert.equal(results.filter(result => result.id === id).length, 1);
  }
  assert.match(searchAtlas("Tibo")[0].sub, /Tibo/);
  assert.equal(searchAtlas("Sam")[0].id, "sam-altman");
  assert.equal(searchAtlas("Altman")[0].id, "sam-altman");
  assert.equal(searchAtlas("Altman")[0].score, 850);
});

test("literal phrase matching ignores case and whitespace but does not invent fuzzy matches", () => {
  assert.equal(normalizeSearchQuery("  GREEN\n  Dot\t"), "green dot");
  assert.deepEqual(searchAtlas("  sAm\n  ALTman\t"), searchAtlas("Sam Altman"));
  assert.deepEqual(searchAtlas("  GREEN\n  Dot\t"), searchAtlas("Green Dot"));
  const result = searchAtlas("Green Dot")[0];
  assert.equal(result.id, "sam-altman");
  assert.equal(result.href, "#/person/sam-altman?section=chapter-1");
  assert.match(result.sub, /斯坦福与手机地图创业/);
  assert.match(result.sub, /Green Dot/);
  assert.equal(searchAtlas("Grean Dot").length, 0);
  assert.equal(searchAtlas("GPT4").length, 0);
});

test("every complete biography paragraph and its middle and end can find its person", () => {
  let paragraphs = 0;
  for (const [personId, profile] of Object.entries(profiles)) {
    profile.chapters.forEach((chapter, index) => {
      for (const text of chapter.text) {
        const result = personResult(text, personId);
        assert.equal(result.href, `#/person/${personId}?section=chapter-${index + 1}`);
        assert.ok(result.sub.startsWith(`${chapter.title} · `));
        for (const position of [Math.floor(text.length / 2), Math.max(0, text.length - 28)]) {
          personResult(text.slice(position, position + 28), personId);
        }
        paragraphs++;
      }
    });
  }
  assert.ok(paragraphs >= 185);
});

test("all chapter titles, fact values and public-role paragraphs remain searchable", () => {
  for (const person of people) {
    const profile = profiles[person.id];
    profile.chapters.forEach((chapter, index) => {
      assert.equal(personResult(chapter.title, person.id).href, `#/person/${person.id}?section=chapter-${index + 1}`);
    });
    for (const [, value] of profile.facts) {
      assert.equal(personResult(value, person.id).href, `#/person/${person.id}`);
    }
    for (const text of person.paragraphs) {
      assert.equal(personResult(text, person.id).href, `#/person/${person.id}?section=person-roles`);
    }
    if (profile.roleNote) assert.equal(personResult(profile.roleNote.text, person.id).href, `#/person/${person.id}`);
  }
});

test("every writing title and summary routes to its card, cited chapter or exact source row", () => {
  const sourceIds = new Set(sources.map(source => source.id));
  for (const writing of writings) {
    assert.ok(sourceIds.has(writing.sourceId));
    for (const personId of writing.personIds) {
      for (const query of [writing.title, writing.summary]) {
        const result = personResult(query, personId);
        assert.ok(result.sub.includes(writing.title));
        const section = new URLSearchParams(result.href.split("?")[1]).get("section");
        if (writing.featuredFor.includes(personId)) {
          assert.equal(section, `writing-${writing.sourceId}`);
        } else if (section?.startsWith("chapter-")) {
          const chapter = profiles[personId].chapters[Number(section.slice(8)) - 1];
          assert.ok(chapter, result.href);
          assert.ok(chapter.sourceIds.includes(writing.sourceId), `${personId}: ${writing.sourceId}`);
          assert.ok(chapter.text.some((text, i) => text.includes(writing.title) && chapter.paragraphSourceIds[i].includes(writing.sourceId)));
        } else {
          assert.equal(section, `source-${writing.sourceId}`);
          assert.equal(personId, "dario-amodei");
          assert.equal(writing.sourceId, "amplification-2018");
        }
      }
    }
  }
  assert.equal(personResult("OpenAI Gym", "greg-brockman").href, "#/person/greg-brockman?section=chapter-4");
  assert.equal(personResult("The Intelligence Age", "sam-altman").href, "#/person/sam-altman?section=writing-sam-intelligence-age");
});

test("each event title and description has its own valid timeline destination", () => {
  for (const event of events) {
    for (const query of [event.title, event.description]) {
      const result = searchAtlas(query, "event").find(result => result.id === event.id);
      assert.ok(result);
      assert.equal(result.href, `#/timeline?section=event-${event.id}`);
      assert.equal(result.name, event.title);
      assert.equal(result.markId, event.id);
    }
  }
});

test("empty query preserves the curated order, familiar names and existing kind filters", () => {
  const ordered = [...companies, ...people, ...additionalEntities, ...events];
  const results = searchAtlas("");
  assert.deepEqual(results.map(result => result.id), ordered.map(entry => entry.id));
  assert.deepEqual(searchAtlas(" \n\t "), results);
  assert.equal(new Set(results.map(result => result.id)).size, results.length);
  assert.ok(results.every(result => result.score === 0 && result.sub.length <= 105));
  for (const person of people) assert.equal(results.find(result => result.id === person.id)?.sub, person.role);
  assert.deepEqual(searchAtlas("", "company").map(result => result.id), [...companies, ...additionalEntities.filter(entity => entity.type === "organization")].map(entry => entry.id));
  for (const kind of ["person", "product", "organization", "event"]) assert.ok(searchAtlas("", kind).every(result => result.kind === kind));
  assert.ok(searchAtlas("OpenAI", "company").every(result => ["company", "organization"].includes(result.kind)));
});

test("results are deterministic, independent copies and do not concatenate unrelated fields", () => {
  assert.deepEqual(searchAtlas("OpenAI"), searchAtlas("OpenAI"));
  const first = searchAtlas("Sam Altman");
  first[0].name = "changed externally";
  assert.equal(searchAtlas("Sam Altman")[0].name, "Sam Altman");
  assert.equal(searchAtlas("Sam Altman 山姆·奥特曼").length, 0);
  assert.equal(searchAtlas("The Intelligence Age Moore's Law").length, 0);
});

test("HTML and regular-expression syntax is treated literally with no generated markup", () => {
  for (const query of ["<img src=x onerror=alert(1)>", "<script>alert(1)</script>", ".*", "[", "(?=Sam)", "Sam|ChatGPT", "$&", "\\"]) {
    assert.doesNotThrow(() => searchAtlas(query));
    assert.deepEqual(searchAtlas(query), []);
  }
  // Existing punctuation in a real title remains searchable as plain text.
  assert.equal(searchAtlas("#define CTO")[0]?.id, "greg-brockman");
  assert.ok(searchAtlas("OpenAI").every(result => !/<(?:mark|script|img)\b/i.test(result.sub)));
});
