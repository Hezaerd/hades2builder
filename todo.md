# Hades II Build Planner - Development Roadmap

## Project Overview
A webapp for Hades II players to plan, share, and discuss builds with anonymous build creation and authenticated user features for discussions and collections.

## Tech Stack
- **Frontend**: Next.js 15, React 19, Tailwind CSS, shadcn/ui
- **Backend**: Prisma ORM
- **Database**: Self-hosted PostgreSQL (VPS) ✅
- **Authentication**: better-auth
- **Validation**: Zod (v4)
- **Package Manager**: Bun

---

## Guiding Principles
- **Security-first** (auth, input validation, least privilege)
- **Performance** (DB indexes, caching, lazy loading)
- **Accessibility** (a11y in UI and interactions)
- **Observability** (logs, metrics, error tracking)
- **Incremental delivery** (feature flags and migrations)

---

## Phase 1: Project Foundation & Setup

### Goals
- Baseline Next.js app with Bun, Tailwind, shadcn/ui, Prisma.
- Environments configured with secrets management and logging.

### Tasks
- [x] Install PostgreSQL on VPS (Docker recommended)
- [x] Configure PostgreSQL for production use, SSL, backups, monitoring
- [x] Install and configure Prisma with PostgreSQL
- [x] Install better-auth and initial configuration
- [x] Set up environment variables (.env, .env.local, .env.production)
- [x] Set up database migrations
- [ ] Create proper folder structure for components, pages, and services
- [ ] Configure shadcn/ui components registry
- [ ] Configure TypeScript paths and imports (e.g. `@/lib`, `@/components`)
- [ ] Set up global error handling (API and UI), logging (`src/lib/logger.ts`)
- [ ] Define environment schema using Zod in `src/lib/env.ts` and fail-fast on boot
- [ ] Establish code style and lint (Biome config is present — enforce in CI)

### Dependencies
- None

### Acceptance Criteria
- `bun dev` runs locally with no type errors.
- Can connect to DB and run `bunx prisma migrate dev`.
- shadcn/ui registry is configured and a sample component renders.
- Zod validated `env` throws on missing/invalid vars.

---

## Phase 2: Core Data Models & Database

### Goals
- Define all core models and relations.
- Prepare seed for game data (weapons, boons, aspects).

