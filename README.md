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

## Bots & beveiliging

- `robots.txt` blokkeert bekende AI-/scrape-bots (GPTBot, ClaudeBot, CCBot, Bytespider, PerplexityBot, e.a.); zoekmachines zoals Google en Bing blijven welkom.
- Beide pagina's sturen `noai, noimageai` via de robots-meta-tag als extra signaal.
- Het e-mailadres staat nergens leesbaar in de bron: links worden pas in de browser door JavaScript in elkaar gezet (`data-mail-user`/`data-mail-domain`). Zonder JavaScript staat er een versluierde tekst.
- Een Content-Security-Policy (meta) staat scripts, styles, fonts en frames alleen van vertrouwde bronnen toe; `strict-origin-when-cross-origin` beperkt wat de referrer lekt.
- `.well-known/security.txt` beschrijft het meldpunt.
- Let op: `robots.txt` is een verzoek, geen slot — kwaadwillende bots kunnen het negeren. GitHub Pages laat geen eigen HTTP-headers of firewall-regels toe; wie dat wil kan het domein later via Cloudflare proxyen met bot-fight-mode.
