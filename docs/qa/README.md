# Image-guided relationship redesign QA — 2026-10-07

## Design-first delivery

Three generated design references were inspected and delivered before major implementation. They are preserved in `docs/design/`, alongside the component, responsive and evidence-state implementation guide. Actual screenshots in this directory are browser captures, not generated mockups.

## What changed

- Company-first homepage with a balanced company collage, edition strip, Sam/Tibo profile entries and illustrated topic links
- Exact one-hop topology: only actual incident endpoints are drawn; family-wide dossier aggregation no longer determines graph geometry
- One node per entity, with multiple factual records selected independently in the evidence panel
- Bounded desktop/phone pages of six/four neighbors, list view and explicit selected path
- Foundation/Group root switches; person/product recentering; full periods, typed evidence states and direct source cards
- Sourced person milestones below the selected-state view
- URL-backed root, filter, status, record, page and view; legacy institutional links, reload and Back/Forward supported

## Final checks

- Strict TypeScript, production Vite build, `git diff --check`
- 22 data and graph tests, including all 32 facts remaining reachable, exact institutional endpoints, five recent OpenAI people, deduplication, founder organization scope, and snapshot/history separation
- 30 Chromium E2E checks; `test-results.json`
- Independent production bundle smoke at seven routes, alias search and mobile widths 390/320; `production-results.json`
- 1440, 1024, 768, 390 and 320px layout checks without unintended horizontal overflow
- Fifteen graph layouts across those widths and three roots checked for node-node and node-hub overlap; none found (`geometry-results.json`)
- All factual content and source verification dates compared against the preceding version: unchanged. Only explicit relationship-status metadata was added
- No browser runtime errors or failed production responses in the tested journeys

## Visual inspection

Inspected actual desktop and phone homepage, OpenAI relationship view and Tibo-centered state against the three reference images. An independent visual review found no blocking defect. Minor mobile title wrapping and metadata-label wrapping were corrected, then the final checks and screenshots rerun. The primary action is verified white on dark green. Company graph mastheads are compact; phones show at most four nodes before the evidence panel. Generated architecture decoration is removed on the compact phone graph header.

`relationships-desktop.png` and `relationships-mobile.png` show the Tibo selection inside OpenAI; `person-state-desktop.png` and `person-state-mobile.png` show Tibo centered with the Codex record selected. The older `tibo-desktop.png` remains the full prose profile view. Original pre-redesign images remain in `docs/qa-before/`.

## Boundaries

Chromium checks are not a complete browser matrix or formal accessibility audit. No remote CI is configured and no public deployment is claimed. Non-OpenAI organizations remain limited previews. Data is static and date-bounded; recent records are not promised real-time staffing. Five portraits are licensed photos; other identities use text. Brad's departure remains explicitly attributed to Reuters because the original X post was inaccessible.
