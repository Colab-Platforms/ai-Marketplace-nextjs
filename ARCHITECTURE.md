# ARCHITECTURE.md

## Stack (from package.json files)
| Area | Tech |
|---|---|
| Client | Next.js **16.2.6** (App Router), React **19.2.4**, TypeScript 5, Tailwind CSS **4** (`@tailwindcss/postcss`), Redux Toolkit 2 + react-redux 9, TanStack Query 5, axios, react-hook-form + @hookform/resolvers (installed), GSAP, three + @react-three/fiber (preloader), lucide-react, Font Awesome 6.5 via CDN `<link>` in `app/layout.tsx` |
| Backend | Node (ESM, `"type": "module"`), Express **5.2**, TypeScript 5.9, Prisma **7.5** (`@prisma/client` 7.5.0, `@prisma/adapter-pg`), PostgreSQL, Joi 18, jsonwebtoken, bcrypt, helmet, cors, compression, xss, multer (memory storage), cloudinary, resend (email), node-cron, axios, dayjs, `prisma-qb` (used only by the unmounted `user` module) and `twilio` (installed; **no usage found in src**) |
| Dev tooling | backend: `tsx watch`, `tsc` + `tsc-alias`; client: ESLint 9 + eslint-config-next |
| Third parties | Cloudinary (uploads), Resend (password-reset email), Meta/Facebook Pixel (hard-coded in `frontend/app/layout.tsx`), Unsplash (allowed image host in `next.config.ts`), Google Fonts via `next/font` |
| Deployment hints | CORS allowlist in `backend/src/index.ts` contains Vercel preview URLs and `avatarindia.com`. No Dockerfile / CI config found. Actual hosting is **not verifiable** from the repo. |

## Repository layout
```
ai-Marketplace-nextjs/
├── CLAUDE.md PROJECT.md ARCHITECTURE.md DATABASE.md API_DOCUMENTATION.md PROGRESS.md   (these docs)
├── README.md                  # outdated, see CLAUDE.md
├── Aavtat logo.svg, bannerimages/   # loose root assets
├── .vscode/settings.json
├── backend/
│   ├── package.json, tsconfig.json, prisma.config.ts, prisma.ts (PrismaClient + pg adapter), .env.example
│   ├── prisma/
│   │   ├── schema.prisma      # the real schema
│   │   ├── proj.prisma        # fully commented-out old schema (ignore)
│   │   ├── migrations/        # 3 migrations (see DATABASE.md)
│   │   └── seeds/             # index.ts, superAdmin.seed.ts, categories.seed.ts, roles.seed.ts (no-op)
│   ├── scripts/               # ad-hoc TS scripts (check_rm_status, seed_matched_lead, test_stats, test_tickets, verify_vendor_data) — reference models that no longer exist; likely stale
│   ├── test/                  # admin.http, auth.http, vendor.http (manual REST Client files)
│   └── src/
│       ├── index.ts           # app bootstrap
│       ├── routes.ts          # mounts routers under /api
│       ├── user.d.ts          # type augmentation
│       ├── jobs/cloudinaryCleanup.ts
│       ├── middlewares/       # authMiddleware, errorHandler, notFoundHandler, sanitize
│       ├── utils/             # ApiError, auth (bcrypt), cloudinary, logger, mailer, paginationUtils, responseUtils, statusCodes
│       └── modules/           # auth, category, company*, notification*, settings*, subscription*, ticket*, tool, upload, user*, vendor, webhook
│                              #   (* = NOT mounted in routes.ts; see PROGRESS.md)
└── frontend/
    ├── app/                   # routes (below)
    ├── components/            # AavtarPreloader, about, common, home, marketplace, sections
    ├── data/                  # static content: auth, divisions, faqs, marketplace, stats, testimonials
    ├── hooks/useInView.ts
    ├── lib/                   # api.ts (axios instance), verification.ts (vendor profile helpers)
    ├── redux/                 # store.ts, hooks.ts, slices/authSlice.ts
    ├── services/              # tool.service.ts (tool, upload, category), vendor.service.ts, webhook.service.ts
    ├── type/                  # auth.ts, tool.ts
    ├── public/                # logos, video, bannerimages, landingimage
    └── AGENTS.md / CLAUDE.md  # Next.js warning for agents (CLAUDE.md just imports AGENTS.md)
```
Path aliases: client `@/*` → `frontend/*` (tsconfig); backend `@/*` → `src/*`, `@root/*` → backend root (tsconfig, resolved at build by `tsc-alias`).

