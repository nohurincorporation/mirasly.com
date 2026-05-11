export const envSchema = {
  NODE_ENV: ["development", "test", "production"],
  DATABASE_URL: "url",
  REDIS_URL: "url",
  OPENSEARCH_URL: "url",
  S3_ENDPOINT: "url",
  S3_BUCKET: "string",
  JWT_ACCESS_SECRET: "secret",
  JWT_REFRESH_SECRET: "secret",
  OTP_PROVIDER: ["mock", "sms"],
  AI_PROVIDER: ["mock", "openai", "custom"],
  PAYMENT_PROVIDER: ["mock", "card", "cash_on_delivery"],
};

export const featureFlags = {
  liveDispatch: false,
  regulatedPharmacyCheckout: false,
  realPayments: false,
  aiMessageTranslation: false,
  imageSearch: true,
};

export function readPublicConfig(env = process.env) {
  return {
    apiUrl: env.PUBLIC_API_URL ?? "http://localhost:4000",
    defaultLocale: env.DEFAULT_LOCALE ?? "tk",
    enabledLocales: ["tk", "ru", "en"],
  };
}
