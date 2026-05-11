# Deployment Guide

## Required Environment

Copy `.env.example` into environment-specific secrets and replace all `change-me` values.

Required services:
- PostgreSQL with PostGIS.
- Redis.
- OpenSearch.
- S3-compatible object storage.
- SMS/OTP provider or mock provider for non-production.
- AI provider or mock provider for non-production.
- Payment provider only when legal/compliance review is complete.

## Local Docker

```bash
docker compose up --build
```

Expected local ports:
- API: `http://localhost:4000`
- Web: `http://localhost:3000`
- Admin: `http://localhost:3001`
- OpenSearch: `http://localhost:9200`
- MinIO: `http://localhost:9001`

## Database

Run Prisma migrations after dependencies are installed:

```bash
pnpm --filter @mirasly/db prisma migrate deploy
pnpm db:seed
```

PostGIS helper indexes are mounted from `packages/db/sql`.

## Search Index

Create one versioned index per listing projection, for example `mirasly-listings-v1`, then point an alias named `mirasly-listings` to it. Reindex in the background and atomically move the alias for schema changes.

## Storage

Create an object bucket named by `S3_BUCKET`. Use presigned uploads only. Media processing should generate thumbnails, strip unsafe metadata, and store moderation scan outcomes before public display.

## Backups

Minimum production backup policy:
- PostgreSQL PITR with daily full snapshots.
- Object storage lifecycle protection for originals.
- OpenSearch can be rebuilt from PostgreSQL but should still snapshot for faster recovery.
- Redis is disposable except queues; queue persistence should be monitored.

## CI/CD

The expected CI stages are:
1. Install dependencies.
2. Translation coverage tests.
3. Unit/integration/API tests.
4. Typecheck.
5. Build API, web, admin, mobile bundle metadata.
6. Docker image build.
7. Deployment with migrations.
8. Smoke test `/health`, web home, admin login, API docs.
