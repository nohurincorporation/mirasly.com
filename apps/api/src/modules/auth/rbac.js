export const PERMISSIONS = Object.freeze({
  AUTH_SESSION_READ: "auth.session.read",
  AUTH_SESSION_REVOKE: "auth.session.revoke",
  USER_READ: "user.read",
  USER_WRITE: "user.write",
  USER_BAN: "user.ban",
  LISTING_READ: "listing.read",
  LISTING_WRITE: "listing.write",
  LISTING_MODERATE: "listing.moderate",
  SHOP_READ: "shop.read",
  SHOP_WRITE: "shop.write",
  SHOP_PRODUCT_WRITE: "shop.product.write",
  PLACE_WRITE: "place.write",
  CHAT_SEND: "chat.send",
  CHAT_MODERATE: "chat.moderate",
  ORDER_READ: "order.read",
  ORDER_WRITE: "order.write",
  PROMOTION_BUY: "promotion.buy",
  ADMIN_CATEGORY_WRITE: "admin.category.write",
  ADMIN_TRANSLATION_WRITE: "admin.translation.write",
  ADMIN_AUDIT_READ: "admin.audit.read",
  ADMIN_ANALYTICS_READ: "admin.analytics.read",
});

const registered = [
  PERMISSIONS.AUTH_SESSION_READ,
  PERMISSIONS.AUTH_SESSION_REVOKE,
  PERMISSIONS.USER_READ,
  PERMISSIONS.USER_WRITE,
  PERMISSIONS.LISTING_READ,
  PERMISSIONS.CHAT_SEND,
  PERMISSIONS.ORDER_READ,
];

const seller = [
  ...registered,
  PERMISSIONS.LISTING_WRITE,
  PERMISSIONS.PROMOTION_BUY,
];

const businessSeller = [
  ...seller,
  PERMISSIONS.SHOP_READ,
  PERMISSIONS.SHOP_WRITE,
  PERMISSIONS.SHOP_PRODUCT_WRITE,
  PERMISSIONS.PLACE_WRITE,
  PERMISSIONS.ORDER_WRITE,
];

const moderator = [
  ...registered,
  PERMISSIONS.USER_READ,
  PERMISSIONS.LISTING_MODERATE,
  PERMISSIONS.CHAT_MODERATE,
  PERMISSIONS.SHOP_READ,
  PERMISSIONS.PLACE_WRITE,
];

const admin = [
  ...moderator,
  PERMISSIONS.USER_BAN,
  PERMISSIONS.ADMIN_CATEGORY_WRITE,
  PERMISSIONS.ADMIN_TRANSLATION_WRITE,
  PERMISSIONS.ADMIN_ANALYTICS_READ,
];

export const rolePermissionSeeds = Object.freeze({
  guest: [PERMISSIONS.LISTING_READ, PERMISSIONS.SHOP_READ],
  registered_user: registered,
  buyer: registered,
  private_seller: seller,
  business_seller: businessSeller,
  shop_owner: businessSeller,
  shop_manager: [PERMISSIONS.SHOP_READ, PERMISSIONS.SHOP_PRODUCT_WRITE, PERMISSIONS.ORDER_READ, PERMISSIONS.ORDER_WRITE],
  delivery_partner: [PERMISSIONS.ORDER_READ, PERMISSIONS.ORDER_WRITE, PERMISSIONS.CHAT_SEND],
  hotel_partner: [...businessSeller],
  real_estate_agency: [...businessSeller],
  car_dealer: [...businessSeller],
  employer: [...businessSeller],
  service_provider: seller,
  moderator,
  support_agent: [PERMISSIONS.USER_READ, PERMISSIONS.CHAT_MODERATE, PERMISSIONS.ORDER_READ],
  admin,
  super_admin: [...admin, PERMISSIONS.ADMIN_AUDIT_READ],
});

export function can(roles, permission) {
  return roles.some((role) => rolePermissionSeeds[role]?.includes(permission));
}
