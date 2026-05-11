# Mirasly Production V1

Mirasly is an original marketplace super-app scaffold for Turkmenistan and CIS markets. It is structured as a production V1 vertical slice: real architecture, source-of-truth data packages, API modules, web/admin/mobile app shells, Docker infrastructure, tests, and deployment guidance.

## 1. Architecture Overview

Mirasly uses a TypeScript monorepo with a modular-monolith backend. The backend keeps module boundaries explicit so high-load areas such as chat, search, AI, and notifications can later move into independent services without changing client contracts.

Core services:
- `apps/api`: NestJS API, OpenAPI setup, WebSocket gateway, jobs-ready module structure.
- `apps/web`: Next.js customer web/PWA with SEO-ready localized routes.
- `apps/admin`: Next.js admin/moderation/business dashboard.
- `apps/mobile`: Expo React Native app shell for Android and iOS.
- `packages/contracts`: shared enums, route metadata, and validation contracts.
- `packages/db`: Prisma schema, PostGIS SQL, seed categories, filters, cities, and demo marketplace data.
- `packages/i18n`: Turkmen/Russian/English JSON files and coverage validation.
- `packages/ui`: original Mirasly design tokens and icon metaphors.
- `packages/config`: env schema and feature flags.

## 2. Folder Structure

```text
apps/
  api/       NestJS backend modules and adapters
  web/       Next.js customer marketplace/PWA
  admin/     Next.js admin and moderation console
  mobile/    Expo React Native mobile app
packages/
  contracts/ Shared role, listing, order, moderation, and API contracts
  db/        Prisma schema, PostGIS SQL, seed data
  i18n/      tk/ru/en translation files and coverage checks
  ui/        Original Mirasly tokens and component foundations
  config/    Environment schema and feature flags
tests/       Dependency-free Node tests for core contracts and surfaces
docs/        Architecture, deployment, QA, and security guidance
```

## 3. Database Schema

The Prisma schema in `packages/db/prisma/schema.prisma` covers:
- Identity/RBAC: users, profiles, sessions, roles, permissions, user roles.
- Marketplace: categories, localized category slugs/SEO, filters, listings, media, views, promotions.
- Engagement: favorites, saved searches, notifications.
- Business entities: shops and places with PostGIS locations.
- Admin/trust: audit logs and moderation-ready status fields.

PostGIS indexes live in `packages/db/sql/001-postgis-indexes.sql`.

## 4. Backend API

`apps/api/src/app-registry.js` documents the production V1 module boundaries and route groups:
- Auth: OTP, sessions, device management, RBAC.
- Categories: localized tree and filter schemas.
- Listings: creation, updates, media upload, promotion hooks.
- Search: OpenSearch/PostGIS adapter boundary.
- Engagement: favorites, saved searches, notifications.
- Chat: REST endpoints plus WebSocket typing/read events.
- Commerce: shops, places, checkout, promotions.
- AI: category suggestion, listing copy, translation, moderation.
- Admin: listing queues and moderation actions.

`apps/api/src/main.ts` configures Swagger at `/docs`.

## 5. Web Frontend

`apps/web` is a mobile-first Next.js app with localized routes under `/[locale]`. The homepage reads quick services and categories from `packages/db`, and visible labels come from `packages/i18n`.

The visual language is original to Mirasly: jade/sun civic-market tokens, rounded but restrained UI, and no competitor brand assets, icons, layouts, protected wording, or trade dress.

## 6. Mobile App

`apps/mobile` is an Expo React Native app shell. It includes:
- Search-first home screen.
- Shared quick services from seed data.
- Bottom navigation with Home, Favorites, dominant Add, Chats, Profile.
- Declared camera, location, and push-notification permissions.
- Listing wizard step registry and offline-safe query registry.

## 7. Admin Dashboard

`apps/admin` is a dense operational console with:
- Moderation queues for listings, shops, places, stories, reviews, and reported chats.
- Translation manager and category/filter builder registry.
- User, role, promotion, wallet credit, order, support, and audit-log tools.
- Explicit moderation actions: approve, reject, request changes, hide, warn, ban, verify, mark suspicious.

## 8. Translation Files

Translations are in:
- `packages/i18n/tk.json`
- `packages/i18n/ru.json`
- `packages/i18n/en.json`

`assertTranslationCoverage` fails tests when any locale is missing a key from the English baseline.

## 9. Seed Data

`packages/db/src/seed-data.js` includes:
- All 34 main categories in TK/RU/EN.
- Category-specific filters for goods, vehicles, real estate, services, jobs, rentals, and pharmacy.
- Turkmenistan cities.
- Demo users, sellers, shops, places, listings, homepage tiles.

Categories and filters are shared data and designed to be database-managed, not frontend constants.

## 10. AI Service Abstraction

`apps/api/src/modules/ai/ai-provider.interface.ts` defines the provider contract. `MockAiProvider` is deterministic for development and tests:
- Category suggestion.
- Listing title/description generation.
- Translation wrapper.
- Price suggestion.
- Moderation and duplicate detection.

Production providers can be added behind the same interface.

## 11. Docker Files

`docker-compose.yml` wires:
- PostgreSQL/PostGIS
- Redis
- OpenSearch
- MinIO
- API
- Web
- Admin

Each app has a Dockerfile under its app directory.

## 12. Deployment Guide

See `docs/DEPLOYMENT.md`.

## 13. Testing Instructions

Current dependency-free verification:

```powershell
node --test tests/*.test.js
```

After installing dependencies in a normal Node environment:

```bash
pnpm install
pnpm typecheck
pnpm test
pnpm build
docker compose up --build
```

See `docs/QA.md` for web, admin, API, and Android emulator validation flow.
