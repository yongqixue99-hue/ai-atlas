import test from "node:test";
import assert from "node:assert/strict";
import { companies, people, relationships } from "../src/data.ts";
import { mapEdges, mapLayouts } from "../src/map.ts";

const family = new Set(["openai", "openai-foundation", "openai-group-pbc"]);
const sameNode = (id: string, node: string) => id === node || (node === "openai" && family.has(id));

test("every company and person has a place in both map layouts", () => {
  for (const { id } of [...companies, ...people]) {
    for (const name of ["wide", "tall"] as const) {
      const layout = mapLayouts[name];
      const point = layout.pos[id];
      assert.ok(point, `${id} is missing from the ${name} layout`);
      assert.ok(point[0] > 0 && point[0] < layout.w && point[1] > 0 && point[1] < layout.h, `${id} sits outside the ${name} layout`);
    }
  }
});

test("map lines come only from sourced records and keep their time status", () => {
  const edges = mapEdges();
  assert.ok(edges.length > 0);
  for (const edge of edges) {
    const records = relationships.filter(r => !r.navigationOnly &&
      ((sameNode(r.from, edge.a) && sameNode(r.to, edge.b)) || (sameNode(r.from, edge.b) && sameNode(r.to, edge.a))));
    assert.ok(records.length, `${edge.a} – ${edge.b} has no record`);
    assert.ok(records.every(r => r.sourceIds.length > 0), `${edge.a} – ${edge.b} has an unsourced record`);
    assert.equal(edge.past, records.every(r => r.status === "historical"), `${edge.a} – ${edge.b} status`);
  }
});

test("alumni are drawn as past at OpenAI and present at their own company", () => {
  const edges = mapEdges();
  const find = (a: string, b: string) => edges.find(e => [e.a, e.b].includes(a) && [e.a, e.b].includes(b));
  for (const [person, company] of [["ilya-sutskever", "ssi"], ["mira-murati", "thinking-machines"], ["dario-amodei", "anthropic"]]) {
    assert.equal(find(person, "openai")?.past, true);
    assert.equal(find(person, company)?.past, false);
  }
});
