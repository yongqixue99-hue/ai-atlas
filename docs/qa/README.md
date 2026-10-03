# Editorial redesign QA — 2026-10-03

## Visual review

Actual screenshots were compared against the prior delivered implementation and the approved company-first editorial and relationship-explorer references. Review was performed on rendered pixels, not just source or successful compilation.

Changes include:
- Stronger Chinese editorial serif headline, neutral readable body text and restrained green accents
- Photographic conceptual collage with a clear OpenAI focal card and contextual person entry
- Recognizable company marks, denser identity-first company entries
- Composed head-and-shoulders portraits, accompanying readable profile descriptions
- True curved relationship topology, only selected nodes outlined, duplicate floating edge labels removed
- Shorter company masthead, larger selected-person image and clear evidence access
- Mobile layout rebuilt for the collage, portrait cards and graph; return-to-graph affordance
- Improved real photos with license attribution; fictional office concept explicitly identified

Prior screenshots are in `docs/qa-before/`. Current screenshots are in this directory.

## Checks passed

- Strict TypeScript
- 7 data-integrity tests (unchanged factual dataset)
- Production Vite build
- 16 Chromium end-to-end checks; see `test-results.json`
- 1440, 1024, 768, 390 and 320px layouts, no unintended horizontal overflow
- Search, source drawers, repeated selections, keyboard focus, modal dismissal, Back/Forward, topic URL state
- Every relationship type, long-graph scroll preservation and mobile return to graph
- No page-level runtime errors in tested journeys

## Boundaries

Chromium verification is not an exhaustive browser matrix or a formal accessibility audit. No public deployment or remote CI run is claimed. The dataset remains a dated editorial selection; most non-OpenAI organizations are concise previews. Ilya has typographic identification because suitable freely licensed portrait quality was insufficient. Mira's image is a real side-profile event photo.
