# CLAUDE.md — AI Marketplace (Avatar India)

Monorepo for a B2B AI-tools marketplace. Vendors list AI tools with pricing plans; buyers browse them. Only the **vendor side + public browsing** is implemented (see PROGRESS.md).

- `frontend/` — Next.js 16 / React 19 / Tailwind 4 frontend (port 3000)
- `backend/` — Express 5 / Prisma 7 / PostgreSQL API (port 5000), ESM TypeScript

## Read before changing anything
Read only what is relevant to the task:

| Doc | Read when |
|---|---|
| [PROJECT.md](PROJECT.md) | business purpose, roles, workflows |
| [ARCHITECTURE.md](ARCHITECTURE.md) | stack, folder layout, state, data flow |
| [DATABASE.md](DATABASE.md) | touching Prisma schema or queries |
| [API_DOCUMENTATION.md](API_DOCUMENTATION.md) | touching endpoints or client services |
| [PROGRESS.md](PROGRESS.md) | status, known bugs, orphaned code — **check before assuming a feature works** |

`frontend/AGENTS.md` warns that this Next.js version has breaking changes: read the relevant guide in `frontend/node_modules/next/dist/docs/` before writing Next.js code.

`README.md` (root) and `frontend/*.md` (QUICK_START, DEPLOYMENT, CONVERSION_NOTES) are **outdated/partly wrong** (e.g. claim Next 14, "Production Ready", files that don't exist). Trust these docs and the code instead.

## Commands
Backend (`cd backend`): `npm run dev` (tsx watch) · `npm run build` (prisma generate + tsc + tsc-alias) · `npm run type-check` · `npm run db:migrate` · `npm run db:seed` · `npm run db:studio`
Client (`cd frontend`): `npm run dev` · `npm run build` · `npm run lint`

## Testing
There is **no automated test suite** (no jest/vitest/playwright). Verification = `npm run type-check` (backend), `npm run lint` / `npm run build` (client), and manual requests via `backend/test/*.http` (REST Client format). Run the relevant checks after changes and report honestly if you couldn't.

## Conventions (observed in code)
- Backend modules: `backend/src/modules/<name>/{route,controller,service,types,validators}.ts`. Routes → controller (Joi validation, `sendResponse`) → service class (Prisma, throws `ApiError`).
- Imports use aliases `@/` (= `backend/src`) and `@root/` (= `backend/`) with `.js` extensions (ESM).
- Response envelope: `{ status: boolean, data, message }` via `sendResponse`.
- Auth: `auth("ROLE", ...)` middleware; ADMIN implies SUPERADMIN.
- DB tables are snake_case plural (`tools`, `vendors`); IDs are cuid strings.
- Client: App Router pages in `frontend/app`, API calls only through `frontend/services/*` or `frontend/lib/*` using `lib/api.ts` axios instance; auth state in Redux (`redux/slices/authSlice.ts`); server data via TanStack Query on marketplace pages.
- New mountable backend routes must be registered in `backend/src/routes.ts`.

## Critical restrictions
- Documentation/task scope only: no unrelated changes, no needless rewrites of working code.
- Never write secrets, API keys or credentials into docs or code. Document env var **names** only.
- Never touch production databases/config. Don't run `prisma migrate deploy`/`db:seed` against a non-local DB.
- Do **not** commit, push or deploy unless the user explicitly says so.
- Don't create duplicate docs; update the existing ones.
- Don't assume unfinished features work — many backend modules are orphaned (not mounted, reference missing Prisma models). See PROGRESS.md.

## Documentation upkeep (required)
After finishing any feature or fix: update the relevant doc(s) so they match the code; update PROGRESS.md whenever status changes; never mark something complete without verifying it in code (and, where possible, by running it).
