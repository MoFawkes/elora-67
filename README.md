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
| Theme settings → Logo | The current Elora 67 logo (silhouette with purple swirl) is bundled as `assets/elora67-logo.webp` and used by default. Upload a logo here only to replace it. |
| Theme settings → Colors | Purple and gold defaults match the mockup. A **Noir** (black + gold) preset is also included. |
| Navigation → `main-menu` | Home · Shop (Women, Men, Modest Wear, Casual Wear, New Arrivals as child links) · About Us · Contact |
| Navigation → `footer` | Shipping, Returns, Size guide, FAQ, Privacy, Terms |
| Products → Collections | Create Women, Men, Modest Wear, Casual Wear, New Arrivals, then link the hero's **Casual wear** / **Modest wear** buttons to them |
| Customize → Home → Collection tiles | Pick a collection and image for each tile. The Brand tile's link goes to the About page. |
| Customize → Home → Hero banner | Upload a wide banner image (2400×1000, model on the right) plus an optional portrait image for mobile. |
| Settings → Markets / Languages | Add currencies and languages; the header selectors appear automatically. |
| Search & Discovery app | Add filters (size, colour, price, product type) for the collection filter panel. |
| Settings → Domains | Point `elora67.com` at the store. |

## Fix in Shopify admin (found on the live store)

These are product data problems, so they show on any theme:

- **Elegant Satin Cowl Neck Blouse**: the option is named `Black,Ivory,Chocolate Brown` and its values are Black / Brown / Clear. Rename the option to `Color` with values Black / Ivory / Chocolate Brown.
- **Elora Black Tulle Statement Skirt**: the option is named `Black`. Rename it to `Color`, or add a `Size` option.
- **Elora Satin Tie-Front Cropped Blouse**: the vendor is `My Store`. Change it to `Elora`.
- **Collections**: the only collection is the empty "Women's Casual Wear example products". Delete it and create the collections listed above.
- **Old sample product**: the homepage's featured product shows £19.99, which matches none of the three products. Remove the leftover sample.
- **Homepage title**: Online Store → Preferences currently says `Elora 67 Fashion/Women's & Men's Clothing`. Consider `Elora 67 Fashion | Modest & Casual Wear for Women & Men`.

## Requested storefront updates

- Shared branding now also covers gift cards; regular storefront and password pages already use the bundled logo. Shopify-hosted checkout branding is separate: Settings → Checkout → Customize, upload `assets/elora67-logo.webp` and choose matching fonts/colors.
- WhatsApp defaults to +44 7405 859821. Change the digits-only number under Theme settings → Social media. Add the confirmed Instagram URL there too.
- Create the approved About Us and exchange-policy pages in Shopify, then select them under Theme settings → Social media. Save the approved return policy under Settings → Policies. Footer links appear only when those resources are configured.
- The cart has a promotion code input and Apply button using Shopify's cart API. Without JavaScript, Apply submits the cart form. Create the actual vouchers under Shopify admin → Discounts; eligibility and combinations are controlled by Shopify. Check valid, invalid, expired and ineligible codes on a store preview before publishing.
- The revised modest category name and replacement photography are pending. Update the collection name, navigation labels and homepage tile once confirmed; upload the supplied replacement photo and additional model photos to the relevant products. Product galleries already support multiple images.

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
