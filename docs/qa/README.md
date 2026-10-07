# Default-surface decluttering QA — 2026-10-07

## Before and after

Two quieter concepts were delivered before implementation; see `docs/design/AI-Atlas-Concept-Quiet-Home.png` and `AI-Atlas-Concept-Quiet-Relationships.png`. The implementation notes are in `docs/design/declutter-guide.md`.

The previous committed screenshots are `declutter-before-home-desktop.png` and `declutter-before-relationships-desktop.png`. Current actual browser captures use the original filenames. These screenshots and the concepts are distinct artifacts.

Using the same main-surface text method and exact Tibo-selection route at 1440px:

- Homepage default text: 779 → 168 non-whitespace characters (about 78% less)
- Relationship default text: 762 → 217 characters (about 72% less)
- Relationship visible main controls: 36 → 18

Header/footer are excluded. Closed disclosure descendants are excluded from viewport/control counts; the old page had no disclosures. The complete measurements are in `density-comparison.json`. This verifies reduced default information, not subjective beauty.

## What is hidden by default

Settings, exact relationship dates/statuses/directions, individual evidence records, source cards, the graph explanation and person timeline remain accessible through native disclosures. Homepage prose lives in the linked dossiers; it was removed from repetitive preview cards. Historical role qualifiers stay visible where needed. Person-root company/product captions describe relationships rather than assigning a person's job title to an institution.

## Final verification

- Strict TypeScript and production Vite build
- 22 unchanged data/graph tests; the factual dataset and original verification dates are unchanged
- 33 E2E checks, including all 32 facts' dates, status and source access on demand; see `test-results.json`
- Native disclosure open/close, filter persistence, reset, repeated clicks, visible focus restoration, source Escape, root transitions and browser Back/Forward
- Seven production routes, Tibo search, and 390/320px mobile journeys; see `production-results.json`
- 1440/1024/768/390/320px overflow checks
- Fifteen closed-state graph layouts across those widths and three roots: no node-node or node-hub overlap (`geometry-results.json`)
- Actual desktop and phone home/relationship/person-state pixels checked for hierarchy, wrapping, clipping, contrast and the visibility of evidence/settings entry points
- `git diff --check`; no browser runtime errors in tested journeys

## Limits

The content remains a static, date-bounded selection. Other companies are limited previews. Five portraits are licensed photos; others use text identifiers. These are Chromium checks, not a formal accessibility audit or complete browser matrix. No public deployment or remote CI is claimed.
