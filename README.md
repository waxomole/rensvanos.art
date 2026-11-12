# rensvanos.art

Showcase-website voor Rens van Os — lijnkunst van architectuur en fantastische plaatsen. Statische site (HTML/CSS/JS), geen build-stap vereist.

## Structuur

- `index.html` — de volledige pagina (hero, uitgelicht werk, galerij, over mij, commissies & prints, contact)
- `css/style.css` — styling (liquid glass: gefroste panelen met backdrop-blur)
- `js/artwork.js` — manifest van de galerij (titel NL/EN, tag, jaar, status, alt-tekst) plus `INSTAGRAM_POSTS`
- `js/main.js` — galerij-rendering, lightbox met werkdetail en aanvraag-link, Instagram-embeds, scroll-gedrag en reveal-animaties
- `en/index.html` — Engelstalige versie (schakelaar NL/EN in de navigatie)
- `art/` — kunstwerken; bevat nu placeholder-SVG's
- `og-image.png` — sociale preview (1200×630) voor gedeelde links
- `apple-touch-icon.png` — icoon voor iOS-thuisscherm
- `sitemap.xml` + `robots.txt` — zoekmachine-indicering

## Eigen kunst toevoegen

1. Plaats je scans/foto's in `art/`, bijv. `art/grachtenpanden.jpg` (liefst 4:5-verhouding, ~1600px breed).
2. Pas `js/artwork.js` aan: zet `src` naar jouw bestand en werk `title`/`titleEn`, `tag`/`tagEn`, `year`, `status` (`print`, `origineel`, `beide` of `uitverkocht`) en `alt`/`altEn` bij.
3. Verwijder de bijbehorende placeholder-SVG wanneer alle echte werk erin staat.

## Instagram-embeds tonen

Zet in `js/artwork.js` post-URL's of shortcodes in `INSTAGRAM_POSTS`, bijv.:

```js
const INSTAGRAM_POSTS = [
  "https://www.instagram.com/p/DXXXXXXXXXX/"
];
```

De sectie "Vers van de tekentafel" verschijnt zodra er posts in staan; leeg betekent verborgen.

## Sociale preview vervangen

Zodra er echt werk beschikbaar is: maak een nieuwe `og-image.png` van 1200×630 met een sterk werk en de naam, en vervang het bestand in de repo-root.

## Publiceren via GitHub Pages

1. GitHub-repo → **Settings → Pages**.
2. Source: **Deploy from a branch**, branch `main`, map `/ (root)`.
3. Daarna staat de site op `https://waxomole.github.io/rensvanos.art/`.

## Eigen domein (Hostinger)

1. In GitHub Pages-instellingen een custom domain invullen (`rensvanos.art`) — dit maakt een `CNAME`-bestand aan, of voeg dat bestand zelf toe met daarin `rensvanos.art`.
2. In Hostinger DNS (domeinpanel → DNS Zone):
   - `A`-records voor `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` voor `www` → `waxomole.github.io`
3. Wacht tot DNS propageert en vink **Enforce HTTPS** aan zodra het certificaat klaar is.

## E-mail-alias (Hostinger)

Maak in het Hostinger-panel (Emails → je domein → Aliases/Forwarders) de alias `prints@rensvanos.art` aan en forward deze naar je gewenste inbox.
