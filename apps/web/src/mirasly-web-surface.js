import { seedHomepageTiles } from "../../../packages/db/src/seed-data.js";
import { t } from "../../../packages/i18n/src/index.js";

export const webSurface = {
  brand: {
    name: "Mirasly",
    promiseKey: "safety.reportSuspicious",
    originalDesignSystem: "mirasly-jade-sun-civic-market",
  },
  header: {
    logoText: "Mirasly",
    localeLabels: { tk: "TK", ru: "RU", en: "EN" },
    nav: [
      { key: "categories", label: t("en", "nav.categories") },
      { key: "places", label: t("en", "nav.places") },
      { key: "stories", label: t("en", "nav.stories") },
      { key: "shops", label: t("en", "nav.shops") },
      { key: "business360", label: t("en", "nav.business360") },
    ],
  },
  home: {
    quickServices: seedHomepageTiles,
    promoMosaic: [
      "brands",
      "travel",
      "express",
      "resale",
      "best_price",
      "for_business",
      "made_locally",
      "good_deeds",
    ],
    feedRails: [
      "new_listings",
      "nearby_listings",
      "popular_listings",
      "promoted_listings",
      "discounted_listings",
      "followed_shops",
    ],
  },
};
