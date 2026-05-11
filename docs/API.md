# API Route Groups

## Auth

- `POST /v1/auth/otp/send`
- `POST /v1/auth/otp/verify`
- `GET /v1/auth/sessions`
- `DELETE /v1/auth/sessions/:id`

## Categories

- `GET /v1/categories`
- `GET /v1/categories/tree`
- `GET /v1/categories/:slug/filters`

## Listings

- `POST /v1/listings`
- `GET /v1/listings/:id`
- `PATCH /v1/listings/:id`
- `POST /v1/listings/:id/media`

## Search

- `GET /v1/search/listings`
- `GET /v1/search/suggestions`
- `POST /v1/search/image`

## Engagement

- `POST /v1/me/favorites`
- `POST /v1/me/saved-searches`
- `GET /v1/me/notifications`

## Chats

- `GET /v1/chats`
- `POST /v1/chats`
- `POST /v1/chats/:id/messages`
- WebSocket namespace `/chats`

## Commerce

- `POST /v1/commerce/shops`
- `POST /v1/commerce/places`
- `POST /v1/commerce/checkout`
- `GET /v1/commerce/promotions`

## AI

- `POST /v1/ai/suggest-category`
- `POST /v1/ai/generate-description`
- `POST /v1/ai/translate`
- `POST /v1/ai/moderate`

## Admin

- `GET /v1/admin/moderation/listings`
- `POST /v1/admin/moderation/listings/:id/approve`
- `POST /v1/admin/moderation/listings/:id/reject`
