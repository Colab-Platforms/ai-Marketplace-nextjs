# PROJECT.md

## Purpose
"Avatar India" (brand: AVATAR — "The One Ecosystem for the AI Era", per `frontend/app/layout.tsx` metadata) is an AI marketplace platform. This repo's working functionality is a **B2B AI-tools marketplace**: vendors onboard, get verified, list AI tools with pricing plans and webhooks; visitors browse published tools. The marketing site also presents divisions (Learning, Solutions, SaaS Products, AI Data Intelligence), but those pages are only static placeholders (see PROGRESS.md).

Business objectives are not written down anywhere in the repo beyond marketing copy; the points below are only what code/UI shows. Commission/payout logic is not defined (`vendor.service.ts` comment: "simplified calculation").

## Modules / features (verified in code)
| Module | Where | Notes |
|---|---|---|
| Public marketing site | `frontend/app/page.tsx`, `about`, `contact`, `learning`, `solutions`, `saas-products`, `ai-data-intelligence`, `privacy-policy`, `terms-condition` | Home sections use static data in `frontend/data/`. Contact form is **fake** (setTimeout, no request sent). |
| Auth | `backend/src/modules/auth`, `frontend/app/(auth)` | Register/login (email+password, JWT), forgot/reset password (backend only). |
| Marketplace (public) | `frontend/app/marketplace`, `/marketplace/[slug]`; `GET /api/tools`, `/api/categories` | Lists PUBLISHED tools, category filter, search, pagination, detail + pricing plans. |
| Vendor onboarding | `frontend/app/vendor-onboarding`, `POST /api/vendors` | Company details form. |
| Vendor verification | `frontend/app/dashboard/verification`, vendor docs endpoints | Upload GST/PAN/CIN docs → status PENDING_VERIFICATION. **No admin approval flow exists** (see below). |
| Vendor dashboard | `frontend/app/dashboard/*` | Stats, products CRUD, analytics, webhook (API integration) config. |
| Tool management | `backend/src/modules/tool` | Create (DRAFT), edit, publish/unpublish, soft delete, pricing plans. |
| Webhooks | `backend/src/modules/webhook` | Per-tool webhook config, manual test call, logs. No automatic event delivery exists. |
| Uploads | `backend/src/modules/upload`, `jobs/cloudinaryCleanup.ts` | Cloudinary upload; unused files purged hourly after 24h. |

## User roles
Enum `UserRole`: `USER`, `VENDOR`, `ADMIN`, `SUPERADMIN` (`backend/prisma/schema.prisma`).
- Registration `type` "Buyer" → role `USER`; "Vendor" → role `VENDOR`. ADMIN/SUPERADMIN cannot register via API; a SUPERADMIN is created by the seed script.
- Login requires the chosen type to match the account role (a vendor can't log in as Buyer and vice versa).
- **VENDOR**: all `/api/tools` write routes, `/api/vendors` (own profile/stats/docs), `/api/webhooks/*`; the whole `/dashboard`.
- **USER (buyer)**: after login redirected to `/marketplace`. There are no buyer-only features implemented (no purchase, subscribe, review or dashboard).
- **ADMIN / SUPERADMIN**: no working admin features — no admin UI, and the admin-oriented backend modules are not mounted (PROGRESS.md).
- Public (no auth): `GET /api/tools`, `GET /api/tools/:id`, `GET /api/tools/:id/pricing-plans`, `GET /api/categories`, `GET /api/vendors`, `GET /api/vendors/:id`.

## Main workflows
1. **Vendor signup** → `/register` (choose Vendor; client password rules: 8+ chars, upper, number, special; backend requires 8+, lower, upper, digit) → redirected to `/login`.
2. **Vendor login** → `/login` (type Vendor). Client then fetches vendor profile: none → `/vendor-onboarding`, exists → `/dashboard`. (Backend register returns a token too, but the client ignores it and sends the user to login.)
3. **Onboarding** → `/vendor-onboarding` form → `POST /api/vendors` creates vendor with `verification_status = INCOMPLETE`.
4. **Verification** → `/dashboard/verification`: upload GST/PAN/CIN files (`POST /api/upload` then `POST /api/vendors/:id/docs`) → `POST /api/vendors/:id/submit-verification` (needs ≥1 doc) → `PENDING_VERIFICATION`.
5. **Becoming VERIFIED**: no admin endpoint/UI sets this. The only mechanism in code is `PUT /api/vendors/profile` (or `/:id`) which accepts a `verification_status` field from the vendor themself (validator allows it) — i.e. self-approval is technically possible. Treat as a gap/security issue, not an intended design (PROGRESS.md).
6. **Create tool** (`/dashboard/products/new`): requires vendor VERIFIED; tool created as `DRAFT`, then each pricing plan posted to `/api/tools/:id/pricing-plans`. Images uploaded earlier become `USED`.
7. **Publish** → needs ≥1 pricing plan → `PUBLISHED` → visible in marketplace. **Unpublish** → back to `DRAFT`. **Delete** → blocked if ACTIVE subscriptions exist, otherwise soft delete (`isDeleted=true`, status unchanged — see PROGRESS.md bug) and images marked PENDING for cleanup.
8. **Webhook setup** (`/dashboard/api-integration`): one webhook per tool (only PUBLISHED tools offered in UI); can test (POSTs a test payload with `X-Webhook-Secret` header), toggle, delete, view last 50 logs.
9. **Analytics/Dashboard**: all figures come from one endpoint `GET /api/vendors/stats`.
10. **Buyer**: browse/search/filter marketplace, view tool page. Nothing further.

## Business logic worth knowing
- Tool slug = lowercased name with non-alphanumerics → `-`, suffixed with `-<Date.now()>` for uniqueness. The gallery links to `/marketplace/${tool.slug || tool.id}`, but the detail page calls `GET /api/tools/:id` (lookup by id only) — likely 404s for slug links (PROGRESS.md bug, unverified at runtime).
- Pricing models: `FREE | PAID | SUBSCRIPTION`; billing cycles: `MONTHLY | YEARLY | LIFETIME | ONE_TIME`; default currency USD (3-letter code).
- Vendor stats: earnings = SUM of `payments` with status SUCCESS on vendor tools; payouts = SUM of `payouts` COMPLETED; balance = earnings − payouts; users = distinct ACTIVE subscribers. No code creates payments/subscriptions/payouts yet, so these are 0 in practice.
- Passwords hashed with bcrypt (cost 8). JWT payload `{id, role, timezone}`; expiry 30d on register, 90d on login.
- Password reset token: random 32 bytes hex, 1 hour expiry, single use; previous unused tokens invalidated. Response never reveals whether email exists.