## Backend architecture
- Entry `backend/src/index.ts`: `dotenv` → express → CORS (allowlist + `FRONTEND_URL`, credentials on) → helmet → compression → `express.json()` → xss `sanitizeMiddleware` (mutates body/query/params strings) → static `/uploads` (from `public/uploads`) → `/api` router → `notFoundHandler` → `errorHandler`. Starts cron job, listens on `PORT` (default 5000).
- Mounted routers (`routes.ts`): `/api/health`, `/auth`, `/vendors`, `/upload`, `/tools`, `/webhooks`, `/categories`.
- Layering: route → controller (parses/validates with Joi, calls service, `sendResponse`) → service class (business logic + Prisma) → `ApiError(message, statusCode)`. Controllers usually catch and respond themselves with `error.statusCode ?? 500`; the global `errorHandler` is a fallback.
- `category.route.ts` and `ticket.route.ts` are single-file routers (inline handlers; category does not use the sendResponse envelope).
- Auth middleware (`authMiddleware.ts`): reads `Authorization: Bearer`, verifies with `JWT_SECRET`, optional role whitelist (ADMIN implies SUPERADMIN), sets `req.user = {id, role, timezone}`. Roles come from the token only (no DB lookup per request → deleted/deactivated users keep access until token expiry).
- Prisma: `prisma.ts` creates `PrismaClient` with the `@prisma/adapter-pg` using `DATABASE_URL`. `prisma.config.ts` sets schema, migrations path, seed.
- Background job: `jobs/cloudinaryCleanup.ts` — cron `0 * * * *`: deletes `uploaded_files` with status PENDING older than 24h from Cloudinary and DB.
- Email: `utils/mailer.ts` (Resend). **Throws at import time if `RESEND_API_KEY` or `SMTP_FROM_EMAIL` is missing** → backend won't start without them.
- Cloudinary util falls back to a dummy placeholder URL if Cloudinary creds are missing.

## Frontend architecture
Routes (`frontend/app`):
| Route | Type |
|---|---|
| `/` | Home: composed from `components/home/*` (Hero, Divisions, Marketplace teaser, Stats, Testimonials, FAQ, CTA…) using `data/*` |
| `/about`, `/contact`, `/privacy-policy`, `/terms-condition` | Static content pages |
| `/learning`, `/solutions`, `/saas-products`, `/ai-data-intelligence` | 10-line wrappers around `components/sections/*` |
| `/marketplace`, `/marketplace/[slug]` | Live data (TanStack Query → API) |
| `/login`, `/register` | `(auth)` route group, own layout |
| `/vendor-onboarding` | Vendor company form |
| `/dashboard` (+ `analytics`, `api-integration`, `products`, `products/new`, `products/[id]/edit`, `verification`) | Vendor dashboard; `dashboard/layout.tsx` guards: token + role VENDOR else → `/login`; no vendor profile → `/vendor-onboarding` |

`components/common/RootChrome.tsx` wraps all pages with Navbar/Footer/ScrollProgress, hidden on `/login`, `/register` and `/dashboard*`. `PageLoader` shows `AavtarPreloader` (three.js/GSAP). `app/providers.tsx` supplies Redux + QueryClient (staleTime 60s, no refetch on focus, retry 1).

### State management
- **Redux** (`authSlice`): `user`, `accessToken`, `loading`, `error`; thunks `loginUser`, `registerUser`, `logout`. Token and user persisted in `localStorage` keys `accessToken`, `authUser`; slice initial state reads from localStorage.
- **TanStack Query**: marketplace pages (categories, tool list, tool detail, pricing plans).
- Dashboard pages use local `useState`/`useEffect` with services directly.
- `lib/verification.ts` caches the vendor profile in `localStorage['avatar_vendor_profile']` as a fallback on network errors.
- Axios (`lib/api.ts`): base URL `NEXT_PUBLIC_API_BASE_URL` (default `http://localhost:5000`), request interceptor adds Bearer token; on 401 clears localStorage keys (does not redirect or reset Redux).

### Styling
Tailwind 4 with `@theme` tokens in `app/globals.css` (colors prefixed `avatar-*`, plus shadcn-like `background/foreground/primary/accent/muted` tokens). Fonts: Inter, Space Grotesk, Syne, Roboto Flex (`next/font`).

## Data flow (typical)
Page component → `services/*.ts` / `lib/verification.ts` → `lib/api.ts` (axios + Bearer) → Express `/api/...` → `auth()` → controller (Joi) → service → Prisma → PostgreSQL → `{status, data, message}` back. Images: client `POST /api/upload` (multipart, 5 MB limit) → Cloudinary → `uploaded_files` row PENDING → URL stored on tool/vendor doc → row flipped to USED.

## Environment variables (names only)
Backend (`backend/.env.example`; values must never be documented): `DATABASE_URL`, `PORT`, `DEFAULT_PAGE_SIZE` and `NODE_ENV` (listed; not read anywhere in src), `LOG_LEVEL` (listed; not read anywhere in src; `utils/logger.ts` is not imported by any file), `JWT_SECRET`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `FRONTEND_URL`, `RESEND_API_KEY`, `SMTP_FROM_EMAIL`. Also read in code but absent from the example: `APP_NAME` (optional, mailer).
Client: `NEXT_PUBLIC_API_BASE_URL` (no `.env*` file or example in repo).
