# QA Plan

## Dependency-Free Checks

```powershell
node --test tests/*.test.js
```

These tests validate translation coverage, category seeds, contracts, RBAC, AI mock behavior, app surface registries, and Docker service wiring.

## API Checks

After dependencies are installed:
- Auth OTP send/verify.
- Listing creation validation and pending moderation status.
- Category tree and filters.
- Search suggestions and listing query.
- Favorites, saved searches, notifications.
- Chat creation, message send, listing card attachment, location payload.
- Admin moderation approve/reject audit outcome.

## Web/Admin Browser QA

Use the Browser plugin first:
- Customer flow: `/tk` -> search -> category -> listing detail -> favorite -> chat.
- Add-listing flow: central add action -> category -> media -> AI suggestion -> preview -> submit.
- Admin flow: dashboard -> listing queue -> approve/reject -> audit log.

Check desktop and mobile-sized viewports, console health, no framework overlays, and first-viewport layout.

## Android Emulator QA

Use the Test Android Apps workflow:
1. `adb devices`
2. Install the Expo Android build.
3. Launch `com.mirasly.app`.
4. Verify home renders, bottom nav works, central add button opens listing wizard, search accepts input, chat screen opens.
5. Capture screenshot and logcat evidence.

## Regression Rules

New behavior should follow red-green-refactor:
- Write a failing test.
- Verify it fails for the expected reason.
- Implement the smallest change.
- Verify the test passes.
- Run the broader suite.
