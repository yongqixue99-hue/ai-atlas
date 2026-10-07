import test from "node:test";
import assert from "node:assert/strict";
import { relationships } from "../src/data.ts";
import { graphState, canonicalGraphParams, directRelations, otherEndpoint, founderIdentity, graphHref } from "../src/graph.ts";
const state = (query = "", size = 6) => graphState("openai", new URLSearchParams(query), size);

test("OpenAI defaults to five deduplicated recent employment neighbors", () => {
  const s = state();
  assert.equal(s.filter, "employment"); assert.equal(s.status, "recent");
  assert.deepEqual(s.neighbors.map(n => n.id), ["sam-altman", "greg-brockman", "thibault-sottiaux", "jakub-pachocki", "fidji-simo"]);
  assert.equal(s.recordCount, 5);
});
test("geometry is strictly one-hop; family dossiers do not leak Foundation or Group facts", () => {
  for (const root of ["openai", "openai-foundation", "openai-group-pbc", "paul-christiano", "thibault-sottiaux", "codex"]) {
    const s = state(`root=${root}&filter=all&status=all`);
    assert.ok(s.neighbors.every(n => n.records.every(r => [r.from, r.to].includes(root) && n.id === otherEndpoint(r, root))));
  }
  assert.ok(!directRelations("openai").some(r => r.id === "paul-foundation-board" || r.id === "foundation-controls-group"));
});
test("Fidji is one node with all three separately selectable factual records", () => {
  const s = state("filter=all&status=all&relation=fidji-openai-board-history");
  const fidji = s.neighbors.filter(n => n.id === "fidji-simo");
  assert.equal(fidji.length, 1); assert.equal(fidji[0].records.length, 3);
  assert.equal(s.selected?.id, "fidji-openai-board-history");
  assert.ok(s.visible.some(n => n.id === "fidji-simo"));
});
test("legacy dossier relations infer their institutional root, preserving exact ends", () => {
  for (const [id, root, from, to] of [
    ["paul-foundation-board", "openai-foundation", "paul-christiano", "openai-foundation"],
    ["paul-group-observer", "openai-group-pbc", "paul-christiano", "openai-group-pbc"],
    ["foundation-controls-group", "openai-foundation", "openai-foundation", "openai-group-pbc"],
  ]) {
    const s = state(`relation=${id}`);
    assert.equal(s.root, root); assert.equal(s.selected?.from, from); assert.equal(s.selected?.to, to);
  }
  assert.notEqual(state("relation=ilya-ssi-role").selected?.id, "ilya-ssi-role");
  assert.equal(state("root=openai&relation=paul-group-observer").root, "openai");
});
test("all 32 facts remain reachable from actual roots with full periods and sources", () => {
  assert.equal(relationships.length, 32);
  for (const record of relationships) {
    const s = state(`root=${record.from}&filter=all&status=all&relation=${record.id}`);
    assert.equal(s.selected, record);
    assert.ok(s.selected.period); assert.ok(s.selected.sourceIds.length);
    assert.ok(s.visible.some(n => n.id === record.to));
  }
});
test("person roots expose Tibo to Codex, Ilya to SSI and Paul’s different institutions", () => {
  assert.ok(state("root=thibault-sottiaux&filter=all").neighbors.some(n => n.id === "codex"));
  assert.ok(state("root=ilya-sutskever&filter=all").neighbors.some(n => n.id === "ssi"));
  const paul = state("root=paul-christiano&filter=all");
  assert.ok(paul.neighbors.some(n => n.id === "openai-foundation"));
  assert.ok(paul.neighbors.some(n => n.id === "openai-group-pbc"));
  assert.match(graphHref("thibault-sottiaux"), /^#\/explore\?root=thibault-sottiaux&filter=all/);
});
test("history is distinct from snapshots and product events remain reachable", () => {
  const history = state("filter=employment&status=historical");
  assert.ok(history.neighbors.every(n => n.records.every(r => r.status === "historical")));
  assert.ok(!history.neighbors.some(n => n.id === "greg-brockman"));
  const product = state("filter=product");
  assert.equal(product.status, "all");
  assert.equal(product.neighbors.flatMap(n => n.records).filter(r => r.status === "event").length, 4);
  const empty = state("filter=product&status=historical");
  assert.equal(empty.recordCount, 0); assert.equal(empty.relation, ""); assert.equal(empty.pageCount, 1);
});
test("pagination clamps and selected records always determine a visible page at 6 and 4 nodes", () => {
  for (const size of [6, 4]) {
    const s = state("filter=all&status=all&page=999", size);
    assert.equal(s.page, s.pageCount); assert.ok(s.visible.length <= size);
    assert.ok(s.visible.some(n => n.id === s.target));
    const selected = state("filter=all&status=all&relation=openai-developed-api&page=1", size);
    assert.ok(selected.page > 1); assert.ok(selected.visible.some(n => n.id === "openai-api"));
    assert.equal(state("filter=all&status=all&page=bad", size).page, 1);
  }
});
test("URL canonicalization is idempotent and invalid state normalizes without invented roots", () => {
  const input = new URLSearchParams("root=unknown&filter=__proto__&status=nope&relation=bad&page=-2&view=nope&from=bad");
  const canonical = canonicalGraphParams(input, graphState("openai", input));
  assert.equal(canonical.get("root"), "openai"); assert.equal(canonical.get("filter"), "employment");
  assert.equal(canonical.get("status"), "recent"); assert.equal(canonical.get("page"), "1");
  assert.equal(canonical.get("view"), "graph"); assert.equal(canonical.has("from"), false);
  assert.equal(canonicalGraphParams(canonical, graphState("openai", canonical)).toString(), canonical.toString());
});
test("founder identity belongs to this root and never invents a separate edge", () => {
  assert.equal(founderIdentity("sam-altman", "openai"), true);
  assert.equal(founderIdentity("mira-murati", "openai"), false);
  assert.equal(founderIdentity("mira-murati", "thinking-machines"), true);
  assert.equal(founderIdentity("sam-altman", "openai-foundation"), false);
});
