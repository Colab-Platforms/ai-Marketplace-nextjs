# API_DOCUMENTATION.md

Base URL: `http://localhost:5000` (client reads `NEXT_PUBLIC_API_BASE_URL`). All mounted routes live under `/api` (`backend/src/routes.ts`). Manual request samples: `backend/test/*.http`.

## Conventions
- **Envelope** (`utils/responseUtils.ts`): `{ "status": boolean, "data": <any>, "message": string }`. On validation errors `data` is the Joi error object; on service errors `data` is `null`. Exception: `/api/categories` uses `{ "success": boolean, "data", "message" }`.
- **Auth**: `Authorization: Bearer <JWT>`. JWT payload `{id, role, timezone}` signed with `JWT_SECRET`. Roles listed per route; ADMIN also admits SUPERADMIN. Role is trusted from the token.
- **Pagination** (tools & vendors lists): query `page` (default 1), `pageSize` (default 10, max 100). Result inside `data`: `{ currentPage, pageSize, totalRecords, totalPages, hasNextPage, hasPreviousPage, data: [...] }`.
- **Errors**: `ApiError(message, statusCode)` → `{status:false, data:null, message}` with codes 400/401/403/404/409/422/500 (`utils/statusCodes.ts`). Unknown routes → `notFoundHandler`. Global `errorHandler` catches anything uncaught (responds with the error object in `data`). Invalid/expired token → 401 "Invalid or expired token"; wrong role → 403.
- Request strings are XSS-sanitized globally (`xss` lib) — body, query and params.
- CORS: allowlist in `backend/src/index.ts`; methods GET/POST/PUT/DELETE/PATCH/OPTIONS.

## Health
| Method | Path | Auth | Response |
|---|---|---|---|
| GET | `/api/health` | none | `{status:"ok", message:"Server is healthy"}` (note: raw object, not the envelope) |

## Auth — `modules/auth`
| Method | Path | Auth | Body |
|---|---|---|---|
| POST | `/api/auth/register` | none | `firstName`, `lastName`, `email`, `password` (≥8, upper+lower+digit), `confirmPassword`, `phone_number?`, `type`: `"Buyer"\|"Vendor"` → 201 `{user, token, message}`; 409 if email exists |
| POST | `/api/auth/login` | none | `email`, `password`, `type` → 200 `{user (no password), token}`; 401 for unknown email / wrong password / type≠account role |
| POST | `/api/auth/forgot-password` | none | `email` → always 200 generic message; emails a link `FRONTEND_URL/auth/reset-password?token=…` (**no such client route exists**) |
| POST | `/api/auth/reset-password` | none | `token`, `password` → 400 if invalid/used/expired |
Notes: there is no logout endpoint (client just clears localStorage), no refresh-token flow, no email verification flow (`isVerified` set true on register).

## Categories — `modules/category/category.route.ts`
| GET | `/api/categories` | none | all categories ordered by name |
| POST | `/api/categories` | **none (unauthenticated!)** | `{name}` → creates with generated slug; errors → 500 |

## Tools — `modules/tool`
| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | `/api/tools` | none | Published tools only. Query: `category_id`, `search` (name/short_description, case-insensitive), `page`, `pageSize`. Does **not** filter `isDeleted`. |
| GET | `/api/tools/my/list` | VENDOR | Own tools (`isDeleted:false`); query `status` (DRAFT/PUBLISHED), paging. Auto-creates an INCOMPLETE vendor row if the user has none. |
| POST | `/api/tools` | VENDOR | Requires vendor `VERIFIED`. Body: `name`, `category_id`, `pricing_model` (FREE\|PAID\|SUBSCRIPTION) required; `short_description`, `full_description`, `logo_url`, `website_url`, `demo_url` (URIs), `images[]` (URIs). Creates DRAFT, marks uploaded files USED. 201. |
| GET | `/api/tools/:id` | none | Any tool by id incl. DRAFT/deleted (no status/isDeleted check). Includes vendor, category, images, pricing_plans. |
| PUT | `/api/tools/:id` | VENDOR (owner) | Same fields, all optional; syncs images (adds/removes). |
| DELETE | `/api/tools/:id` | VENDOR (owner) | 400 if ACTIVE subscriptions; else soft delete. |
| POST | `/api/tools/:id/publish` | VENDOR (owner) | 400 if no pricing plan. → PUBLISHED |
| POST | `/api/tools/:id/unpublish` | VENDOR (owner) | → DRAFT |
| POST | `/api/tools/:id/pricing-plans` | VENDOR (owner) | `name`, `billing_cycle` (MONTHLY\|YEARLY\|LIFETIME\|ONE_TIME), `price` ≥0 required; `description`, `currency` (3 chars, default USD), `trial_days`, `features[]`. 201 |
| GET | `/api/tools/:id/pricing-plans` | none | Plans (with features) for tool |

