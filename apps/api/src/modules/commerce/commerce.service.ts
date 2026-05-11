export class CommerceService {
  createShop(input: unknown) {
    return { ok: true, id: "shop-new", status: "pending_verification", input };
  }

  createPlace(input: unknown) {
    return { ok: true, id: "place-new", status: "pending_moderation", input };
  }

  checkout(input: unknown) {
    return { ok: true, orderId: "ord-new", status: "pending", paymentProvider: "mock", input };
  }

  promotions() {
    return [
      { code: "boost", metricKeys: ["views", "clicks", "chats_started"] },
      { code: "story", metricKeys: ["views", "clicks", "conversion_estimate"] },
    ];
  }
}
