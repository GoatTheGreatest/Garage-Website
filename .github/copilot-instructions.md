# Motor Atlas project notes

- Use JavaScript only; this project uses the Next.js App Router and the `src/` directory.
- Keep routes as Server Components by default. Add `"use client"` only for browser state, event handlers, or Motion interactions.
- Import animations from `motion/react`; keep layout and color styling in Tailwind/CSS and avoid CSS transitions on the same transform properties Motion animates.
- Keep API credentials server-only. Never use `NEXT_PUBLIC_` for Unsplash or Pixabay keys; `.env.local` is ignored by Git.
- Vehicle facts and prices in `src/lib/vehicles.js` are editorial estimates. Preserve the on-page market and exchange-rate disclaimers when editing those values.
- Use the image host allowlist in `next.config.mjs` for remote `next/image` sources. Keep alternative text, responsive `sizes`, and reduced-motion behavior.
- Run `npm run lint` and `npm run build` after changes that affect application code.
