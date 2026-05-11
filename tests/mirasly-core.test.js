import assert from "node:assert/strict";
import test from "node:test";

import {
  SUPPORTED_LOCALES,
  assertTranslationCoverage,
  translations,
} from "../packages/i18n/src/index.js";
import {
  categoryFilters,
  mainCategories,
  seedCities,
  seedHomepageTiles,
} from "../packages/db/src/seed-data.js";
import {
  LISTING_TYPES,
  MODERATION_STATUSES,
  ORDER_STATUSES,
  ROLES,
  validateCreateListingInput,
} from "../packages/contracts/src/index.js";
import {
  can,
  PERMISSIONS,
  rolePermissionSeeds,
} from "../apps/api/src/modules/auth/rbac.js";
import { MockAiProvider } from "../apps/api/src/modules/ai/mock-ai.provider.js";

test("translations have equal key coverage across Turkmen, Russian, and English", () => {
  assert.deepEqual(SUPPORTED_LOCALES, ["tk", "ru", "en"]);

  const result = assertTranslationCoverage(translations);

  assert.equal(result.ok, true);
  assert.deepEqual(result.missingKeys, {});
  assert.equal(translations.tk.nav.home, "Baş sahypa");
  assert.equal(translations.ru.nav.home, "Главная");
  assert.equal(translations.en.nav.home, "Home");
});

test("seed data provides 34 localized top-level categories and category filters", () => {
  assert.equal(mainCategories.length, 34);
  assert.deepEqual(
    mainCategories.map((category) => category.code).slice(0, 4),
    ["promotions", "vehicles", "buying_requests", "animals"],
  );

  for (const category of mainCategories) {
    for (const locale of SUPPORTED_LOCALES) {
      assert.ok(category.name[locale], `${category.code} missing ${locale} name`);
      assert.ok(category.slug[locale], `${category.code} missing ${locale} slug`);
    }
  }

  assert.ok(categoryFilters.vehicles.some((filter) => filter.code === "make"));
  assert.ok(categoryFilters.real_estate.some((filter) => filter.code === "rooms"));
  assert.ok(categoryFilters.pharmacy.some((filter) => filter.code === "restricted_goods_rule"));
  assert.deepEqual(seedCities.slice(0, 3), ["Ashgabat", "Turkmenabat", "Mary"]);
  assert.ok(seedHomepageTiles.some((tile) => tile.code === "charge_go"));
});

test("shared contracts validate listing creation inputs and expose stable enums", () => {
  assert.ok(ROLES.includes("super_admin"));
  assert.ok(MODERATION_STATUSES.includes("needs_review"));
  assert.ok(ORDER_STATUSES.includes("out_for_delivery"));
  assert.ok(LISTING_TYPES.includes("list_vehicle"));

  const valid = validateCreateListingInput({
    type: "sell_item",
    categoryId: "cat-electronics",
    title: "Telefon satylýar",
    description: "Arassa ýagdaýda, gutusy bar",
    price: 1500,
    currency: "TMT",
    city: "Ashgabat",
    locale: "tk",
    contact: { chat: true, showPhone: false },
  });

  assert.equal(valid.success, true);

  const invalid = validateCreateListingInput({
    type: "sell_item",
    categoryId: "",
    title: "",
    description: "short",
    price: -1,
    currency: "BTC",
    city: "",
    locale: "tk",
    contact: { chat: false, showPhone: false },
  });

  assert.equal(invalid.success, false);
  assert.ok(invalid.errors.includes("title"));
  assert.ok(invalid.errors.includes("categoryId"));
  assert.ok(invalid.errors.includes("contact"));
});

test("RBAC seeds grant moderation and admin powers without over-granting sellers", () => {
  assert.ok(rolePermissionSeeds.super_admin.includes(PERMISSIONS.ADMIN_AUDIT_READ));
  assert.ok(can(["moderator"], PERMISSIONS.LISTING_MODERATE));
  assert.ok(can(["shop_owner"], PERMISSIONS.SHOP_PRODUCT_WRITE));
  assert.equal(can(["private_seller"], PERMISSIONS.USER_BAN), false);
  assert.equal(can(["guest"], PERMISSIONS.CHAT_SEND), false);
});

test("mock AI provider is deterministic for category, copy, translation, and moderation", async () => {
  const provider = new MockAiProvider();

  const vehicleSuggestion = await provider.suggestCategory({
    locale: "en",
    title: "Toyota Camry 2018",
    description: "Clean family car",
  });
  assert.equal(vehicleSuggestion.categoryCode, "vehicles");
  assert.equal(vehicleSuggestion.confidence, 0.92);

  const generated = await provider.generateListingCopy({
    locale: "en",
    categoryCode: "electronics",
    facts: ["new battery", "box included"],
  });
  assert.match(generated.title, /Mirasly/i);
  assert.match(generated.description, /new battery/);

  const translated = await provider.translateText({
    sourceLocale: "en",
    targetLocale: "tk",
    text: "Safe local deal",
  });
  assert.equal(translated.text, "[tk] Safe local deal");

  const moderation = await provider.moderateContent({
    title: "Prescription medicine without documents",
    description: "urgent sale",
    categoryCode: "pharmacy",
  });
  assert.equal(moderation.status, "needs_review");
  assert.ok(moderation.reasons.includes("restricted_pharmacy_goods"));
});
