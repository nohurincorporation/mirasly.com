# Mirasly Architecture

## System Shape

Mirasly starts as a modular monolith because V1 needs coherent product velocity, shared transactions, and simple deployment. Module seams are explicit:
- API modules own route contracts and orchestration.
- Shared packages own stable data, i18n, validation, and UI tokens.
- Provider adapters isolate OTP, AI, payments, storage, search, maps, SMS, and push.

## Data Ownership

PostgreSQL is the source of truth. OpenSearch is a projection for search. Redis is used for rate limits, ephemeral chat state, queues, and cache. S3-compatible storage owns original media and generated derivatives.

Categories, filters, translations, homepage tiles, banners, prohibited rules, and moderation statuses must be managed by backend/admin flows. Frontends may cache them, but must not become their source of truth.

## Security Model

RBAC is permission-based. Roles seed default permissions, but admin-managed permissions are the durable model. Every sensitive admin action must write an audit log. OTP, sessions, refresh tokens, upload signing, moderation actions, and promotion purchases must be rate-limited.

## Search Model

Listings are indexed into OpenSearch with localized title/description fields, normalized category/filter fields, promoted rank, city/district, price, and seller trust signals. Radius search uses PostGIS and can be blended into search ranking.

## AI Model

AI never directly publishes high-risk changes. AI suggestions are assistive; moderation outcomes are risk signals. Pharmacy/medical goods, fraud signals, duplicate listings, unsafe images, and suspicious sellers go to admin review.
