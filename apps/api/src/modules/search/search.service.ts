import { demoListings } from "../../../../../packages/db/src/seed-data.js";

export class SearchService {
  listings(query: Record<string, string>) {
    const q = query.q?.toLowerCase() ?? "";
    return {
      source: "opensearch-postgis-adapter",
      items: demoListings.filter((listing) => JSON.stringify(listing.title).toLowerCase().includes(q) || !q),
      sort: query.sort ?? "recommended",
      promotedClearlyLabeled: true,
    };
  }

  suggestions(query: string) {
    return ["Toyota", "jaý kärendesi", "telefon", "iş", "dermanhana"].filter((item) =>
      item.toLowerCase().includes(query.toLowerCase()),
    );
  }
}
