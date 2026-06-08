# AI Marketplace Server

Backend skeleton for the AI Marketplace project.

## Setup

1. `cd server`
2. `npm install`
3. Create a `.env` file from `.env.example`
4. `npm run dev`

> Uses PostgreSQL via Prisma. Set `DATABASE_URL` in `.env`.

## Project structure

- `src/`
  - `modules/` - feature domains and routers
  - `prisma/` - Prisma schema and client initialization
  - `jobs/` - background jobs and scheduled tasks
  - `middleware/` - request guards and policies
  - `shared/` - logger, error handling, constants, utils
  - `config/` - environment and app configuration
