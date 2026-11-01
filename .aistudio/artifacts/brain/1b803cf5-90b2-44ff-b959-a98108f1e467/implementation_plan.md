# Implementation Plan - QRVibe SEO, Multi-Page Routing, Blog & Favicons

## Proposed Changes

### 1. Favicon & SEO Meta Assets
- Create favicon icons (favicon.ico, 192px PNG, 512px PNG) and update `index.html` with correct links, canonical tags, Open Graph tags, and Twitter card tags.
- Embed JSON-LD structured data for `WebApplication` and `FAQPage` in `index.html`.

### 2. Client-Side Routing & Configuration
- Install `react-router-dom`.
- Configure `vercel.json` with SPA rewrites (`source: "/(.*)", destination: "/index.html"`).
- Set up React Router in `src/App.tsx` with dedicated routes for:
  - Home generator (`/`)
  - QR Type SEO pages (`/qr/wifi`, `/qr/whatsapp`, `/qr/payment`, `/qr/vcard`, `/qr/image`, `/qr/text`, `/qr/url`)
  - Blog index (`/blog`) and 5 detailed articles (`/blog/how-qr-codes-work`, `/blog/cafe-wifi-qr-code`, `/blog/restaurant-menu-qr-code`, `/blog/small-shop-payment-qr`, `/blog/qr-code-best-practices`)
  - Informational pages (`/about`, `/contact`, `/privacy`, `/terms`)

### 3. Dedicated QR Type SEO Pages & Blog Articles
- Create dedicated page components for each QR type containing unique H1, meta descriptions, canonical tags, 300-400 words of original educational content, tips, step-by-step guides, and an embedded functional QR generator.
- Create 5 comprehensive blog articles (500+ words each) with rich formatting, FAQs, and tips.
- Create About, Contact, Privacy Policy, and Terms pages with real content.
- Update `sitemap.xml` with all generated routes.
- Link all informational and blog pages in the application footer (`Footer.tsx`).

## Verification Plan
- Compile applet with `compile_applet`.
- Run type check with `lint_applet`.
- Verify client-side navigation and direct URL visits work correctly.
