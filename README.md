# Elora 67 — Shopify theme

A custom Online Store 2.0 theme for [elora67.com](https://elora67.com): modest fashion for women, men and kids, in deep purple and gold.

## Connect it to the store

1. Shopify admin → **Online Store → Themes → Add theme → Connect from GitHub**.
2. Pick the `MoFawkes/elora-67` repo and the branch you want (e.g. `main`).
3. Click **Customize** to preview, then **Publish** when ready.

Edits made in the theme editor are committed back to the connected branch automatically.

### Local development (optional)

```sh
npm install -g @shopify/cli
shopify theme dev --store <your-store>.myshopify.com   # live preview with hot reload
shopify theme check                                     # lint
```

## Store setup checklist

| Where | What |
| --- | --- |
| Theme settings → Logo | Upload the crown / 67 / ELORA FASHION mark as a transparent PNG (a text fallback is shown until then). |
| Theme settings → Colors | Purple and gold defaults match the mockup. A **Noir** (black + gold) preset is also included. |
| Navigation → `main-menu` | Home · Shop (Women, Men, Kids, Fabrics, New Arrivals as child links) · About Us · Contact |
| Navigation → `footer` | Shipping, Returns, Size guide, FAQ, Privacy, Terms |
| Products → Collections | Create Women, Men, Kids, Fabrics, New Arrivals |
| Customize → Home → Collection tiles | Pick a collection and image for each tile. The Brand tile's link goes to the About page. |
| Customize → Home → Hero banner | Upload a wide banner image (2400×1000, model on the right) plus an optional portrait image for mobile. |
| Settings → Markets / Languages | Add currencies and languages; the header selectors appear automatically. |
| Search & Discovery app | Add filters (size, colour, price, product type) for the collection filter panel. |
| Settings → Domains | Point `elora67.com` at the store. |

## Structure

```
layout/      theme.liquid, password.liquid
sections/    header, footer, trust-bar, hero-banner, collection-list (tiles),
             featured-collection, image-with-text, main-* page sections
snippets/    product-card, price, facets, pagination, icon, logo, meta-tags
templates/   JSON templates for every page type
assets/      base.css, theme.js (no build step)
config/      theme settings schema and presets
locales/     en.default.json
```

Fonts: headings/body use Shopify's font picker (Playfair Display + Assistant by default). **Cinzel** (navigation and banner titles) and **Great Vibes** (script accent) load from Google Fonts. You can turn them off under Theme settings → Typography.
