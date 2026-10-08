import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { profiles } from "../src/profiles.ts";
import { sources } from "../src/data.ts";
import { biographyFigures, personFigures, renderBiographyFigure } from "../src/illustrations.ts";

test("all ten biographies have purposefully placed, sourced illustrations", () => {
  assert.equal(Object.keys(profiles).length, 10);
  assert.equal(new Set(biographyFigures.map(f => f.id)).size, biographyFigures.length);
  const knownSources = new Set(sources.map(source => source.id));
  for (const personId of Object.keys(profiles)) {
    assert.ok(personFigures(personId).length > 0, personId);
  }
  for (const figure of biographyFigures) {
    assert.ok(profiles[figure.personId].chapters.some(chapter => chapter.title === figure.chapterTitle), figure.id);
    assert.ok(figure.title.trim() && figure.caption.trim() && figure.alt.trim(), figure.id);
    assert.ok(figure.sourceIds.length);
    figure.sourceIds.forEach(id => assert.ok(knownSources.has(id), `${figure.id}: ${id}`));
    if (figure.kind !== "photo") {
      assert.ok(figure.steps.length >= 2 && figure.steps.length <= 4);
      for (const step of figure.steps) {
        assert.ok(step.label && step.title && step.lines.length);
        assert.ok(step.sourceIds.length);
        step.sourceIds.forEach(id => assert.ok(figure.sourceIds.includes(id), id));
      }
      const svg = renderBiographyFigure(figure, "/");
      assert.match(svg, /role="img" aria-label="/);
      assert.match(svg, /AI Atlas 原创图解/);
    }
  }
});

test("new photographs retain local source bytes and explicit licenses", () => {
  for (const photo of biographyFigures.filter(f => f.kind === "photo")) {
    assert.ok(photo.width >= 800 && photo.height >= 800);
    assert.ok(photo.credit && /^CC BY(?:-SA)? [24]\.0$/.test(photo.license));
    assert.equal(new URL(photo.sourceUrl).protocol, "https:");
    assert.equal(new URL(photo.licenseUrl).hostname, "creativecommons.org");
    const bytes = fs.readFileSync(new URL(`../public/${photo.file}`, import.meta.url));
    assert.equal(bytes[0], 0xff);
    assert.equal(bytes[1], 0xd8);
    assert.ok(bytes.length <= 300 * 1024);
    const markup = renderBiographyFigure(photo, "/");
    assert.match(markup, /loading="lazy" decoding="async"/);
    assert.match(markup, /width="\d+" height="\d+"/);
    assert.match(markup, /rel="noopener noreferrer"/);
  }
});

test("diagram text and accessible descriptions are safely escaped", () => {
  const diagram = biographyFigures.find(f => f.kind !== "photo")!;
  const markup = renderBiographyFigure({...diagram, title:'<script>x</script>', alt:'" onload="bad', caption:'<img onerror="bad">'}, "/");
  assert.ok(!markup.includes("<script>"));
  assert.ok(!markup.includes('<img onerror='));
  assert.match(markup, /&lt;script&gt;/);
  assert.match(markup, /&quot; onload=&quot;bad/);
});


test("figure evidence is a single inline trigger with printable attribution", () => {
  for (const figure of biographyFigures) {
    const markup = renderBiographyFigure(figure, "/");
    assert.match(markup, /<p>.*<button class="figure-source"/);
    assert.equal((markup.match(/data-figure-source=/g) || []).length, 1);
    assert.ok(markup.includes(`data-figure-source="${figure.id}"`));
    assert.ok(markup.includes(`data-sources="${figure.sourceIds.join(",")}"`));
    assert.match(markup, /aria-haspopup="dialog"/);
    assert.match(markup, /figure-print-credit/);
    assert.ok(!markup.includes("图示依据"));
    assert.ok(!markup.includes('class="text-link source-link"'));
  }
});
