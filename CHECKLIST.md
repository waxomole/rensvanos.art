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

## 6. What can be done in the meantime (no waiting required)

- [x] Site structure, liquid-glass styling, Dutch copy drafts — **done in this PR**
- [x] Lightbox detail view on gallery cards (click to enlarge, arrow-key navigation, per-work enquiry mail link) — **built**
- [x] English version + NL/EN language switch (`en/index.html`) — **built**
- [x] Instagram feed section — embed mechanism **built**; goes live once post URLs are added to `INSTAGRAM_POSTS` in `js/artwork.js`
- [x] Shop-style per-work detail (title, year, availability, "enquire" mail link) — **built into the lightbox**
- [x] Open Graph/social preview image (`og-image.png`) — **built**; replace with a real artwork version once scans exist
- [x] SEO polish — sitemap, robots.txt, canonical/hreflang, JSON-LD, apple-touch-icon — **built**
- [ ] Favicon refinement once a monogram exists (temporary serif "R" icon in place)