### Tasks
- [ ] Design User model (authenticated users)
- [ ] Design AnonymousUser model (for anonymous builds)
- [ ] Design Build model (core build data)
- [ ] Design Weapon model (Hades II weapons)
- [ ] Design Boon model (gods' boons and abilities)
- [ ] Design Aspect model (weapon aspects)
- [ ] Design BuildItem model (items in builds)
- [ ] Design Comment model (build discussions)
- [ ] Design Collection model (user collections)
- [ ] Design CollectionItem model (builds in collections)
- [ ] Create Prisma schema with all models and relationships
- [ ] Create database migrations
- [ ] Seed database with Hades II game data (weapons, boons, aspects)
- [ ] Add required indexes and unique constraints

### Dependencies
- Phase 1

### Acceptance Criteria
- Prisma schema compiles; migrations run cleanly on new DB.
- Seed script populates game data idempotently.
- Queries for list of weapons/boons/aspects are performant (<100ms local).

---

## Phase 3: Authentication System

### Goals
- Enable session-based auth with better-auth.
- Provide anonymous flows alongside authenticated usage.

### Tasks
- [ ] Configure better-auth with PostgreSQL adapter/tables
- [ ] Set up authentication providers (email/password; optional OAuth)
- [ ] Create authentication middleware and protected route helper
- [ ] Set up session management and secure cookie settings
- [ ] Configure anonymous user handling (ephemeral or persisted per device)
- [ ] Add auth client helpers in `src/lib/auth-client.ts`
- [ ] Add basic login/signup/logout UI using shadcn components

### Dependencies
- Phase 2

### Acceptance Criteria
- Users can sign up, sign in, sign out; sessions persist correctly.
- Anonymous users can create builds without registration.
- Protected API routes reject unauthenticated requests.

---

## Phase 4: Core Build System

### Goals
- CRUD for builds supporting anonymous and authenticated users.
- Validation, sharing, and ownership controls.

### Tasks
- [ ] Create services for build operations (create/read/update/delete)
- [ ] Implement build creation (anonymous and authenticated)
- [ ] Implement build reading and Zod validation for payloads
- [ ] Implement build updating and deletion with permission checks
- [ ] Create build sharing functionality (public URL, slug/ID)
- [ ] Add list endpoints with pagination/sorting
- [ ] Add soft-deletes and auditing fields where needed

### Dependencies
- Phase 3

### Acceptance Criteria
- Authenticated and anonymous users can create and share builds.
- Validation rejects invalid payloads with helpful errors.
- Ownership enforced; unauthorized edits blocked.

---

## Phase 5: Game Data Integration

### Goals
- Read-only services and UI support for game reference data.

### Tasks
- [ ] Create services for game data (weapons, boons, aspects)
- [ ] Implement weapon data fetching
- [ ] Implement boon data fetching
- [ ] Implement aspect data fetching
- [ ] Add caching (in-memory) and basic invalidation on seed changes
- [ ] Add Zod schemas for game data responses

### Dependencies
- Phase 2

### Acceptance Criteria
- API returns consistent data for weapons/boons/aspects.
- Data validated via Zod; type-safe usage in UI.

---

## Phase 6: Build Planning Interface

### Goals
- Interactive build editor with validation and import/export.

### Tasks
- [ ] Create drag-and-drop build planner (keyboard-accessible)
- [ ] Implement build validation logic (constraints/synergies baseline)
- [ ] Create build simulation/preview (stats, effects overview)
- [ ] Implement build export/import (JSON share code)
- [ ] Create build comparison tool (diff and score)

### Dependencies
- Phase 4, 5

### Acceptance Criteria
- Planner prevents invalid combinations and clearly explains errors.
- Import/export round-trips produce identical builds.
- Comparison highlights differences succinctly.

---

## Phase 7: Social Features

### Goals
- Discovery and discussion for builds.

### Tasks
- [ ] Create public build gallery
- [ ] Implement build search and filtering (weapon, boons, tags, rating)
- [ ] Create build rating system (1–5; spam-protected)
- [ ] Implement build categories and tags
- [ ] Create trending builds section (time-decay rank)
- [ ] Create comment system for builds (threads, mentions)
- [ ] Implement comment moderation (report, hide, rate-limit)
- [ ] Create notification system (in-app, email optional)

### Dependencies
- Phase 4, 6

### Acceptance Criteria
- Users can browse, search, filter, and discuss builds.
- Moderation tools available to admin role.
- Abuse mitigations: rate limits, basic spam checks.

---

## Phase 8: User Collections & Profiles

### Goals
- Personalization and curation.

### Tasks
- [ ] Create user collection management (create, reorder, share)
- [ ] Implement collection sharing (public/private)
- [ ] Create collection templates
- [ ] Implement collection search
- [ ] Create collection statistics
- [ ] Create user profile pages (bio, links, stats)
- [ ] Implement user preferences

### Dependencies
- Phase 7

### Acceptance Criteria
- Collections support add/remove/reorder; permissions enforced.
- Profiles display public activity and aggregate stats.

---

## Phase 9: Advanced Features

### Goals
- Analytics and community features for growth.

### Tasks
- [ ] Implement build usage analytics (views, saves, ratings)
- [ ] Create build performance metrics
- [ ] Implement user behavior tracking (privacy-respecting)
- [ ] Create admin dashboard (metrics, moderation)
- [ ] Implement data export features (user data portability)
- [ ] Create user following system
- [ ] Implement build collaboration
- [ ] Create community challenges and contests
- [ ] Create community guidelines

### Dependencies
- Phase 7, 8

### Acceptance Criteria
- Admin dashboard shows key DAU/MAU, builds created, top builds.
- Users can export their data in machine-readable format.

---

## Phase 10: Performance & Optimization

### Goals
- Ship fast and efficient experiences.

### Tasks
- [ ] Implement code splitting and lazy loading
- [ ] Optimize database queries (N+1 avoidance, indexes)
- [ ] Implement caching strategies (per-route revalidation)
- [ ] Optimize bundle size (analyze, trim deps)
- [ ] Implement image optimization (Next Image, CDN)
- [ ] Introduce cold-path prefetching where appropriate

### Dependencies
- Ongoing

### Acceptance Criteria
- Core pages <2.5s LCP on 3G Fast; TTI <3s baseline.
- P95 API latencies documented; slow queries addressed.

---

## Phase 11: Testing & Quality Assurance

### Goals
- Confidence in changes via automated tests and CI.

### Tasks
- [ ] Set up unit testing with Vitest
- [ ] Set up integration testing
- [ ] Set up E2E testing with Playwright
- [ ] Create test data fixtures and factories
- [ ] Implement CI/CD pipeline (lint, typecheck, test, build)
- [ ] Add error monitoring (Sentry or similar)
- [ ] Add performance monitoring (web vitals, server metrics)
- [ ] Implement security auditing (dependency scans)

### Dependencies
- Phase 1–10 as coverage expands

### Acceptance Criteria
- CI green on PR: lint, types, tests, build.
- E2E suite covers critical auth and build flows.

---

## Phase 12: Deployment & Production

### Goals
- Reliable delivery and runtime operations.

### Tasks
- [ ] Configure production environment (secrets, env, scaling)
- [ ] Set up CDN and asset optimization
- [ ] Configure monitoring and logging (structured logs)
- [ ] Set up backup strategies and restore playbook
- [ ] Implement security measures (CSP, rate limit, headers)
- [ ] Feature flags for risky changes
- [ ] Create rollback strategies (migrations + app)

### Dependencies
- Phase 1, 11

### Acceptance Criteria
- One-command deploy; automated rollback procedure documented.
- RTO/RPO targets defined and validated.

---

## Phase 13: Post-Launch & Maintenance

### Goals
- Continuous improvement and reliability.

### Tasks
- [ ] Set up user analytics (privacy-friendly)
- [ ] Implement error tracking dashboards
- [ ] Create performance monitoring and SLOs
- [ ] Set up uptime monitoring and alerting
- [ ] Create user feedback system and triage
- [ ] Plan feature iterations and backlog grooming
- [ ] Implement bug fixes and hotfix process

### Dependencies
- Phase 12

### Acceptance Criteria
- Clear on-call/alerting; SLA/SLOs tracked.
- Feedback informs prioritized roadmap items quarterly.

---

## Cross-Cutting: Security, Privacy, and Compliance
- [ ] Input validation everywhere (Zod schemas server/client)
- [ ] Least-privilege DB roles and rotated credentials
- [ ] CSRF/XSS/Clickjacking mitigations (CSP, headers, escaping)
- [ ] Rate limiting and abuse prevention
- [ ] Data retention policy; user data export/delete
- [ ] Secrets never committed; 12-factor config

---

## Environment & Commands (Bun-first)
- **Local dev**:
  - `bun install`
  - `bunx prisma generate`
  - `bunx prisma migrate dev`
  - `bun dev`
- **Build**:
  - `bun run build`
- **Seed**:
  - `bun run seed` (idempotent)
- **Test**:
  - `bunx vitest run`

Environment variables (validate with Zod in `src/lib/env.ts`):
- `DATABASE_URL`
- `BETTER_AUTH_SECRET`
- `NEXTAUTH_URL` (if applicable)
- `APP_URL`
- `NODE_ENV`
- Provider-specific secrets (OAuth) as added

---

## Minimal Data Model Outline (Prisma)
- **User**: id, email, name, avatarUrl, createdAt, updatedAt, role
- **AnonymousUser**: id, deviceHash, createdAt, lastSeenAt
- **Build**: id, ownerUserId?, ownerAnonId?, title, description, weaponId, aspectId?, tags[], isPublic, statsJson, createdAt, updatedAt
- **BuildItem**: id, buildId, boonId?, note, order
- **Weapon**: id, name, slug, description, rarity, metaJson
- **Aspect**: id, weaponId, name, description, effectsJson
- **Boon**: id, god, name, description, tier, effectsJson, synergyKeys[]
- **Comment**: id, buildId, authorUserId?, authorAnonId?, parentId?, content, createdAt, updatedAt, isDeleted
- **Collection**: id, ownerUserId, name, description, isPublic, createdAt, updatedAt
- **CollectionItem**: id, collectionId, buildId, order

Indexes to consider:
- Unique slugs (weapon, boon)
- Build(ownerId, createdAt), Build(isPublic) filters
- Comment(buildId, createdAt)
- Collection(ownerUserId, createdAt)

---

## Routing & Pages (Initial)
- `/` Home, featured builds
- `/builds/new` Build editor
- `/builds/[id or slug]` Build detail
- `/builds` Gallery with filters
- `/collections` Collections list
- `/collections/[id]` Collection detail
- `/profile/[username]` User profile
- `/auth/*` Auth screens (if server-rendered)

---

## Definition of Done (per feature)
- Type-safe, validated inputs/outputs (Zod)
- Tests: unit + integration where applicable
- Accessible UI (keyboard, aria, contrast)
- Logged errors with actionable context
- Docs updated (README/todo.md)
- Feature behind flag if risky

---

## Suggested Delivery Timeline (high-level)
- Week 1–2: Phase 1
- Week 3–4: Phase 2
- Week 5–6: Phase 3–4
- Week 7–8: Phase 5–6
- Week 9–10: Phase 7–8
- Week 11–12: Phase 9–10
- Week 13–14: Phase 11–12
- Ongoing: Phase 13