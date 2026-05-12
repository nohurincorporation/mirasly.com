export class EngagementService {
  favorite(input: { listingId: string; collectionId?: string }) { return { ok: true, ...input, priceDropAlerts: true }; }
  unfavorite(listingId: string) { return { ok: true, listingId, removed: true }; }
  listFavorites() { return [{ listingId: "lst-1" }, { listingId: "lst-2" }]; }
  collections() { return [{ id: "default", name: "Default" }]; }
  saveSearch(input: unknown) { return { ok: true, id: "saved-search-demo", cadence: "instant", input }; }
  updateSavedSearch(id: string, input: unknown) { return { ok: true, id, input }; }
  pauseSavedSearch(id: string) { return { ok: true, id, paused: true }; }
  deleteSavedSearch(id: string) { return { ok: true, id, deleted: true }; }
  savedSearchMatches(id: string) { return { id, matches: [{ listingId: "lst-1" }] }; }
  notifications() { return [{ id: "ntf-1", type: "listing_approved", read: false }, { id: "ntf-2", type: "saved_search_match", read: false }]; }
  markNotificationRead(id: string) { return { ok: true, id, read: true }; }
  updateNotificationPreferences(input: unknown) { return { ok: true, input }; }
}
