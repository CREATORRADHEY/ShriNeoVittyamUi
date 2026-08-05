# ShriNeo Capital — Bharat Ka Digital Lending Partner

Production-grade web platform for **SHRINEO VITTIYAM PRIVATE LIMITED**, operating under the customer-facing brand **ShriNeo Capital**. Vernacular-first digital lending marketplace: borrowers compare personal, business, home, mortgage and sachet loan offers from participating banks and NBFCs; agents, lenders and administrators work through dedicated portals.

Built with **TanStack Start (React 19 + Vite 7)**, **Tailwind CSS v4**, **GSAP** motion and a fully tokenised design system.

---

## 1. Quick start

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

The dev server runs at **http://localhost:8080**.

| Script | Purpose |
| --- | --- |
| `npm run dev` | Local dev server with HMR (prototype tooling enabled) |
| `npm run build` | Production build |
| `npm run build:dev` | Build with development mode flags |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint across the repo |
| `npm run format` | Prettier write |

Requirements: Node.js 20+ (install via [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)) and npm.

---

## 2. How to access every UI design / page

There are three ways to reach screens. Use whichever fits your review workflow.

### 2.1 Prototype Navigator (recommended)

Start the dev server and open:

```
http://localhost:8080/prototype
```

This is the single index of **every** screen in the product — public pages, auth, all four role portals, error/edge states and the motion catalogue. Click any entry to jump straight to that page.

A **prototype toolbar** is pinned to the bottom of every page in development. It lets you switch:

