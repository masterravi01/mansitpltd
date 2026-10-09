# MANSI TP LTD

One-page website for **MANSI TP LTD**, a UK private limited company operating in the wholesale of fruit and vegetables.

The configured production domain is `https://mansitpltd.co.uk`. Do not assume the domain is registered or live.

The site is a statically generated Astro project, designed for Cloudflare Workers.

## Technology stack

- [Astro](https://astro.build) with static output
- [Tailwind CSS](https://tailwindcss.com)
- TypeScript for shared site data
- [@astrojs/cloudflare](https://docs.astro.build/en/guides/integrations-guide/cloudflare/) with `imageService: 'compile'` and `prerenderEnvironment: 'node'`
- [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/)
- Wrangler for Cloudflare Workers deployment
- Source Serif 4 for headings and Inter for body text

There is no backend, database, or form-delivery service in this repository.

## Installation

Requires Node.js 22.12.0 or later.

```sh
npm install
```

## Development

```sh
npm run dev
```

The local site is usually available at `http://localhost:4321`.

## Production build

```sh
npm run build
```

Preview the production build:

```sh
npm run preview
```

Images are compiled at build time into hashed `/_astro/*.webp` files. Production HTML must never contain runtime `/_image?...` URLs.

The Cloudflare adapter default (`imageService: 'cloudflare-binding'`) is not used. That mode emits `/_image?href=...` URLs that 404 on Workers unless a Cloudflare Images binding is set up. This project compiles images during `npm run build` instead.

## Cloudflare Workers deployment

Local deploy:

```sh
npm install
npm run build
npx wrangler deploy
```

Cloudflare Git / Workers Builds settings:

| Setting | Value |
| --- | --- |
| Root directory | `/` |
| Production branch | `main` |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |

With the Cloudflare adapter, static assets are written to `dist/client` (not `dist`). Wrangler is configured to publish that directory.

The Cloudflare adapter may provision a `SESSION` KV binding automatically. This site does not use sessions or a Cloudflare Images binding.

## Wrangler configuration

Defined in `wrangler.jsonc`.

- Worker name: `mansitpltd`
- Compatibility date: `2026-10-09`
- Assets directory: `./dist/client`
- Assets binding: `ASSETS`
- 404 handling: `404-page`

Do not add a second Wrangler config file.

## Image replacement

Photography lives in `src/assets/images/` so Astro can compile it at build time.

| File | Used for |
| --- | --- |
| `hero.jpg` | Homepage hero |
| `fruit.jpg` | Fresh fruit |
| `vegetables.jpg` | Fresh vegetables |
| `essentials.jpg` | Everyday essentials |
| `about.jpg` | About section |

Update `alt` text when replacing images. Keep captions clear that stock photography is illustrative, not MANSI TP LTD stock.

Do not use `/public/images/example.jpg` as a URL. Files in `public/images/` are served from `/images/example.jpg`.

## Company information update location

Edit `src/data/site.ts`.

That file is the source for legal name, company number, status, type, incorporation date, registered office, business activity, navigation, JSON-LD, SEO, and the canonical site URL.

If the live domain changes, update `siteUrl` in `src/data/site.ts` and the sitemap URL in `public/robots.txt`.

## Contact form integration

The enquiry form in `src/components/Contact.astro` validates in the browser. It does **not** send email.

To connect a real service:

1. Open `src/components/Contact.astro`.
2. Follow the `TODO` comment in the form script.
3. POST the `FormData` to your chosen provider or Cloudflare Worker.
4. Update the on-page status message so successful sends are described accurately.
5. Update `/privacy` with the provider name, what is stored, and how long it is kept.

Do not add a fake API endpoint.

Field names: `name`, `business`, `email`, `message`.

## Custom domain setup

The configured production domain is `https://mansitpltd.co.uk`.

After the Worker is deployed:

1. Register or point `mansitpltd.co.uk` in Cloudflare if that is the domain you intend to use.
2. Attach the custom domain to the Worker.
3. Confirm HTTPS is active.
4. If the live domain is different, update `siteUrl` in `src/data/site.ts` and the sitemap URL in `public/robots.txt`.

## Troubleshooting image deployment

If images 404 in production:

1. Confirm `astro.config.mjs` uses `output: 'static'` and `adapter: cloudflare({ imageService: 'compile', prerenderEnvironment: 'node' })`.
2. Do **not** use `imageService: 'cloudflare-binding'` and do **not** rely on a runtime `/_image` endpoint.
3. Rebuild with `npm run build`.
4. Search the generated HTML for `/_image`. That URL must not appear.
5. Confirm compiled files exist under `dist/client/_astro/` as `.webp` (and any OG `.jpg`) assets.
6. Confirm Wrangler is publishing `dist/client`, not `dist`.
7. Deploy with `npx wrangler deploy`.

## Notes

- Photographs are produce photography, not a confirmed MANSI TP LTD stock or operations portfolio.
- Email and phone are published from confirmed contact details. No social profiles, testimonials, awards, or delivery coverage are published.
- Privacy and terms pages are short drafts and include notes for legal review.
