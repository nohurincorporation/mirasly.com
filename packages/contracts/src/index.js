export const ROLES = [
  "guest",
  "registered_user",
  "buyer",
  "private_seller",
  "business_seller",
  "shop_owner",
  "shop_manager",
  "delivery_partner",
  "hotel_partner",
  "real_estate_agency",
  "car_dealer",
  "employer",
  "service_provider",
  "moderator",
  "support_agent",
  "admin",
  "super_admin",
];

export const LISTING_TYPES = [
  "sell_item",
  "buy_request",
  "rent_out",
  "offer_service",
  "offer_job",
  "post_resume",
  "list_property",
  "list_vehicle",
  "create_shop_product",
  "create_place_business",
  "add_hotel_travel_offer",
];

export const MODERATION_STATUSES = [
  "draft",
  "pending",
  "approved",
  "rejected",
  "paused",
  "sold",
  "rented",
  "expired",
  "deleted",
  "shadow_banned",
  "needs_review",
];

export const ORDER_STATUSES = [
  "draft",
  "pending",
  "accepted",
  "packed",
  "ready_for_pickup",
  "out_for_delivery",
  "delivered",
  "cancelled",
  "refunded",
  "disputed",
];

export const CURRENCIES = ["TMT", "USD", "RUB"];
export const LOCALES = ["tk", "ru", "en"];

export const apiRoutes = {
  auth: ["/auth/register", "/auth/otp/send", "/auth/otp/verify", "/auth/logout", "/auth/refresh"],
  categories: ["/categories", "/categories/tree", "/categories/:slug/filters"],
  listings: ["/listings", "/listings/:id", "/listings/:id/media", "/listings/:id/promote"],
  search: ["/search/listings", "/search/suggestions", "/search/trending", "/search/image"],
  admin: ["/admin/moderation/listings", "/admin/categories", "/admin/translations", "/admin/audit-logs"],
};

export function validateCreateListingInput(input) {
  const errors = [];

  if (!LISTING_TYPES.includes(input?.type)) errors.push("type");
  if (!input?.categoryId || typeof input.categoryId !== "string") errors.push("categoryId");
  if (!input?.title || input.title.trim().length < 5 || input.title.length > 120) errors.push("title");
  if (!input?.description || input.description.trim().length < 10 || input.description.length > 5000) {
    errors.push("description");
  }
  if (typeof input?.price !== "number" || input.price < 0) errors.push("price");
  if (!CURRENCIES.includes(input?.currency)) errors.push("currency");
  if (!input?.city || typeof input.city !== "string") errors.push("city");
  if (!LOCALES.includes(input?.locale)) errors.push("locale");
  if (!input?.contact || (!input.contact.chat && !input.contact.showPhone)) errors.push("contact");

  return {
    success: errors.length === 0,
    errors,
    data: errors.length === 0 ? input : undefined,
  };
}

export const listingResponseShape = {
  id: "string",
  status: MODERATION_STATUSES,
  translations: "Record<locale, { title, description }>",
  media: "ListingMedia[]",
  attributes: "Record<string, unknown>",
  seller: "{ id, displayName, rating, verified }",
};
