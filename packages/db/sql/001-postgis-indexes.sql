CREATE EXTENSION IF NOT EXISTS postgis;

CREATE INDEX IF NOT EXISTS listings_location_gix
  ON "Listing"
  USING GIST ("location");

CREATE INDEX IF NOT EXISTS shops_location_gix
  ON "Shop"
  USING GIST ("location");

CREATE INDEX IF NOT EXISTS places_location_gix
  ON "Place"
  USING GIST ("location");

CREATE INDEX IF NOT EXISTS listings_price_idx
  ON "Listing" ("currency", "price");

CREATE INDEX IF NOT EXISTS listings_moderation_queue_idx
  ON "Listing" ("status", "createdAt")
  WHERE "status" IN ('pending', 'needs_review');
