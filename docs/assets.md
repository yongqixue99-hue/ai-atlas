# Asset attribution — editorial redesign

All real photographs are used for factual editorial identification. There is no endorsement or affiliation. Source files are downloaded unchanged; grayscale, object-fit and positional crop are CSS display treatments only. Credits and original license links are also available on the site's About page.

## Sam Altman
- File: `public/assets/sam-altman.jpg`
- Photographer: Steve Jennings/Getty Images for TechCrunch, 2019-10-03; crop by James Tamim
- Source: https://commons.wikimedia.org/wiki/File:Sam_Altman_CropEdit_James_Tamim.jpg
- License: CC BY 2.0 — https://creativecommons.org/licenses/by/2.0/

## Greg Brockman
- File: `public/assets/greg-brockman.jpg`
- Photographer: Steve Jennings/Getty Images for TechCrunch, 2019-10-03
- Source: https://commons.wikimedia.org/wiki/File:Disrupt_SF_TechCrunch_Disrupt_San_Francisco_2019_-_Day_2_(48838200316)_(cropped).jpg
- Original: https://www.flickr.com/photos/techcrunch/48838200316/
- License: CC BY 2.0 — https://creativecommons.org/licenses/by/2.0/
- Existing source-provided 960×1194 preview, not the earlier video still

## Dario Amodei
- File: `public/assets/dario-amodei.jpg`
- Photographer: Kimberly White/Getty Images for TechCrunch, 2023-09-20
- Source: https://commons.wikimedia.org/wiki/File:Dario_Amodei_at_TechCrunch_Disrupt_2023_01_(cropped).jpg
- Original: https://www.flickr.com/photos/techcrunch/53202070940/
- License: CC BY 2.0 — https://creativecommons.org/licenses/by/2.0/

## Mira Murati
- File: `public/assets/mira-murati.jpg`
- Photographer: SWinxy, 2026-05-04
- Source: https://commons.wikimedia.org/wiki/File:Guests_at_the_2026_Met_Gala_274_(Mira_Murati).jpg
- License: CC BY 4.0 — https://creativecommons.org/licenses/by/4.0/
- Factual event photograph, modest-resolution side profile

## Demis Hassabis
- File: `public/assets/demis-hassabis.jpg`
- Photographer: Christopher Michel, 2025-07-14
- Source: https://commons.wikimedia.org/wiki/File:Demis_Hassabis_in_2025_by_Christopher_Michel.jpg
- License: CC BY-SA 4.0 — https://creativecommons.org/licenses/by-sa/4.0/
- Existing source-provided 960×1439 preview. The photo and any derivative display treatment remain under CC BY-SA 4.0; other code/assets retain their own licenses

Ilya Sutskever deliberately retains typographic identification because the freely licensed candidates checked were poor-quality conference crops. No generated face is substituted.

## Original conceptual editorial imagery
- File: `public/assets/editorial-triptych.png`
- Original AI-generated supporting artwork for this project, 2026-10-03
- Three panels: monochrome dunes, sculptural paper folds, fictional architectural interior
- Not a real company office, factual product screenshot, or factual location
- Company masthead and About page label the conceptual nature

## Brand identification
- `src/assets/openai.svg`, `anthropic.svg`, `meta.svg`: Simple Icons 13.21.0, CC0-1.0
- https://www.npmjs.com/package/simple-icons/v/13.21.0
- `src/assets/deepmind.svg`, `deepseek.svg`, `microsoft.svg`, `xai.svg`: @lobehub/icons-static-svg 1.95.1, MIT
- https://github.com/lobehub/lobe-icons
- Trademark rights remain with the brand owners. Identification only; no endorsement

## Fonts and original graphic primitives
- `public/assets/atlas-serif.woff` and `atlas-serif-bold.woff`: glyph subsets of Noto Serif CJK SC Regular/Bold
- SIL Open Font License 1.1; see `FONT-LICENSE.txt`
- New characters fall back to system CJK fonts
- AI Atlas globe/favicon, graph geometry and interface icons are original SVG/CSS

## Bret Taylor (added 2026-10-08)
- File: `public/assets/bret-taylor.jpg`, 1280×854, 148070 bytes
- Photographer: Katelyn Tucker / Slava Blazer Photography; published by TechCrunch, 2024-10-29
- Source: https://commons.wikimedia.org/wiki/File:TechCrunch_Disrupt_2024_D2_Bret_Taylor-3.jpg
- Original Flickr: https://www.flickr.com/photos/techcrunch/54103926810/
- License: CC BY 2.0 — https://creativecommons.org/licenses/by/2.0/
- Source-provided 1280px preview downloaded unchanged. CSS crop/grayscale only for identity portraits; chapter photograph retains the source framing and color.

## Fidji Simo (added 2026-10-08)
- File: `public/assets/fidji-simo.jpg`, 960×1350, 177257 bytes
- Photographer: Loïc Le Meur, 2016-02-29; source crop by Nouvelles Odes, 2025-08-17
- Source: https://commons.wikimedia.org/wiki/File:Fidji_Simo_(cropped).jpg
- Original Flickr: https://www.flickr.com/photos/loiclemeur/24784222814/
- License: CC BY 2.0 — https://creativecommons.org/licenses/by/2.0/
- Source-provided 960px preview downloaded unchanged; the site's CSS is the only additional crop/grayscale treatment.

## Source-backed biography graphics (added 2026-10-08)
- Eight original SVG explanatory figures are rendered from `src/illustrations.ts`.
- Sam: selected career chronology; Greg: Gym interaction; Ilya: 2014 Seq2Seq; Jakub: Rapid training; Paul: human-preference learning; Mira: Tinker division of work; Dario: Constitutional AI; Demis: AlphaFold evaluation and open database chronology.
- Each figure has its own caption, accessible description and source IDs. All diagram layouts are original, not copied paper illustrations or generated historical scenes.
- Desktop and narrow-column SVG layouts share the same data; only the visible one is exposed to assistive technology. The SVG uses the site's light/dark palette.
- No new unlicensed company/event image, AI-generated face, or QA screenshot is included in the public assets.
- Ilya's available TAU photo remains below the portrait specification; no substitute is used. Other missing portraits remain typographic rather than guessing license or identity.
