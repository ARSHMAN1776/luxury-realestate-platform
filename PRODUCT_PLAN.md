# MERIDIAN & VOSS → Sellable White-Label Real-Estate Product

## Context — why this plan exists

Today the site is a **beautiful front-end shell (~30% of a product)**: excellent design system, motion, accessibility, and a production-quality typed domain model. But it is **not sellable to a real estate business as-is** because:

- **Every property click 404s** — `/properties/[slug]` was never built (the rich data for it already exists in `src/data/properties.ts`). Same for `/journal/[slug]`, `/agents`, `/offices`, `/investment`, `/lifestyle`, `/case-studies/[slug]`.
- **Search is a decoy** — `Discovery.tsx` pushes to `/properties?q=…` but that page ignores all query params; there is no listing grid or working filter.
- **Every form is fake** — Contact, Newsletter, and property Enquiry all `setTimeout` + toast. No lead is captured, emailed, or stored. No backend, no API, no database, no CMS.
- **All content is hardcoded** in `src/data/*.ts`; agencies can't add a listing without editing TypeScript. All photos hotlink Unsplash (a licensing problem for resale).
- **Not white-label** — the brand name "MERIDIAN & VOSS", fonts, contact details, and domain are hardcoded across many files. No `siteConfig`, no per-page SEO/JSON-LD, no sitemap, no `public/` assets, dead legal links, no cookie consent, no deploy kit.

**Goal (your confirmed decisions):** a **white-label template** (one codebase, many buyers, each deploys their own copy, rebrands via config + CMS), backed by a **headless CMS** (non-technical staff edit listings/photos/posts), delivered as **one complete build**.

---

## Architecture decisions (resolved)

