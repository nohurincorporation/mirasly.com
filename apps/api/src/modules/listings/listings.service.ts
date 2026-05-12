import { validateCreateListingInput } from "../../../../../packages/contracts/src/index.js";
import { demoListings } from "../../../../../packages/db/src/seed-data.js";

export class ListingsService {
  create(input: unknown) { const validation = validateCreateListingInput(input); if (!validation.success) return { ok: false, errors: validation.errors }; return { ok: true, listing: { id: `lst-${Date.now()}`, status: "pending", moderationPath: "trust_score_or_manual_review", ...validation.data } }; }
  detail(id: string) { return demoListings.find((listing) => listing.id === id) ?? { id, status: "not_found" }; }
  update(id: string, patch: unknown) { return { ok: true, id, patch, status: "pending" }; }
  presignMediaUpload(listingId: string) { return { listingId, uploadUrl: `http://localhost:9000/mirasly-dev/${listingId}/media.jpg?signature=mock`, objectKey: `${listingId}/media.jpg`, maxBytes: 15_000_000 }; }
  transition(id: string, status: "paused" | "active" | "sold" | "rented") { return { ok: true, id, status }; }
  promote(id: string) { return { ok: true, id, promotionOrderId: `promo-${Date.now()}` }; }
  report(id: string, input: { reason: string; note?: string }) { return { ok: true, id, moderationTicketId: `rpt-${Date.now()}`, ...input }; }
  shareHook(id: string) { return { ok: true, id, analyticsEvent: "listing_shared" }; }
}
