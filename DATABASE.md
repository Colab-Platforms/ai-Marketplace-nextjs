# DATABASE.md

**Technology:** PostgreSQL via Prisma 7.5 (`provider = "prisma-client-js"`, driver adapter `@prisma/adapter-pg`). Connection string from `DATABASE_URL` (`backend/prisma.config.ts`, `backend/prisma.ts`). Source of truth: `backend/prisma/schema.prisma`. `prisma/proj.prisma` is a fully commented-out legacy schema — ignore it.

IDs are `String @id @default(cuid())` everywhere. Model names are snake_case plural (client accessor e.g. `prisma.tools`). Most "enum-like" columns are plain `String` (not DB enums) — values below come from code, not constraints.

## Migrations (`backend/prisma/migrations/`)
1. `20260226122632_add_phase1_models` — original schema (PascalCase tables: User, Company, Tool, Lead, …).
2. `20260227101035_add_logo_url_to_company` — adds a logo column to old Company table.
3. `20260606072354_update_schema` — **drops** the old tables (Company, Demo, Lead, Notification, Proposal, RM, Role, ShortlistTool, Tool, User, UserRole, VendorShortlist …) and creates the current marketplace schema (~21 tables).
Consequence: backend code for `company`, `notification`, `ticket`, `subscription`(old shape), `user`, `settings` was written against the old schema and **does not match current models** (PROGRESS.md). Note: `schema.prisma` currently has no `tickets`/`leads`/`proposals`/`platformSetting`/`notification`(singular)/`company`/`role` models.

## Enums (Prisma)
- `UserRole`: USER, VENDOR, ADMIN, SUPERADMIN
- `AuthProvider`: LOCAL, GOOGLE (GOOGLE login is not implemented in code)

## Models
Legend: `?` nullable · **U** unique · **I** index.

### users
`id`, `firstName`, `lastName`, `name`, `email` **U**, `phone_number?` **U**, `avatar_url?`, `role UserRole=USER`, `password?` (bcrypt), `authProvider=LOCAL`, `googleId?` **U**, `emailVerificationOtpHash?`, `emailVerificationOtpExpiresAt?`, `passwordResetOtpHash?`, `passwordResetOtpExpiresAt?` (the four OTP fields are unused by code), `isGuideTaken=false`, `isActive=true`, `isVerified=false` (registration sets `true`), `isDeleted=false`, `timezone="Asia/Kolkata"`, `last_login_at?`, `deletedAt?`, `created_at`, `updated_at`.
Relations: sessions (user_sessions[]), passwordResetTokens, vendor (vendors? 1:1), subscriptions, payments, tool_access, reviews, notifications.
Soft delete via `isDeleted` — auth queries filter `isDeleted:false`.

### vendors
`id`, `owner_user_id` **U** (→ users, 1:1), `company_name`, `brand_name?`, `company_type?`, `gstNumber?` **U**, `registaration_number?` **U** (CIN; sic spelling), `pan_number?` **U**, `registered_address?`, `date_of_incorporation?`, `website_url?`, `description?`, `country?`, `state?`, `city?`, `verification_status String` (values used: `INCOMPLETE`, `PENDING_VERIFICATION`, `VERIFIED`; frontend also maps `REJECTED`), `created_at`, `updated_at`.
Relations: owner (users), tools, payouts, vendor_docs.

### vendor_docs
`id`, `vendor_id` → vendors, `doc_type String` (UI uses "GST Certificate"-style labels, "PAN Card", "CIN / Registration Certificate"), `doc_url`, `verification_status String` (set to `PENDING` on create), timestamps.

### user_sessions
`id`, `user_id` → users, `refresh_token`, `expires_at`, `created_at`. **Unused** (JWT only, no refresh flow).

### passwordResetToken
`id`, `user_id` → users, `token` **U**, `expires_at`, `used=false`, `created_at`. Index `[user_id, used]`. (Model name is camelCase, accessor `prisma.passwordResetToken`.)

### categories
`id`, `name`, `slug` **U**, `created_at`. 1:N tools. Seeded with 20 categories (`prisma/seeds/categories.seed.ts`: Content Generation … Social Media). Note `name` is not unique.

