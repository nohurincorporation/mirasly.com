export class CommerceService {
  createShop(input: unknown) { return { ok: true, id: "shop-new", status: "pending_verification", input }; }
  createPlace(input: unknown) { return { ok: true, id: "place-new", status: "pending_moderation", input }; }
  checkout(input: unknown) { return { ok: true, orderId: "ord-new", status: "pending", paymentProvider: "mock", input }; }
  promotions() { return [{ code: "boost", metricKeys: ["views", "clicks", "chats_started"] }, { code: "story", metricKeys: ["views", "clicks", "conversion_estimate"] }]; }
  addCartItem(input: unknown) { return { ok: true, id: `cart-${Date.now()}`, input }; }
  updateCartItem(id: string, input: unknown) { return { ok: true, id, input }; }
  deleteCartItem(id: string) { return { ok: true, id, deleted: true }; }
  listCartItems() { return [{ id: "cart-1", sku: "sku-1", qty: 1 }]; }
  transitionOrder(id: string, status: string) { return { ok: true, id, status }; }
  listBuyerOrders() { return [{ id: "ord-1", role: "buyer" }]; }
  listSellerOrders() { return [{ id: "ord-2", role: "seller" }]; }
  purchasePromotion(input: unknown) { return { ok: true, promotionOrderId: `promo-${Date.now()}`, input }; }
  follow(entity: "shop", id: string) { return { ok: true, entity, id, following: true }; }
  unfollow(entity: "shop", id: string) { return { ok: true, entity, id, following: false }; }
  claimPlace(id: string, input: unknown) { return { ok: true, id, claimId: `claim-${Date.now()}`, status: "under_review", input }; }
  createReview(id: string, input: unknown) { return { ok: true, id, reviewId: `rev-${Date.now()}`, moderationState: "pending", input }; }
  moderateReview(id: string, reviewId: string, state: string) { return { ok: true, id, reviewId, moderationState: state }; }
}
