# Verified first-version QA

2026-10-03 · Chromium Headless Shell 140 · local development and production build

## Passed

- Strict TypeScript checking
- 7 data-integrity tests
- Production Vite build
- 15 end-to-end checks (see `test-results.json`)
- Desktop 1440px, mobile 390px and narrow mobile 320px route checks
- Main paths: homepage → company → relation → person → sources
- Search across companies, people, products and events; zero results; escaped input
- Governance vs product vs investment vs historical employment distinctions
- Repeated selection, repeated modal open/close, Escape, focus restore and keyboard focus trap
- Browser Back/Forward, query-driven topic state, invalid route recovery
- No page-level runtime errors in the tested journeys
- Loaded photos and locally bundled serif font; no external font dependency

Screenshots were actually opened and visually inspected. Adjustments included the Chinese serif font, replacing emoji-shaped arrows with SVG, correcting the company logo position, increasing prose sizes, removing mobile graph clipping and improving navigation target sizes.

## Screenshots

- [Homepage, desktop](home-desktop.png)
- [Homepage, mobile](home-mobile.png)
- [Relationships, desktop](relationships-desktop.png)
- [Relationships, mobile](relationships-mobile.png)
- [Person dossier, desktop](person-desktop.png)
- [Evidence drawer, desktop](evidence-desktop.png)

## Verification boundaries

This is Chromium testing, not an exhaustive cross-browser or formal accessibility audit. No public deployment or remote CI run is claimed. Source checks are editorial verification, not a guarantee that externally linked pages never change.
