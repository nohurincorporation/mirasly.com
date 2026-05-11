import { seedHomepageTiles } from "../../../packages/db/src/seed-data.js";
import { t } from "../../../packages/i18n/src/index.js";

export const mobileSurface = {
  bottomNav: [
    { key: "home", label: t("en", "nav.home") },
    { key: "favorites", label: t("en", "nav.favorites") },
    { key: "add", label: t("en", "nav.add"), dominant: true },
    { key: "chats", label: t("en", "nav.chats") },
    { key: "profile", label: t("en", "nav.profile") },
  ],
  permissions: ["camera", "location", "push-notifications"],
  offlineSafeQueries: ["home-feed", "categories", "favorites", "saved-searches", "chat-list"],
  listingWizardSteps: [
    "type",
    "category",
    "media",
    "details",
    "location",
    "contact",
    "delivery",
    "promotion",
    "preview",
    "submit",
  ],
  homeQuickServices: seedHomepageTiles.map((tile) => tile.code),
};
