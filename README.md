# rensvanos.art

Showcase-website voor Rens van Os — lijnkunst van architectuur en fantastische plaatsen. Statische site (HTML/CSS/JS), geen build-stap vereist.

## Structuur

- `index.html` — de volledige pagina (hero, uitgelicht werk, galerij, over mij, commissies & prints, contact)
- `css/style.css` — styling (liquid glass: gefroste panelen met backdrop-blur)
- `js/artwork.js` — manifest van de galerij (titel, tag, alt-tekst, bestandspad)
- `js/main.js` — galerij-rendering, scroll-gedrag en reveal-animaties
- `art/` — kunstwerken; bevat nu placeholder-SVG's

## Eigen kunst toevoegen

1. Plaats je scans/foto's in `art/`, bijv. `art/grachtenpanden.jpg` (liefst 4:5-verhouding, ~1600px breed).
2. Pas `js/artwork.js` aan: zet `src` naar jouw bestand en werk `title`, `tag` en `alt` bij.
3. Verwijder de bijbehorende placeholder-SVG wanneer alle echte werk erin staat.

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