### tags / tool_tags
`tags(id, name, slug U)`; `tool_tags(id, tool_id, tag_id, @@unique[tool_id,tag_id])`. **Unused by code.**

### tools
`id`, `vendor_id` → vendors, `category_id` → categories, `name`, `slug` **U** (`<slugified-name>-<Date.now()>`), `short_description?`, `full_description?`, `logo_url?`, `website_url?`, `demo_url?`, `pricing_model` (FREE | PAID | SUBSCRIPTION), `status` (DRAFT | PUBLISHED), `average_rating? Float`, `total_reviews=0`, `total_views=0`, `total_launches=0` (nothing increments these), `isDeleted=false`, `created_at`, `updated_at`.
Relations: images, tool_tags, pricing_plans, subscriptions, vendor_webhooks, webhook_logs, tool_access, reviews.

### tool_images
`id`, `tool_id` → tools, `image_url`, `created_at`.

### pricing_plans
`id`, `tool_id` → tools, `name`, `description?`, `billing_cycle` (MONTHLY | YEARLY | LIFETIME | ONE_TIME), `price Float`, `currency` (3-letter; Joi default "USD"), `trial_days? Int`, `is_active=true`, timestamps. Relations: plan_features, subscriptions.

### plan_features
`id`, `plan_id` → pricing_plans, `feature_name`.

### subscriptions
`id`, `user_id`, `tool_id`, `plan_id`, `status String` (code reads `ACTIVE`), `start_date`, `end_date?`, `auto_renew=false`, `created_at`. Index `[user_id, tool_id]`. Relations: payments, tool_access, events (subscription_events). **No code path creates subscriptions.**

### payments
`id`, `user_id`, `subscription_id`, `amount Float`, `currency`, `payment_gateway`, `gateway_transaction_id` **U**, `status` (code reads `SUCCESS`), `paid_at?`; 1:1 optional invoice. **No code creates payments; no payment gateway integrated.**

### invoices
`id`, `payment_id` **U** → payments, `invoice_number` **U**, `invoice_url`, `created_at`. Unused.

### payouts
`id`, `vendor_id` → vendors, `amount Float`, `status` (code reads `COMPLETED`), `payout_reference?`, `created_at`. Read by vendor stats only.

### vendor_webhooks
`id`, `tool_id` → tools, `webhook_url`, `webhook_secret` (**stored in plaintext**), `is_active=true`, `created_at`. Business rule (service-level, not DB): one webhook per tool (`tool_id` is not unique in schema).

### webhook_logs
`id`, `tool_id` → tools, `event_type` (only `test` written), `request_payload String`, `response_payload? String`, `response_code? Int`, `status` (SUCCESS | FAILED), `created_at`.

### tool_access
`id`, `user_id`, `tool_id`, `subscription_id`, `external_user_id?`, `launch_url?`, `status`, `created_at`. Unused.

### subscription_events
`id`, `subscription_id`, `event_type`, `payload?`, `created_at`. Unused.

### reviews
`id`, `user_id`, `tool_id`, `rating Int`, `title?`, `review?`, `created_at`, `@@unique[user_id, tool_id]`. Unused.

### notifications
`id`, `user_id`, `title`, `body`, `type`, `is_read=false`, `created_at`. Unused (the `notification` module targets a different, old model).

### uploaded_files
`id`, `public_id` **U**, `url` **U**, `status` (`PENDING` on upload → `USED` when attached to a tool/doc → back to `PENDING` on tool delete), timestamps. Hourly cron deletes PENDING rows older than 24h (and the Cloudinary asset).

## Relationship summary
users 1—1 vendors 1—N tools 1—N pricing_plans 1—N plan_features; tools N—1 categories; tools 1—N tool_images / vendor_webhooks / webhook_logs; users 1—N subscriptions → payments → invoices; vendors 1—N vendor_docs / payouts. No `onDelete` rules are declared (Prisma default = restrict for required relations), so deleting a vendor with tools/docs fails at the DB level (`DELETE /api/vendors/:id` hard-deletes).

## Seeds (`npm run db:seed`)
`seeds/index.ts` runs `seedSuperAdmin` (upserts a SUPERADMIN user; credentials are hard-coded in `superAdmin.seed.ts` — not repeated here) and `seedCategories`. `roles.seed.ts` is a no-op (not called).
