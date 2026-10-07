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
  type RelationshipStatus,
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
test("all 32 relationships retain their explicitly curated evidence statuses", () => {
  const expected: Record<RelationshipStatus, string[]> = {
    current: [
      "sam-openai-role",
      "sam-openai-board",
      "tibo-openai-role",
      "dario-anthropic-role",
      "demis-deepmind-role",
    ],
    historical: [
      "greg-openai-board",
      "fidji-openai-applications-history",
      "fidji-openai-board-history",
      "brad-openai-role-history",
      "paul-openai-research-history",
      "ilya-openai-role",
      "ilya-openai-board",
      "mira-openai-role",
      "dario-openai-role",
    ],
    snapshot: [
      "greg-openai-role",
      "tibo-codex-role",
      "jakub-openai-role",
      "fidji-openai-adviser",
      "bret-foundation-chair",
      "bret-group-chair",
      "paul-foundation-board",
      "paul-group-observer",
      "ilya-ssi-role",
      "mira-tml-role",
      "microsoft-openai-investment",
      "microsoft-openai-product",
      "foundation-controls-group",
    ],
    event: [
      "openai-developed-codex",
      "openai-developed-chatgpt",
      "openai-developed-gpt4",
      "openai-developed-api",
    ],
    navigation: ["openai-foundation-navigation"],
  };
  const expectedCounts: Record<RelationshipStatus, number> = {
    current: 5,
    historical: 9,
    snapshot: 13,
    event: 4,
    navigation: 1,
  };
  assert.equal(relationships.length, 32);
  assert.equal(new Set(Object.values(expected).flat()).size, 32);
  for (const status of Object.keys(expected) as RelationshipStatus[]) {
    const actual = relationships.filter((r) => r.status === status);
    assert.equal(actual.length, expectedCounts[status], status);
    assert.deepEqual(actual.map((r) => r.id).sort(), expected[status].toSorted(), status);
  }
});
test("dated snapshots are not classified as ended relationships from period wording", () => {
  const get = (id: string) => {
    const relationship = relationships.find((r) => r.id === id);
    assert.ok(relationship, id);
    return relationship;
  };
  // Both periods say “snapshot”; only the former OpenAI role is historical.
  const formerRole = get("mira-openai-role");
  const partnership = get("microsoft-openai-product");
  assert.match(formerRole.period, /快照/);
  assert.match(partnership.period, /快照/);
  assert.equal(formerRole.status, "historical");
  assert.equal(partnership.status, "snapshot");
  // A dated appointment is evidence of a role, not evidence that it ended.
  assert.equal(get("paul-foundation-board").status, "snapshot");
  assert.equal(get("jakub-openai-role").status, "snapshot");
  assert.equal(get("ilya-openai-role").status, "historical");
});
test("release events remain distinct from ongoing product partnerships", () => {
  const releases = relationships.filter((r) => r.status === "event");
  assert.equal(releases.length, 4);
  for (const release of releases) {
    assert.equal(release.type, "product", release.id);
    assert.equal(release.from, "openai", release.id);
    assert.ok(additionalEntities.some((e) => e.id === release.to && e.type === "product"), release.id);
    assert.ok(!release.navigationOnly, release.id);
  }
  assert.equal(relationships.find((r) => r.id === "microsoft-openai-product")?.status, "snapshot");
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
  assert.equal(nav.length, 1);
  relationships.forEach((r) =>
    assert.equal(r.status === "navigation", r.navigationOnly === true, r.id),
  );
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
