# Checklist — everything needed to finish rensvanos.art

Tick items off as they arrive. Everything marked **(blocker)** literally blocks a feature; the rest improve the site but placeholders already stand in for them.

## 1. Artwork (the heart of the site)

- [ ] **High-resolution images of 8–12 best works (blocker)** — scans or straight-on photos:
  - minimum ~2400 px on the long edge (300 dpi ideal), even light, no glare, straight angles
  - cropped to the paper edge, consistent color, JPG or PNG
  - upload straight into `art/` in this repo (or share a Drive/Dropbox link and the files get committed)
- [ ] **Title, year and category per work** — e.g. "Grachtenpanden, 2025 — Architectuur / Woerden / Fantasie" (used for `js/artwork.js`)
- [ ] **Which works are for sale** — print only, original only, both, or not for sale
- [ ] **Hero pick** — the single strongest work for the top of the page (wide-ish format works best)
- [ ] **Featured-piece story (blocker for the "Uitgelicht" section)** — 3–6 sentences about one signature work: what it depicts, hours spent, techniques, the capriccio idea behind it
- [ ] Optional: work-in-progress shots / close-ups for texture and storytelling
- [ ] Optional: a short video or timelapse of the drawing process (great for social embedding later)

## 2. Story & copy

- [ ] **About-me text (blocker for a genuine story)** — current text is a draft. Real substance needed:
  - how the ink habit started, first drawing, defining moment
  - daily practice, favourite pens/paper, hours per typical work
  - Woerden roots: specific places, buildings or views that keep coming back
  - the architect day-job (faro) and how it feeds the drawings
  - what "phantastical places" mean personally
- [ ] **Personal quote** — one honest sentence for the big quote panel (draft currently stands in)
- [ ] **Commission terms** — price indication or "from €…", process (intake → sketch → ink), lead time, what's included
- [ ] **Print details** — available sizes, paper type, whether framed, shipping (NL/EU/world), returns
- [ ] **Contact preference** — confirm `prints@rensvanos.art` is the public address (vs. the Gmail on Instagram)

## 3. Portrait & atmosphere

- [ ] **Portrait photo of the artist** (replaces the "Foto volgt" placeholder in Over mij) — natural light, ideally at the drawing table
- [ ] Optional: studio/workspace photo for the about section background or gallery texture

## 4. Branding

- [ ] **Logo or monogram** (if one exists) — otherwise the current "Rens van Os" wordmark stays
- [ ] Optional: preferred accent colour / paper tone if the current warm-ivory palette should shift
- [ ] Optional: signature scan to use as a decorative element

## 5. Technical & domain