| Decision | Choice | Why |
|---|---|---|
| **CMS** | **Payload CMS 3, embedded in this Next app, self-hosted** | Admin ships at `/admin` in the same app — no 2nd deployment. Real uploads, buyer owns the DB, **MIT license = zero per-buyer cost**. Sanity/Contentful force each buyer into their own paid SaaS account — a resale liability. |
| **Payload × Next 16.3.0** | **Safe.** Payload supports Next **16.2.6+**; we're on 16.3.0 | Install with `pnpm` or `npm i --legacy-peer-deps` (Payload's peer-dep still names next@^15). **Do NOT enable Cache Components** (Payload's one known incompatibility) — use classic `revalidateTag`. |
| **Database** | **SQLite for dev/trial, Postgres for production** (env switch) | Buyer runs `pnpm dev` with zero DB setup; flips one env var for production. |
| **Media** | Local disk in dev; **S3/R2-compatible** in production | Serverless filesystems are ephemeral — documented production caveat. |
| **Forms** | **Server Actions** + Zod + email (Resend primary, SMTP fallback) → store in a Payload `enquiries` collection | Progressive enhancement, no endpoint to secure, self-hostable per buyer via env. |
| **i18n scope** | **Presentation-level now** (locale-correct formatting + currency + m²/sqft toggle); full multi-language routing deferred | Full translated-content routing is a separate large project; over-scoping risks the "one build" goal. Architected so it can be added later. |

### Next.js doc-deviation flags (this is a modified Next.js — verified against `node_modules/next/dist/docs/`)
1. **Turbopack is the default** for dev **and** build — no `webpack` config allowed.
2. **`params` / `searchParams` are Promises** — must `await`.
3. **`generateStaticParams` must return ≥1 entry** — an empty array breaks the build.
4. **`error.tsx` reset prop is `retry`** (not `reset`); must be a Client Component.
5. **`robots.ts` gained an `other` field** in 16.3.0.
6. **JSON-LD** via native sanitized `<script>`, no library.
7. **Cache Components stays OFF** — use classic `revalidate`/`unstable_cache`/`revalidateTag`.
8. **`next/font` args must be static** — fonts are a build-time white-label field (presets + `next/font/local` slots), not CMS-editable.

---

## What gets built

### 1. CMS foundation (Payload, embedded)
- `src/payload.config.ts` — collections `properties`, `agents`, `journal`, `case-studies`, `offices`, `testimonials`, `media`, `enquiries`, `users`; globals `categories`, `statistics`, `faqs`, `lifestyle-pillars`, `service-pillars`, `site-settings`. Each collection mirrors the existing `src/types/index.ts` shapes exactly.
- `src/app/(payload)/…` — admin UI, REST + GraphQL handlers, isolated in a route group so Payload's layout doesn't inherit the marketing shell (Preloader/Cursor/Header/Footer).
- `next.config.ts` — wrap with `withPayload(...)`, add `serverExternalPackages` (`sharp`), add media host to `images.remotePatterns`, set `output: 'standalone'`. **No `cacheComponents`, no `webpack`.**

### 2. Data-layer refactor (swap `src/data/*.ts` without rewriting components)
- **`src/types/index.ts` stays the contract.** New `src/lib/data/*` adapter returns those exact shapes, mapping Payload docs → domain types in one place (`mappers.ts`) so swapping CMS later = rewrite mappers only.
- Async mirrors of **every existing selector, same names/signatures** (`getPropertyBySlug`, `getRelatedProperties(slug, limit)`, `getPropertiesByAgent`, `propertyCountries`, `getJournalPostBySlug`, `getRelatedPosts`, etc.) — call sites change only by adding `await`. Plus a new `getProperties(filters: PropertyFilters)` for the listing page.
- **Client/server boundary fix:** `Hero`, `Categories`, `Discovery`, `Header`, `PropertyActions` are `"use client"` and import data at module scope. They become **prop-driven**; their nearest Server parent fetches and passes props.
- **`src/seed/index.ts`** — imports the existing `src/data/*.ts` arrays and uploads the current 12 properties / 6 agents / 6 posts / offices / etc. into the CMS, so **the site looks identical after migration**. `src/data/*.ts` stays until seed is verified, then synchronous imports are removed.

### 3. Missing routes (correct Next 16 patterns)
- `properties/[slug]` (detail, `generateStaticParams` + `generateMetadata`), **rewritten `/properties`** (real listing grid + filter reading `searchParams`, wired to the existing `PropertyFilters` type and the `Discovery` search that already deep-links here), `journal/[slug]`, `agents` + `agents/[slug]`, `offices`, `investment`, `lifestyle`, `case-studies/[slug]`.
- `not-found.tsx`, `error.tsx` (Client, `retry` prop), `loading.tsx`.

### 4. Real lead capture
- `src/app/actions/{enquiry,newsletter}.ts` (`'use server'`), `src/lib/validation/schemas.ts` (Zod, matching existing field names), `src/lib/email/index.ts` (Resend + Nodemailer SMTP fallback, provider chosen by env). Rewire `Contact.tsx`, `Newsletter.tsx`, `PropertyActions.tsx` to `useActionState` + `<form action>`, keep the toast, add inline errors + honeypot. Leads persist to the `enquiries` collection.

### 5. White-label config (single source of truth)
- `src/config/site.ts` (+ Zod boot validation) and a CMS `site-settings` global (runtime-editable brand fields). Precedence: **env → siteConfig → CMS**.
- A `<Brand />` component replaces the hardcoded 3-span wordmark (renders uploaded logo image, else text lockup).
- **Every hardcoded location replaced:** `Header.tsx:97-105`, `Footer.tsx:139-146` & `:171`, `layout.tsx:12-25` (fonts), `layout.tsx:28` (`metadataBase`), `PropertyActions.tsx:115` (share URL), `utils.ts:31` (`formatPrice` locale), `<html lang>`, and all contact literals in Header/Footer/Contact.

### 6. SEO
- `sitemap.ts`, `robots.ts` (with `other`), `manifest.ts`; `src/components/seo/JsonLd.tsx` (Organization/RealEstateAgent, Product/Residence + BreadcrumbList, Article, Person); `generateMetadata` on all dynamic pages; **dynamic `opengraph-image.tsx` + `icon.tsx`** so branding flows from config (no binary asset editing needed to rebrand).

### 7. Legal + GDPR
- `/privacy`, `/terms`, `/cookies` templated from the config legal entity; `CookieConsent` banner gating non-essential scripts; Footer legal links fixed (currently all point to `/contact`).

### 8. Localization layer
- Fix `formatPrice` locale; `src/lib/units.ts` + `UnitProvider` m²/sqft toggle; currency display (optional conversion behind a flag); `<html lang>` from config.

### 9. Deploy & DX kit
- `.env.example`, `README.md` (quickstart, rebrand guide, CMS first-run, deploy, compatibility/fallback notes), `vercel.json`, `Dockerfile` + `.dockerignore`, ESLint config + `lint`/`verify` scripts. Commit to **pnpm**.

---

## Execution phases (ordered, with dependencies)

- **Phase 0 — Foundations:** ESLint + scripts, `src/config/site.ts` + schema, `.env.example`, `output:'standalone'`. *(no behavior change)*
- **Phase 1 — CMS install & schema:** Payload deps, `withPayload`, `(payload)` route group, `payload.config.ts` (all collections/globals/`enquiries`/`site-settings`), DB + storage adapters, verify `/admin` boots. *(→ blocks 2–5)*
- **Phase 2 — Seed & adapter layer:** `src/lib/data/*` + `mappers.ts` + `src/seed/index.ts`; run seed, verify parity.
- **Phase 3 — Wire pages + build missing routes:** server consumers `async/await`; client components prop-driven; all missing routes + not-found/error/loading; remove synchronous `src/data` imports.
- **Phase 4 — Lead capture:** Server Actions + Zod + email; rewire 3 forms.
- **Phase 5 — White-label brand pass:** replace all hardcoded sites with config/`<Brand />`; font presets + local slots.
- **Phase 6 — SEO:** sitemap/robots/manifest, JsonLd, generateMetadata, dynamic OG/icon.
- **Phase 7 — Legal + GDPR:** legal pages + cookie consent + fixed footer links.
- **Phase 8 — Localization:** formatPrice, units toggle, currency, `<html lang>`.
- **Phase 9 — Deploy & docs:** vercel.json, Dockerfile, README, `.env.example`, run `pnpm verify` (lint + typecheck + build).

---

## Verification (end-to-end)
- `pnpm dev` → visit `/admin`, log in, confirm collections; edit a listing and see it change on the site.
- Click any property card → detail page renders (no 404). `/properties?category=villas&country=…` → filtered grid.
- Submit Contact/Newsletter/Enquiry → lead appears in `enquiries` and an email is sent (or logged in dev).
- Change brand name/logo/contact in `site-settings` + config → propagates everywhere; no "MERIDIAN & VOSS" literal remains (`grep`).
- `pnpm verify` passes (lint + typecheck + `next build` under Turbopack). `/sitemap.xml`, `/robots.txt`, JSON-LD validate. Legal pages resolve; cookie banner gates analytics.

---

## Prerequisites the buyer/you provide per deployment (env)
`DATABASE_URI` (Postgres in prod; SQLite auto in dev), `PAYLOAD_SECRET`, site URL, S3/R2 creds (prod media), `RESEND_API_KEY` **or** `SMTP_*`, plus brand overrides. Dev runs with **zero external services** (SQLite + local media + console-logged email).
