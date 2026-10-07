# OpenAI content and navigation QA — 2026-10-07

## Delivered scope

The selected ivory editorial design is preserved. Six sourced people dossiers, a separately dated Foundation board roster, Codex context, per-paragraph evidence, and exact institutional governance endpoints extend the OpenAI dossier. Search supports Tibo aliases. Person and entity links connect the new material.

Graph filters, selections and index filters are URL-backed. Direct links, reload, Back/Forward, invalid parameters and repeated controls were tested. Historical OpenAI associations remain discoverable even when a person's displayed company is elsewhere.

## Final checks passed

- Strict TypeScript and production Vite build
- 9 data-integrity tests, including paragraph evidence and roster links
- 23 Chromium end-to-end checks; see `test-results.json`
- 1440, 1024, 768, 390 and 320px layouts without unintended horizontal overflow
- Source drawer dismissal, keyboard focus, repeated clicks, scroll restoration, alias search and deep-link history
- Independent production `dist` smoke check: people, governance, Tibo, timeline, Tibo search, and 390/320px profile and governance layouts; see `production-results.json`
- No browser runtime errors or failed production asset responses in the tested journeys
- `git diff --check`

## Actual visual inspection

Reviewed final desktop and phone homepage screenshots, relationship explorer, Tibo dossier and governance page. The long graph has a visible desktop scroll cue. Governance facts expose their exact role labels, including historical roles and non-voting observer status. Narrative source buttons have distinct reading space. Names, timelines and source lists remain within phone widths.

The existing 2026-10-03 redesign comparison is retained in `docs/qa-before/`. Core and new screenshots are in this directory. The unchanged companies screenshot remains from that earlier pass; current tests verify the page functionality and layout.

## Boundaries

Chromium coverage is not a complete browser matrix or formal accessibility audit. No remote CI is configured and no public deployment is claimed. Other organizations remain limited previews. This is a static editorial dataset: version date and individual source verification dates differ. Brad's departure is attributed to Reuters because the original X post was inaccessible. Five portraits are licensed photographs; other records use clear typographic identification.
