# Motor Atlas

Motor Atlas is a vehicle discovery field guide: a responsive, editorial-style catalog covering passenger cars, SUVs and vans, performance cars, commercial vehicles, motorcycles, and cycles. Browse all 26 vehicle types across 40 example rides, compare practical specifications, search by make or model, and open a profile for performance, use cases, estimated prices, and a media gallery.

## Features

- Next.js App Router with JavaScript and server-rendered pages by default.
- Tailwind CSS v4 project setup plus an OKLCH-based custom visual system.
- Motion for lightweight reveal and mobile-navigation animations; Lucide icons.
- Persistent day/night drive mode, with a vehicle-instrument-inspired toggle, system preference detection, and reduced-motion support.
- Search and type filters across the vehicle catalog.
- Individual, metadata-rich vehicle pages with powertrain, power, top speed, acceleration, seating, drive, transmission, fuel, and nitrous availability.
- Indicative USD prices and PKR conversions, with a visible exchange-rate and market-variation disclaimer.
- Curated Unsplash photo galleries; an optional, on-demand Unsplash/Pixabay lookup can add credited photos and Pixabay videos.
- Search-engine metadata, canonical vehicle URLs, `robots.txt`, and a vehicle-aware XML sitemap.
- Lazy-loaded catalog imagery, reduced-motion styling, keyboard-accessible controls, responsive layouts, and a custom not-found page.

## Technology

- Next.js 16 App Router, React 19, JavaScript
- Tailwind CSS v4
- Motion 12+ (`motion/react`)
- Lucide React
- Node.js 20.9 or newer and npm

## Getting started

The application is in the `motor-atlas` folder. From that folder:

1. Install Node.js 20.9+ (the LTS release is recommended).
2. Install dependencies with `npm install`.
3. Copy `.env.example` to `.env.local` and add your own Unsplash and Pixabay API credentials (details below).
4. Start the development server with `npm run dev`.
5. Visit `http://localhost:3000`.

### Windows

Open PowerShell in the `motor-atlas` folder. Copy `.env.example` to `.env.local` in File Explorer or with PowerShell's `Copy-Item .env.example .env.local`, then add the keys using a local editor. Run `npm install` and `npm run dev`.

### macOS and Linux

Open Terminal in the `motor-atlas` folder. Run `cp .env.example .env.local`, edit `.env.local` with your preferred editor, then run `npm install` and `npm run dev`.

### Production checks

- `npm run lint` runs ESLint.
- `npm run build` creates the production build.
- `npm run start` serves a previously built production version.

## Image and video API credentials

Optional community media is requested only when a visitor presses **Find free photos & video** on a vehicle profile. The API route calls Unsplash and Pixabay from the server, so credentials are not shipped in client JavaScript. Configure these names in `.env.local`:

```env
UNSPLASH_ACCESS_KEY=your_unsplash_access_key
PIXABAY_API_KEY=your_pixabay_api_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

The `.env.local` file is git-ignored. Do not commit it or paste API keys into source files. `.env.example` contains names only. If either key is absent or an upstream service is unavailable, the site continues to use its curated gallery and reports that extra media is unavailable. Configure `NEXT_PUBLIC_SITE_URL` to the public HTTPS origin before deploying so canonical URLs, sitemap, and robots metadata point to the live site.

## Media, vehicle data, and attribution

- The bundled editorial images are delivered from Unsplash's image CDN. The optional gallery search uses the Unsplash and Pixabay APIs and links to the original media pages with contributor/source credits. Review each provider's current API requirements and license terms before publishing, particularly attribution and hotlinking requirements.
- Vehicle descriptions are original editorial copy. Technical specifications and prices are indicative reference values, not a live manufacturer feed or a promise of a specific trim. Values vary by year and market; confirm specifications and dealer pricing before purchase.
- PKR figures use a fixed approximate conversion of ₨280 per USD for display only; taxes, duties, and local availability are not included.
- Nitrous oxide is not a standard manufacturer feature on these examples; where relevant, the profile states whether it is fitted by the manufacturer.
- Brand and model names are used for identification only. Motor Atlas is an independent guide, not affiliated with vehicle manufacturers.

## Project map

- `src/app/` — App Router pages, global styling, SEO routes, and the server-side media API.
- `src/app/vehicles/[slug]/` — dynamic vehicle profiles and per-vehicle metadata.
- `src/components/` — shared navigation, footer, reveal animation, catalog, cards, and gallery.
- `src/lib/vehicles.js` — editorial vehicle data, type families, and currency formatting.
- `next.config.mjs` — image host allowlist and Next.js configuration.

## Accessibility and performance notes

Pages render on the server by default; client components are limited to filtering, menu state, reveal animations, and user-triggered media loading. Gallery lookups are on demand and cached upstream to avoid making visitors wait on image APIs during initial page rendering. Images specify responsive sizes, videos do not autoplay, and the stylesheet respects `prefers-reduced-motion`.

## Deployment

Deploy the `motor-atlas` directory to a Node.js-compatible Next.js host (for example, Vercel). Use Node.js 20.9+, configure `UNSPLASH_ACCESS_KEY`, `PIXABAY_API_KEY`, and `NEXT_PUBLIC_SITE_URL` in the host's environment settings, then run the production build. API credentials must be stored as server environment variables and never exposed through `NEXT_PUBLIC_` names.
