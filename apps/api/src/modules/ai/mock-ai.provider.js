const categoryRules = [
  { categoryCode: "vehicles", keywords: ["toyota", "camry", "car", "vehicle", "mileage", "taxi"] },
  { categoryCode: "real_estate", keywords: ["apartment", "house", "rent", "rooms", "floor"] },
  { categoryCode: "electronics", keywords: ["phone", "laptop", "battery", "camera", "iphone"] },
  { categoryCode: "jobs_staff", keywords: ["job", "salary", "driver", "staff", "vacancy"] },
  { categoryCode: "pharmacy", keywords: ["medicine", "pharmacy", "prescription", "medical"] },
];

function textOf(input) {
  return `${input.title ?? ""} ${input.description ?? ""}`.toLowerCase();
}

export class MockAiProvider {
  async suggestCategory(input) {
    const haystack = textOf(input);
    const match = categoryRules.find((rule) => rule.keywords.some((keyword) => haystack.includes(keyword)));

    return {
      categoryCode: match?.categoryCode ?? "services",
      confidence: match ? 0.92 : 0.64,
      provider: "mock",
      explanation: match ? "keyword_match" : "fallback_services",
    };
  }

  async generateListingCopy(input) {
    const facts = input.facts?.filter(Boolean).join(", ") || "ready for a safe local deal";
    return {
      title: `Mirasly ${input.categoryCode} offer`,
      description: `Original Mirasly listing prepared from seller facts: ${facts}. Meet safely, verify details, and use chat for questions.`,
      tags: [input.categoryCode, "mirasly", "verified-flow"],
      provider: "mock",
    };
  }

  async translateText(input) {
    return {
      text: `[${input.targetLocale}] ${input.text}`,
      sourceLocale: input.sourceLocale,
      targetLocale: input.targetLocale,
      provider: "mock",
    };
  }

  async suggestPrice(input) {
    const base = input.categoryCode === "vehicles" ? 15000 : input.categoryCode === "real_estate" ? 60000 : 500;
    return {
      min: Math.round(base * 0.85),
      max: Math.round(base * 1.15),
      currency: input.currency ?? "TMT",
      confidence: 0.7,
      provider: "mock",
    };
  }

  async moderateContent(input) {
    const haystack = textOf(input);
    const reasons = [];

    if (input.categoryCode === "pharmacy" && /prescription|without documents|medicine/.test(haystack)) {
      reasons.push("restricted_pharmacy_goods");
    }
    if (/spam|fake passport|weapon|narcotic/.test(haystack)) {
      reasons.push("prohibited_or_suspicious_text");
    }

    return {
      status: reasons.length > 0 ? "needs_review" : "approved",
      riskScore: reasons.length > 0 ? 0.81 : 0.12,
      reasons,
      provider: "mock",
    };
  }

  async detectDuplicate(input) {
    return {
      duplicateListingIds: input.title?.toLowerCase().includes("duplicate") ? ["lst-possible-duplicate"] : [],
      confidence: input.title?.toLowerCase().includes("duplicate") ? 0.88 : 0.1,
      provider: "mock",
    };
  }
}
