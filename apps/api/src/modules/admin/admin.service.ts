export class AdminService {
  listingsQueue() {
    return {
      queues: ["pending", "needs_review", "reported", "ai_flagged"],
      items: [{ id: "lst-review", status: "needs_review", aiRiskScore: 0.81, reports: 1 }],
    };
  }

  moderateListing(id: string, status: "approved" | "rejected", reason?: string) {
    return {
      ok: true,
      id,
      status,
      reason,
      auditLog: { action: `listing.${status}`, target: id },
    };
  }
}