## Vendors — `modules/vendor`
| Method | Path | Auth | Notes |
|---|---|---|---|
| POST | `/api/vendors` | VENDOR | Create profile (`company_name` required; other fields optional). 409 if profile already exists (any status). Status set INCOMPLETE. 201 |
| GET | `/api/vendors` | none | Paginated list of all vendors incl. GST/PAN/CIN fields |
| GET | `/api/vendors/profile` (alias `/me`) | VENDOR | Own profile; 404 "Vendor profile not found" if none |
| PUT | `/api/vendors/profile` | VENDOR | Update own profile. Validator **accepts `verification_status`** from the caller |
| GET | `/api/vendors/stats` | VENDOR | `{totalProducts, publishedProducts, unpublishedProducts, totalUsers, vendorBalance, totalEarnings, totalPayouts, last30DaysSubscriptions, totalViews, verification_status}` |
| GET | `/api/vendors/:id` | none | Public vendor by id (includes tax IDs) |
| GET | `/api/vendors/owner/:ownerId` | VENDOR | No ownership check |
| PUT | `/api/vendors/:id` | VENDOR | **No ownership check**; accepts `verification_status` |
| DELETE | `/api/vendors/:id` | VENDOR | **No ownership check**; hard delete |
| POST | `/api/vendors/:id/docs` | VENDOR | `{doc_type, doc_url (URI)}` → doc PENDING, marks upload USED. No ownership check |
| GET | `/api/vendors/:id/docs` | VENDOR | List docs. No ownership check |
| POST | `/api/vendors/:id/submit-verification` | VENDOR | 400 if 0 docs; sets `PENDING_VERIFICATION`. No ownership check |

## Webhooks — `modules/webhook` (all VENDOR; ownership checked via tool→vendor→owner)
| Method | Path | Notes |
|---|---|---|
| POST | `/api/webhooks` | `{tool_id, webhook_url (URI), webhook_secret}`; 409 if tool already has one; 201 |
| GET | `/api/webhooks` | All webhooks for the vendor's tools (secret not returned) |
| GET | `/api/webhooks/tool/:toolId` | Webhook for a tool; 404 if none |
| GET | `/api/webhooks/tool/:toolId/logs` | Last 50 logs, newest first |
| PUT | `/api/webhooks/:id` | `webhook_url?`, `webhook_secret?`, `is_active?` |
| DELETE | `/api/webhooks/:id` | |
| POST | `/api/webhooks/:id/test` | POSTs `{event_type:"test", timestamp, data:{message, tool_id, tool_name}}` to the URL with header `X-Webhook-Secret`, 10 s timeout; writes a `webhook_logs` row (SUCCESS/FAILED); 400 on failure. **Server-side request to a vendor-supplied URL (SSRF risk, no host restrictions)** |

## Upload — `modules/upload`
| POST | `/api/upload` | any authenticated role | multipart field `file` (≤5 MB, memory storage), optional `folder` (default `ai-marketplace`). Uploads to Cloudinary (`resource_type: auto`), stores PENDING `uploaded_files` row. Returns Cloudinary result incl. `url`, `public_id`. No file-type restriction. |

## External integrations
- **Cloudinary** — `utils/cloudinary.ts` (`upload_stream`; destroy in cron job). Falls back to a fake placeholder URL when credentials are missing.
- **Resend** — `utils/mailer.ts` `sendPasswordResetEmail`.
- **Vendor webhooks** — outbound HTTP via axios (test calls only).
- **Client-side only**: Meta Pixel script (id hard-coded in `frontend/app/layout.tsx`).
- Twilio / Google OAuth: dependency/enum exist but no implementation.

## NOT mounted (code exists, unreachable — do not document as working)
`backend/src/modules/{user,company,notification,settings,subscription}` routers and `ticket/ticket.route.ts` are never imported in `routes.ts`, and their services/controllers reference Prisma models that do not exist in the current schema (`prisma.user`, `company`, `notification`, `subscription`, `ticket`, `lead`, `proposal`, `platformSetting`, `role`), so they would not compile/run as-is. Their intended paths (not live) would be `/api/users`, `/companies`, `/notifications`, `/settings`, `/subscriptions`, `/tickets`. See PROGRESS.md.

## Client service map
`frontend/services/tool.service.ts` (`toolService`, `uploadService`, `categoryService`), `frontend/services/vendor.service.ts` (`vendorService`), `frontend/services/webhook.service.ts` (`webhookService`), `frontend/lib/verification.ts` (vendor profile/doc helpers), `frontend/redux/slices/authSlice.ts` (login/register thunks → `/api/auth/*`). `frontend/` never calls forgot/reset-password.
