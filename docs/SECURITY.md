# Security and Trust

## Controls in V1

- Phone OTP login via provider abstraction.
- Refresh-token session model and device management.
- Permission-based RBAC.
- Rate limits for auth, listing creation, chat, media upload, and admin actions.
- Presigned media uploads only.
- Moderation status machine for listings, shops, places, stories, and reviews.
- AI risk scoring as a signal, not an automatic ban.
- Audit logs for admin actions.
- Report and block flows for users, listings, chats, reviews, places, and shops.

## Restricted Categories

Pharmacy and medical goods require stricter moderation. The platform must not enable unsafe prescription medicine sales without legal compliance. The `pharmacy` filter seed includes a moderation-required restricted goods rule.

## Wallet Scope

Wallet is limited to credits, bonuses, and promotion purchases. It must not support banking, money transfer, exchange, stored-value cash-out, or regulated financial services unless licensing is handled separately.

## Data Rights

User profile architecture includes delete and export request support. Production implementation must include retention rules, identity verification for export/delete, and audit entries for support actions.