- **Role** — Borrower / Agent / Lender / Admin (also jumps to that role's dashboard)
- **Account scenario** — new, active, blocked, etc.
- **Data scenario** — empty, partial, full data states
- **Application scenario** — drives loan-journey stage rendering
- **Device** — preview device framing

The navigator and toolbar are **development-only** (`import.meta.env.DEV`). They never render in a production build, so no gating or credentials are needed to review designs — and nothing leaks to end users.

### 2.2 Direct URLs

Every screen is a plain route; type or link the URL directly. Full map in section 3.

### 2.3 In-app navigation

The sticky header (Loans dropdown, rotating **Need help** service pill), the footer link columns, and the portal sidebars cover all production-reachable journeys.

> **Note on authentication:** account services are not connected yet. Portal routes under `/app/*` are open in this build so the UI can be reviewed end to end. Sign-in/sign-up render real validation but do not dispatch an OTP.

---

## 3. Complete page map

### Public — marketing & product

| URL | Page |
| --- | --- |
| `/` | Homepage (hero, USP strip, eligibility widget, loan products, SNV Trust Score, comparison, Neo, agents, FAQ, blog) |
| `/loans` | All loans overview |
| `/loans/personal` | Personal loan |
| `/loans/business` | Business loan |
| `/loans/home` | Home loan |
| `/loans/mortgage` | Loan against property / mortgage |
| `/loans/sachet` | Sachet loan journey |
| `/compare-offers` | Offer comparison |
| `/emi-calculator` | EMI calculator |
| `/how-it-works` | How ShriNeo works |
| `/for-borrowers` | Borrower proposition |
| `/for-agents` | Agent proposition |
| `/for-lenders` | Lender / partner proposition |
| `/partner-enquiry` | Partner enquiry form |
| `/account-aggregator` | Account Aggregator explainer |

### Public — company, trust & support

| URL | Page |
| --- | --- |
| `/about` | About ShriNeo Capital |
| `/careers` | Careers |
| `/press` | Press & media |
| `/contact` | Contact |
| `/help-center` | Help centre |
| `/faq` | FAQ (18 items, 3 categories) |
| `/system-status` | System status |
| `/blog` | Blog index |
| `/blog/$slug` | Blog article |
| `/trust-center` | Trust Center hub |
| `/trust-center/security` | Security |
| `/trust-center/privacy-and-data` | Privacy & data |
| `/trust-center/rbi-compliance` | RBI compliance |
| `/trust-center/snv-trust-score` | SNV Trust Score explainer |

### Public — legal & regulatory

`/terms` · `/privacy-policy` · `/cookie-policy` · `/accessibility` · `/grievance-redressal` · `/key-fact-statement` · `/digital-lending-disclosures`

### Authentication

`/auth/signin` · `/auth/signup` (role-controlled sign-up)

### Borrower portal — `/app/borrower/...`

`index` (dashboard) · `apply` · `application` · `applications` · `offers` · `loans` · `payments` · `documents` · `scores` · `agents` · `messages` · `notifications` · `profile` · `support`

### Agent portal — `/app/agent/...`

`index` · `start` · `leads` · `files` · `commissions` · `analytics` · `training` · `resources` · `notifications` · `profile` · `support`

### Lender portal — `/app/lender/...`

`index` · `workbench` · `portfolio` · `reviews` · `risk` · `api-status` · `audit` · `billing` · `team` · `settings`

### Admin console — `/app/admin/...`

`index` · `borrowers` · `agents` · `lenders` · `loans` · `trust-score` · `fraud` · `consent` · `reports` · `cms` · `audit` · `system` · `settings`

### Error & edge states

Index of all states: **`/errors`**

`/errors/401` · `/errors/403` · `/errors/410` · `/errors/429` · `/errors/500` · `/errors/503` · `/errors/maintenance` · `/errors/offline` · `/errors/no-results` · `/errors/security` · `/errors/suspended` · `/errors/deactivated` · `/errors/script-failure` · `/errors/unsupported-browser` · `/404`

Any route that does not exist yet renders the shared **In development** notice (`src/components/states/dev-notice.tsx`) instead of a raw 404.

### Design & motion references

| URL | Purpose |
| --- | --- |
| `/prototype` | Screen navigator (dev only) |
| `/prototype/motion` | Motion scenario playground (dev only) |
| `/motion` | Motion system documentation & tokens |

### Machine endpoints

`/sitemap.xml` · `/mcp` · `/.mcp/list-tools` · `/.mcp/invoke-tool/$tool` · `/.well-known/oauth-protected-resource`

---

## 4. Design system

All colour, gradient, shadow, radius, typography and motion values are **semantic tokens** declared in `src/styles.css`. Components never hardcode colour utilities.

- **Brand navy** `#002B98`, deep navy `#001A5C`, canonical gradient `#001A5C → #002B98`
- **Ivory surface** `#F7F3EA` (Neo conversation), saffron CTA for primary actions
- **Typography** — Poppins for UI and all borrower-facing financial numbers (₹ amounts, rates, scores); IBM Plex Mono for metadata; Noto Sans Devanagari/Bengali/Gujarati/Tamil/Telugu/Kannada/Oriya for Indic scripts
- **Spacing** — 8pt grid
- **Motion tokens** — duration/easing pairs in CSS; routine interactions never exceed 600ms; all animations respect `prefers-reduced-motion`

Component libraries live under `src/components/`:

| Folder | Contents |
| --- | --- |
| `ui/` | shadcn primitives (Radix based) |
| `layout/` | Header, header panels, footer, public shell, auth shell, portal shell |
| `sections/` | Homepage & editorial blocks (hero, USP strip, eligibility, how-it-works, trust score, Neo, agents, FAQ, blog teaser) |
| `motion/` | Route transitions, overlays, dialogs, cookie consent |
| `states/` | Full-page, negative and in-development states |
| `illustrations/` | Bespoke SVG illustration set |
| `neo/` | Neo assistant chat widget (portal-rendered, bilingual) |
| `portal/` | Shared role-portal page scaffolding |
| `prototype/` | Dev-only review toolbar |

---

## 5. Architecture

```
src/
  routes/          file-based routes (TanStack Router); routeTree.gen.ts is generated
  components/      UI, layout, sections, states, illustrations
  content/         editorial content (home, blog)
  config/          org details, loan product catalogue
  i18n/            English + Hindi dictionaries and provider
  lib/             EMI maths, currency/format helpers, error reporting, MCP tools
  prototype/       dev-only scenario state
  styles.css       Tailwind v4 theme + all design tokens
  router.tsx       router factory, not-found handling
```

Conventions:

- File-based routing — `loans.personal.tsx` → `/loans/personal`; `blog.$slug.tsx` → `/blog/:slug`. Never edit `src/routeTree.gen.ts`.
- Root layout and global head metadata live in `src/routes/__root.tsx`; every content route declares its own `head()` with unique title, description and OG tags.
- Server-side logic uses `createServerFn`; external HTTP callers use `src/routes/api/public/*`.

---

## 6. Internationalisation

Bilingual (English / Hindi) via `src/i18n`. The language switcher is in the header. Copy for new sections must be added to both `src/i18n/en.ts` and `src/i18n/hi.ts` (or to `src/content/*` where the content is editorial).

---

## 7. Quality bar

- **Accessibility** — WCAG AA target: keyboard reachable, visible focus rings, semantic landmarks, alt text, ≥44px touch targets, reduced-motion support.
- **Performance** — Lighthouse 95+ target, GPU-friendly transforms only, lazy media, minimal layout shift.
- **SEO** — one H1 per page, unique per-route metadata, canonical tags, `robots.txt` and generated `/sitemap.xml`.

Before opening a PR: `npm run lint` and `npm run build` must both pass.

---

## 8. Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/83e2364f-37cf-45ae-a14f-42b793cf9100).

- **Ship faster** — describe what you want to build and Lovable handles the code.
- **Stay in sync** — every change made in Lovable is committed straight to this repository.
- **Full ownership** — this code is yours. Push to `main` on GitHub and your changes sync back into Lovable.
