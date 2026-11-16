# rensvanos.art

Showcase-website voor Rens van Os — lijnkunst van architectuur en fantastische plaatsen.
Gebouwd met **React 19 + TypeScript + Vite 8 + React Router 7** als single-page app met schone
URL's (`/werk`, `/en/work`, … — geen `.html` in de adresbalk). Eén HTML-shell; per route worden
titel, description, canonical en OG-tags via `usePageMeta` ingesteld.

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
├── index.html          de enige HTML-shell (CSP, OG, JSON-LD, pen-nib favicon)
├── public/             statische assets (art/, og-image, robots.txt, sitemap, CNAME, security.txt)
├── scripts/
│   └── postbuild.mjs   kopieert dist/index.html → dist/404.html (SPA-fallback GitHub Pages)
├── src/
│   ├── main.tsx                BrowserRouter + mounting
│   ├── App.tsx                 alle routes (8 schoone URL's + 404 + legacy-redirects)
│   ├── pages/                  HomePage, WorkPage, AboutPage, CommissionsPage, NotFoundPage
│   ├── components/             SiteNav (burger), UtilityPill, InkTrail, Aurora (+ papierkorrel),
│   │                           Lightbox, GalleryGrid, EnquiryForm, MailLink, …
│   ├── data/                   artworks.ts (manifest + Instagram), site.ts (contact, paden)
│   ├── i18n/                   dictionary.ts — álle sitetekst NL/EN op één plek, type-checked
│   ├── hooks/                  usePageMeta, useAutoHideHeader, useReveal, useEscapeKey, …
│   ├── lib/                    email.ts (mailto opbouw), assets.ts
│   └── styles/                 tokens.css (paletten), base, components, pages
└── .github/workflows/deploy-pages.yml   build & deploy naar GitHub Pages
```

## Routing & schone URL's

- React Router serveert `/`, `/werk`, `/over-mij`, `/commissies` + de `/en/…`-varianten.
- De postbuild-stap maakt `404.html` (een kopie van de shell). GitHub Pages valt daarop terug
  voor onbekende paden, waardoor diepe links alsnog de app laden en correct routeren.
- Oude `.html`-URL's (`/werk.html`, …) worden client-side omgeleid via `LEGACY_PATHS`.
- **Afkapping**: diepe links komen binnen met HTTP-status 404 (de server kent het pad niet);
  de pagina zelf rendert prima. Voor een portfolio-site met beperkte diepe links een acceptabele
  trade-off; sitemap.xml wijst crawlers naar de schone URL's.

## Branding: licht & donker

Twee thema's, geschakeld met de zon/maan-knop in de utility pil (rechtsboven). De keuze
wordt in localStorage bewaard; eerste bezoek volgt `prefers-color-scheme`. Een klein
inline script in `index.html` zet `data-theme` vóór de eerste paint (geen flits); het
CSP-beleid staat precies díé script-hash toe.

- `data-theme="light"` — **Inkt & Perkament**: warm crème (`#f6f2ea`) met sepia-zwart (`#23201b`)
- `data-theme="dark"` — **Nacht**: diep inktblauw (`#12161b`) met warm krijt (`#e8e4da`)

Alle kleuren lopen via custom properties in `src/styles/tokens.css`; een nieuw thema = één nieuw blok daar.
Aurora-bollen zijn pure radial-gradients (geen blur-filters) en de inktvlekken gebruiken
een mask in de themakleur — beide passen zich automatisch aan elk thema aan.

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
