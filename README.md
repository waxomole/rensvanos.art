# rensvanos.art

Showcase-website voor Rens van Os — lijnkunst van architectuur en fantastische plaatsen.
Gebouwd met **React 19 + TypeScript + Vite 8** als multi-page app: elke pagina is een echt
HTML-bestand (eigen meta, canonical, hreflang), met React-componenten voor alle interactiviteit.

## Ontwikkelen

```bash
npm install
npm run dev        # lokale dev-server
npm run build      # type-check + productiebuild naar dist/
npm run preview    # bekijk de build lokaal
npm run lint       # oxlint
```

## Structuur

```
├── index.html / werk.html / over-mij.html / commissies.html   NL-pagina's (Vite-entries)
├── en/…                                                       EN-tweelingpagina's
├── public/            statische assets (art/, og-image, robots.txt, sitemap, CNAME, security.txt)
├── src/
│   ├── App.tsx                paginaschakelaar
│   ├── entries/               8 entry-points (koppelen html ↔ React)
│   ├── pages/                 HomePage, WorkPage, AboutPage, CommissionsPage
│   ├── components/            SiteNav (burger), Lightbox, GalleryGrid, EnquiryForm, MailLink, …
│   ├── data/                  artworks.ts (manifest + Instagram), site.ts (contact, paden)
│   ├── i18n/                  dictionary.ts — álle sitetekst NL/EN op één plek, type-checked
│   ├── hooks/                 useReveal, useEscapeKey, useBodyScrollLock
│   ├── lib/                   email.ts (mailto opbouw), assets.ts
│   └── styles/                tokens.css (paletten), base, components, pages
└── .github/workflows/deploy-pages.yml   build & deploy naar GitHub Pages
```

## Branding: palet kiezen

Twee tweekleurige paletten zijn ingebouwd. Wissel door in álle 8 html-bestanden het
`data-palette`-attribuut op `<html>` te veranderen:

- `data-palette="delft"` — **Delfts & Mist**: porselein (`#eef0f3`) met Delfts blauwleisteen (`#1f2a33`) — huidige standaard
- `data-palette="ink"` — **Inkt & Perkament**: warm crème (`#f6f2ea`) met sepia-zwart (`#23201b`)

Alle kleuren lopen via custom properties in `src/styles/tokens.css`; een nieuw palet = één nieuw blok daar.

## Kunst toevoegen

Vervang de placeholder-SVG's in `public/art/` door scans op volledige resolutie en pas het
manifest `src/data/artworks.ts` aan (titel NL/EN, tag, jaar, status, alt-tekst). Zie CHECKLIST.md.

## Instagram-embeds

URL's toevoegen/verwijderen in `INSTAGRAM_POSTS` in `src/data/artworks.ts`. Let op: een embed
toont altijd de eerste dia van een carousel.

## Taal & teksten

Alle copy staat in `src/i18n/dictionary.ts`. Het `en`-object is type-checked tegen `nl`:
vergeet je een vertaling, dan faalt de build.

## E-mail & beveiliging

- Het contactadres wordt pas in de browser in elkaar gezet (base64 + gesplitste domeindelen) —
  nergens in de bron staat een leesbaar e-mailadres; het formulier opent een vooringevulde e-mail
  via de eigen mail-app van de bezoeker.
- Strikte CSP-meta op elke pagina (self-hosted fonts, geen third-party CDN), `noai/noimageai`,
  robots.txt blokkeert 21 AI-crawlers, `.well-known/security.txt` aanwezig.
- Dependabot houdt dependencies weekly bijgewerkt.

## Deployen

De GitHub Actions workflow `.github/workflows/deploy-pages.yml` bouwt en deployt automatisch bij
elke push naar `main`. **Eenmalige instelling**: Settings → Pages → Source → *GitHub Actions*.
