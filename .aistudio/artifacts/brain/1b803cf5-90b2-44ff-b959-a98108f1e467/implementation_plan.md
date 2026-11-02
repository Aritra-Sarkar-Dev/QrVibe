# Implementation Plan - QRVibe Technical SEO & Page Structure Upgrade

## 1. Centralized Configuration
- Create `src/utils/config.ts` defining `SITE_URL = 'https://qr-vibe.vercel.app'` for consistent use across canonical URLs, sitemaps, and structured data.

## 2. Per-Page Metadata & OpenGraph
- Standardize `react-helmet-async` usage across all pages (`QRTypePage`, `BlogIndexPage`, `BlogPostPage`, `InfoPage`, `App.tsx`).
- Ensure unique title (< 60 chars) and meta description (140-160 chars) for every route, with proper OG and Twitter card tags.

## 3. Social Assets & Icons
- Generate `public/og-image.png` (1200x630) featuring brand identity and headline.
- Ensure favicon, 192x192, 512x512 icons, and Apple touch icons are linked in `index.html` with `<meta charset="UTF-8">` as the first child of `<head>`.

## 4. Semantics, Headings & Breadcrumbs
- Enforce a single H1 per page with the main keyword.
- Add visible breadcrumbs on all inner pages (`Home > QR Types > ...`).
- Ensure all images and icons have meaningful alt text or aria-labels.

## 5. Valid JSON-LD Structured Data
- Update structured data schemas (WebSite, Organization, WebApplication, FAQPage, BreadcrumbList, HowTo, BlogPosting) to remove personal email addresses (replacing with `/contact`) and eliminate any fake aggregate ratings.

## 6. Sitemap, Robots & Indexability
- Create `public/sitemap.xml` and `public/robots.txt`.
- Add `<meta name="robots" content="noindex">` to the 404 page.
- Update `vercel.json` to correctly serve static files before SPA rewrites.

## 7. Internal Linking & Navigation
- Ensure every QR type page links to 3-4 related types and 2 relevant blog guides.
- Ensure all footer links connect cleanly to all pages.

## 8. Performance & Code Splitting
- Implement `React.lazy` and `Suspense` for page routes.
- Optimize fonts and image lazy loading.

## 9. Multilingual (Bengali /bn)
- Add `/bn` and `/bn/qr/...` routes with translated content and `hreflang` tags (`en`, `bn`, `x-default`).
