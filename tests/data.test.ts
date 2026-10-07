import test from "node:test";
import assert from "node:assert/strict";
import {
  companies,
  people,
  additionalEntities,
  relationships,
  events,
  sources,
  datasetDate,
  foundationBoard,
} from "../src/data.ts";
const known = new Set(
  [...companies, ...people, ...additionalEntities].map((x) => x.id),
);
const sourceIds = new Set(sources.map((s) => s.id));
test("all entities have unique, stable IDs", () =>
  assert.equal(
    known.size,
    companies.length + people.length + additionalEntities.length,
  ));
test("every factual record and milestone has resolvable sources", () => {
  for (const record of [
    ...companies,
    ...people,
    ...additionalEntities,
    ...relationships,
    ...events,
    ...people.flatMap((p) => p.milestones),
  ]) {
    assert.ok(record.sourceIds.length);
    record.sourceIds.forEach((id) => assert.ok(sourceIds.has(id), id));
  }
});
test("all relationship and event endpoints resolve", () => {
  assert.equal(new Set(relationships.map((r) => r.id)).size, relationships.length);
  assert.equal(new Set(events.map((e) => e.id)).size, events.length);
  relationships.forEach((r) => {
    assert.ok(known.has(r.from), r.from);
    assert.ok(known.has(r.to), r.to);
    assert.ok(r.period);
  });
  events.forEach((e) =>
    e.entityIds.forEach((id) => assert.ok(known.has(id), id)),
  );
});
test("person search aliases do not resolve to different people", () => {
  const aliases = new Map<string, string>();
  for (const person of people) {
    for (const name of [person.name, ...(person.aliases || [])]) {
      const key = name.trim().toLocaleLowerCase();
      assert.ok(key);
      assert.ok(!aliases.has(key) || aliases.get(key) === person.id, name);
      aliases.set(key, person.id);
    }
  }
});
test("governance roster links resolve and retain a separate verification date", () => {
  assert.ok(foundationBoard.verified <= datasetDate);
  assert.ok(foundationBoard.sourceIds.length);
  foundationBoard.sourceIds.forEach((id) => assert.ok(sourceIds.has(id), id));
  assert.equal(new Set(foundationBoard.members.map((m) => m.name)).size, foundationBoard.members.length);
  foundationBoard.members.forEach((member) => {
    if (member.personId) assert.ok(people.some((p) => p.id === member.personId), member.name);
    assert.ok(member.role);
  });
});
test("sources are HTTPS, unique, and date bounded", () => {
  assert.equal(sourceIds.size, sources.length);
  sources.forEach((s) => {
    assert.equal(new URL(s.url).protocol, "https:");
    assert.match(s.verified, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(s.verified <= datasetDate);
    if (s.published) assert.ok(s.published <= datasetDate);
  });
});
test("deep coverage and limited previews remain explicit", () => {
  assert.equal(companies.filter((c) => c.coverage === "dossier").length, 1);
  assert.equal(companies.find((c) => c.id === "openai")?.coverage, "dossier");
  assert.ok(companies.filter((c) => c.coverage === "preview").length >= 5);
});
test("profiles contain readable narratives and dated milestones", () => {
  people.forEach((p) => {
    assert.ok(p.paragraphs.length >= 2, p.name);
    assert.ok(p.milestones.length >= 2, p.name);
    if (p.paragraphSourceIds) {
      assert.equal(p.paragraphSourceIds.length, p.paragraphs.length, p.name);
      p.paragraphSourceIds.forEach((ids) => {
        assert.ok(ids.length, p.name);
        ids.forEach((id) => assert.ok(sourceIds.has(id), id));
      });
    }
    assert.ok(
      companies.some((c) => c.id === p.companyId),
      p.name,
    );
  });
});
test("navigation edge is clearly distinguished from governance control", () => {
  const nav = relationships.filter((r) => r.navigationOnly);
  assert.ok(nav.length);
  nav.forEach((r) => assert.match(r.detail, /导航|不代表/));
  assert.ok(
    relationships.some(
      (r) =>
        r.from === "openai-foundation" &&
        r.to === "openai-group-pbc" &&
        !r.navigationOnly,
    ),
  );
});
