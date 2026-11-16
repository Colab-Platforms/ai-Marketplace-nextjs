# PROGRESS.md

Status as of 2026-11-16, based on static code inspection only. **Nothing was run** (no `node_modules` installed, no DB, no `.env`), so "implemented" means "code exists and is wired end-to-end on paper", not "tested". Update this file whenever status changes.

## Implemented (code present and wired)
- Auth: register / login (Buyer vs Vendor type), JWT, forgot/reset password endpoints (backend) — `backend/src/modules/auth`.
- Client login & register pages with Redux auth state and localStorage persistence; role-based redirect (vendor → onboarding/dashboard, buyer → marketplace).
- Vendor onboarding (create profile) and document-upload verification submit (→ PENDING_VERIFICATION).
- Tool CRUD for vendors: create (DRAFT, requires VERIFIED vendor), edit, publish (needs ≥1 plan), unpublish, soft delete; pricing plans with features.
- Vendor dashboard pages: overview, products list/new/edit, analytics, API integration (webhooks), verification.
- Webhook config per tool: create/list/update/toggle/delete, manual test call, last-50 logs.
- Cloudinary uploads + PENDING/USED tracking + hourly cleanup cron.
- Public marketplace: category list, tool grid with search/category/pagination, tool detail page with pricing plans.
- Static marketing site (home, about, contact UI, privacy policy, terms).
- Seeds: SUPERADMIN user + 20 categories.

## Partially implemented / stubbed
- **Vendor verification**: vendors can submit docs, but **no admin review/approve/reject exists** (no endpoint, no UI). `VERIFIED` is only reachable by the vendor sending `verification_status` to `PUT /api/vendors/profile` (allowed by `updateVendorSchema`). `frontend/lib/verification.ts#updateVendorStatus` does exactly this. A comment in `vendor.service.ts` shows an `autoApproveVendor` helper that was commented out.
- **Webhooks**: only manual "test" events; no real events (subscription created, etc.) are ever dispatched.
- **Analytics/earnings**: stats endpoint works on `payments`/`subscriptions`/`payouts` tables, but nothing writes to them, so values are 0. `total_views` / `total_launches` are never incremented.
- **Contact form** (`frontend/app/contact/page.tsx`): UI only; `handleSubmit` just waits 1 s and shows success — no request is sent.
- **Marketing section pages** (`/learning`, `/solutions`, `/saas-products`, `/ai-data-intelligence`): thin wrappers around `components/sections/*`; content depth not verified.
- **Backend modules not mounted** in `routes.ts`: `user`, `company`, `notification`, `settings`, `subscription`, `ticket` — written for the pre-2026-06 schema (see DATABASE.md); reference nonexistent Prisma models; would not run. Treat as dead/legacy unless deliberately revived and ported.
- `backend/scripts/*.ts` also target the old schema (leads, RM, tickets) — likely stale.
- `frontend/data/marketplace.ts` (static tools/categories) is not imported by any `.tsx` file — dead data; marketplace pages use the API.

## Not implemented
- Buyer features: subscribe/purchase, checkout, payment gateway, invoices, reviews/ratings, tool access/launch, buyer dashboard, notifications.
- Admin/SUPERADMIN panel and any admin API (vendor approval, user management, category management).
- Forgot/reset password **UI** (emailed link points to `/auth/reset-password`, which does not exist in `frontend/app`; the "Forgot password?" link on `/login` is `href="#"`).
- Email verification, Google login (`AuthProvider.GOOGLE`, `googleId` unused), refresh tokens/sessions, logout endpoint.
- Tags (models exist, unused), vendor payouts, Twilio/SMS.
- Automated tests, CI/CD, Docker, logging usage (`utils/logger.ts` unused).

