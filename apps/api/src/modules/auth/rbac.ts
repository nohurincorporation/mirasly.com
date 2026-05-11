export type Permission =
  | "auth.session.read"
  | "auth.session.revoke"
  | "user.read"
  | "user.write"
  | "user.ban"
  | "listing.read"
  | "listing.write"
  | "listing.moderate"
  | "shop.read"
  | "shop.write"
  | "shop.product.write"
  | "place.write"
  | "chat.send"
  | "chat.moderate"
  | "order.read"
  | "order.write"
  | "promotion.buy"
  | "admin.category.write"
  | "admin.translation.write"
  | "admin.audit.read"
  | "admin.analytics.read";

export declare const PERMISSIONS: Record<string, Permission>;
export declare const rolePermissionSeeds: Record<string, Permission[]>;
export declare function can(roles: string[], permission: Permission): boolean;