- [ ] **Create the `prints@rensvanos.art` alias in Hostinger** and forward it to the real inbox
- [ ] **Merge this PR**, then enable GitHub Pages (Settings → Pages → deploy from `main`)
- [ ] **Hostinger DNS** — four `A` records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`, plus `CNAME` `www` → `waxomole.github.io`
- [ ] Enable **Enforce HTTPS** once GitHub issues the certificate
- [ ] Optional: privacy/cookie statement if analytics get added

## 6. Security (hardened in this PR)

- [x] `robots.txt` blocks known AI/scraping bots (GPTBot, ClaudeBot, CCBot, Bytespider, PerplexityBot, Meta, e.a.) while search engines stay welcome
- [x] `noai, noimageai` robots meta on both language versions
- [x] Email address obfuscated — assembled by JavaScript in the browser, invisible to source-scraping harvesters
- [x] `.well-known/security.txt` added
- [ ] Optional, stronger: proxy the domain through Cloudflare (free tier) with Bot Fight Mode once DNS is on Hostinger — GitHub Pages itself cannot set security headers or firewall rules

## 6. What can be done in the meantime (no waiting required)

- [x] Site structure, liquid-glass styling, Dutch copy drafts — **done in this PR**
- [x] Lightbox detail view on gallery cards (click to enlarge, arrow-key navigation, per-work enquiry mail link) — **built**
- [x] English version + NL/EN language switch (`en/index.html`) — **built**
- [x] Instagram feed section — **live** with two embedded posts; add more URLs to `INSTAGRAM_POSTS` in `js/artwork.js`. Note: embeds always show the first slide of a carousel; specific carousel images need their own files
- [x] Shop-style per-work detail (title, year, availability, "enquire" mail link) — **built into the lightbox**
- [x] On-site enquiry form on the commissions pages (NL + EN) — **built**; composes a prefilled email to the obfuscated print address via the visitor's own mail app, no backend needed. If you ever want true server-side delivery (Formspree/Web3Forms), swap the submit handler
- [x] Open Graph/social preview image (`og-image.png`) — **built**; replace with a real artwork version once scans exist
- [x] SEO polish — sitemap, robots.txt, canonical/hreflang, JSON-LD, apple-touch-icon — **built**
- [ ] Favicon refinement once a monogram exists (temporary serif "R" icon in place)

## 7. React rewrite (PR: vibe/react-rewrite-36781f)

- [x] Complete rewrite to React 19 + TypeScript + Vite 8 (multi-page, real URLs preserved)
- [x] Two-tone palettes built in — **pick one**: `ink` (warm cream + sepia-black, current default) or `delft` (porcelain + Delft-blue slate); switch via `data-palette` on `<html>`
- [x] Calligraphy headings (Great Vibes) for all titles/headers + signature
- [x] Fonts self-hosted (fontsource) — stricter CSP, no Google Fonts dependency
- [x] GitHub Actions deploy workflow added — **action needed: Settings → Pages → Source → "GitHub Actions" after merge**
- [x] Definitive palette chosen: **Delfts & Mist** (`delft`); `ink` remains available as a one-attribute switch
- [ ] Calligraphy font review — alternatives (e.g. Alex Brush, Parisienne) are a one-line swap

## 8. Modern SPA routing & finishing touches (PR: vibe/modern-routing-36781f)

- [x] Clean URLs — react-router SPA: `/werk`, `/en/work`, … instead of `.html` pages
- [x] GitHub Pages 404.html fallback (postbuild script) so deep links still resolve
- [x] Legacy `.html` URLs redirect client-side
- [x] Per-route meta (title, description, canonical, OG) via `usePageMeta`
- [x] Custom 404 page — "Deze pagina is nog niet uitgetekend" with half-finished sketch (NL/EN)
- [x] Pen-nib favicon (data-URI SVG, delft ink on porcelain)
- [x] Ink trail cursor — canvas, fades like drying ink; disabled for touch + reduced motion
- [x] Paper grain texture over the aurora background (SVG turbulence, multiply blend)
- [x] Delfts & Mist glass contrast re-tuned (whiter panels, stronger borders/shadows, deeper paper)
- [ ] Verify the delft palette contrast on your screen after merge — iterate if still too subtle
- [ ] Thorough ink-trail testing on your devices (mouse + trackpad; it stays off on touch)

## 9. Performance & mobile polish (PR: vibe/perf-mobile-36781f)

- [x] Performance: aurora blobs are pure gradients now (no giant blur filters), backdrop-blur radii halved, ink-trail fade loop stops when idle, unused font weight dropped, hero image prioritised
- [x] Section gaps tightened sitewide (quote/featured/gallery/insta/shop/about)
- [x] Footer slimmed to a compact signature panel
- [x] Commission form fields can no longer overflow their panel (min-width:0 + full-width fields)
- [x] Ink trail now follows touch too (stops gracefully when the browser claims the gesture for scrolling)
- [x] "EN" underline removed in the utility pill
- [x] Light/dark mode toggle (sun/moon) — light = Inkt & Perkament, dark = new Nacht palette; persisted, follows system preference on first visit, no flash on load (CSP-hashed bootstrap script)
- [x] Delfts & Mist retired (didn't fit the style) — warm ink palette is light mode again
- [x] Work page: drawings framed with `object-fit: contain` (never cropped), captions centered, glass panels carry the paper grain
- [x] Mobile: 44px burger target, taller dropdown links, tap-highlight removed, svh hero heights
- [ ] Check the dark palette on your devices — easy to re-tune in tokens.css

## 10. Small-screen collapse, glow & cursor aurora (PR: vibe/glow-mobile-36781f)

- [x] Below 560px both top pills collapse into ONE round pen-nib button; its menu holds page links + EN + dark mode + Instagram (no more oval pill / clipped brand)
- [x] Button glow (lamplight gold in light mode, moonlit blue in dark) on all glass/ink buttons
- [x] Cursor aurora glow follows the pointer on every device (Cloudflare-style light-up); on touch it replaces the too-faint ink stroke; scales up on tap; rAF stops when idle
- [x] Commission form: fields now 16px (no iOS focus-zoom), native iOS input chrome removed, form panel edges aligned with the shop section
- [ ] Verify the form right-edge on your iPhone 13 Pro after merge — if a gap remains, send a screenshot and I'll pinpoint it

## 11. Pill polish round (PR: vibe/pill-polish-36781f)

- [x] Cursor orb recoloured — Delft blue in light mode (no more orange), moonlit blue in dark; lazier, more flowing trailing motion
- [x] Light-mode button glow switched from gold to the same cool blue (matches the dark 'Nacht' glow you liked)
- [x] Two pills separated again on iPhone 13 Pro-size screens (single-pill collapse now only below 380px)
- [x] Scrolling down: the pills merge into one round pen-nib button, which then fades out slowly; scrolling up brings both pills back, separated
- [x] Nav pill anchored left on large screens (no longer centred)
- [ ] Verify the merge-then-fade scroll behaviour + blue orb on your devices