## Known bugs / security issues (found by reading code; not runtime-verified)
1. **Vendor self-verification / no ownership checks**: `PUT/DELETE /api/vendors/:id`, `/:id/docs`, `/:id/submit-verification`, `/owner/:ownerId` only require role VENDOR — any vendor can read/modify/delete another vendor's record, and set their own `verification_status`.
2. **Unauthenticated `POST /api/categories`** — anyone can create categories.
3. **Public `GET /api/vendors` and `/:id`** expose GST, PAN, CIN, address of every vendor.
4. **Deleted tools stay public**: `deleteTool` sets `isDeleted=true` but leaves `status=PUBLISHED`; `getAllTools` and `getToolById` don't filter `isDeleted` (and `getToolById` doesn't check status, so DRAFTs are readable by id too). Their images are queued for Cloudinary cleanup, so listings would show broken images.
5. **Marketplace detail link mismatch**: gallery links to `/marketplace/${tool.slug || tool.id}` but `/marketplace/[slug]/page.tsx` calls `GET /api/tools/:id` (lookup by id only) → slug links probably 404.
6. **Webhook test SSRF**: server POSTs to any vendor-supplied URL, no allow/deny list.
7. **Webhook secret stored in plaintext** (`vendor_webhooks.webhook_secret`).
8. **Upload**: any authenticated user, any file type up to 5 MB, `resource_type: auto`.
9. **Secrets hygiene**: `backend/.env.example` contains a value that looks like a real `CLOUDINARY_API_KEY` (not an obvious placeholder) — consider rotating/replacing it. `backend/prisma/seeds/superAdmin.seed.ts` hard-codes a SUPERADMIN email and password in the repo — change before any shared/production DB seed.
10. **Mailer fails hard at import** if `RESEND_API_KEY`/`SMTP_FROM_EMAIL` are unset → backend can't boot without them (not mentioned in README).
11. **JWT** is trusted without DB check (deactivated/deleted users stay valid up to 30/90 days); 401 on client clears localStorage but not Redux state / no redirect.
12. **Password rules mismatch**: client requires a special character; backend doesn't.
13. Login error messages reveal whether an email exists ("No account found with this email").
14. `categories.name` not unique; `vendor_webhooks.tool_id` not unique (one-per-tool enforced only in service); no `onDelete` rules.
15. Docs drift: root `README.md` says Next 14/React 18, "Production Ready", "Joi/axios…", lists docs that don't exist (`VENDOR_DASHBOARD_COMPLETE.md`, `DEVELOPER_QUICK_START.md`, `backend/API_DOCUMENTATION.md`), and lists a `POST /api/auth/logout` that doesn't exist. `frontend/{README,QUICK_START,DEPLOYMENT,CONVERSION_NOTES}.md` are generic/legacy.
16. `backend/src/utils/mailer.ts` and `index.ts` use `console.log` for operational logging, including email addresses.

## Technical debt
- No tests; no lint config for backend; `any` used widely (`vendorService.createProfile(data: any)` etc.).
- Dead code: `proj.prisma`, unmounted modules, unused models, commented-out routes (`/vendor`, `autoApproveVendor`), `roles.seed.ts`.
- Mixed response envelopes (`status` vs `success`).
- Duplicate Vendor API helpers: `frontend/lib/verification.ts` and `frontend/services/vendor.service.ts` overlap.
- Repo root contains stray assets (`Aavtat logo.svg`, `bannerimages/`) duplicated in `frontend/public/`.

## Current status & pending work
Current state: vendor-side MVP + public browsing + marketing site. Highest-value next steps (suggested, not decided): (1) admin approval flow and lock down vendor ownership/`verification_status`; (2) fix deleted-tool visibility and slug/id mismatch; (3) forgot/reset-password UI; (4) buyer subscribe/payment flow that populates `subscriptions`/`payments` and fires webhooks; (5) decide fate of unmounted legacy modules (port to current schema or delete); (6) add tests; (7) refresh README.

## Things that could not be verified
Runtime behaviour of any feature; whether the 3 migrations match a live DB; type-check/build status; production hosting/env; content of `components/sections/*` and some home/about components beyond skim; whether legacy `backend/scripts` run.
