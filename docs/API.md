# Contract-first API Matrix

## Error model
All endpoints return `{ ok: false, error: { code: string, message?: string, details?: unknown } }` on failure. Validation failures use `code=validation_error`; auth failures use `auth_required`; authorization failures use `insufficient_permissions`.

## Auth
| Feature | Endpoint | Request DTO | Response DTO | Guard |
|---|---|---|---|---|
| Send OTP | `POST /v1/auth/otp/send` | `{ phone: string }` | `{ phone, provider, expiresInSeconds, devCode }` | public |
| Verify OTP | `POST /v1/auth/otp/verify` | `{ phone: string, code: string(6) }` | `{ ok, user, accessToken, refreshToken }` | public |
| Refresh token rotation | `POST /v1/auth/refresh` | `{ refreshToken: string }` | `{ ok, rotated, revokedToken, accessToken, refreshToken }` | public |
| Social/email auth stub | `POST /v1/auth/social` | `{ provider, providerToken, email? }` | `{ ok, mode:"stub", ... }` | public |
| List sessions | `GET /v1/auth/sessions` | none | `Session[]` | `auth.session.read` |
| Revoke session | `DELETE /v1/auth/sessions/:id` | path `id` | `{ id, revoked }` | `auth.session.revoke` |
| Logout all devices | `DELETE /v1/auth/sessions` | none | `{ ok, userId, revokedSessions }` | `auth.session.revoke` |

## Listings
Includes create/update/detail/media plus: `POST /:id/pause`, `/:id/renew`, `/:id/mark-sold`, `/:id/mark-rented`, `/:id/promote`, `/:id/report`, `/:id/share` with `listing.write` guard and DTOs for report reason/note.

## Engagement + Notifications
Under `/v1/me`: favorites add/delete/list, favorite collections list, saved-search create/update/pause/delete/matches, notifications list, mark-read (`POST /notifications/:id/read`), notification preference update (`PATCH /notification-preferences`). Guard: `user.write`.

## Commerce
Under `/v1/commerce`: cart item CRUD/list, checkout, order status transition (`POST /orders/:id/status`), buyer/seller order lists, promotion purchase, shops follow/unfollow, places claim flow, place reviews create/moderate. Guards vary by route: `order.read|order.write|promotion.buy|shop.write|place.write|listing.moderate`.

## Shops / Places
Implemented via commerce module endpoints:
- follow/unfollow shop: `POST|DELETE /v1/commerce/shops/:id/follow`
- claim place: `POST /v1/commerce/places/:id/claim`
- reviews + moderation states: `POST /v1/commerce/places/:id/reviews`, `PATCH /v1/commerce/places/:id/reviews/:reviewId/moderate`
