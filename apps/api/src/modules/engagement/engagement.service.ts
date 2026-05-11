export class EngagementService {
  favorite(listingId: string) {
    return { ok: true, listingId, collection: "default", priceDropAlerts: true };
  }

  saveSearch(input: unknown) {
    return { ok: true, id: "saved-search-demo", cadence: "instant", input };
  }

  notifications() {
    return [
      { id: "ntf-1", type: "listing_approved", read: false },
      { id: "ntf-2", type: "saved_search_match", read: false },
    ];
  }
}
