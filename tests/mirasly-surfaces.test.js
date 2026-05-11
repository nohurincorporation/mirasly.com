import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { apiModuleRegistry } from "../apps/api/src/app-registry.js";
import { webSurface } from "../apps/web/src/mirasly-web-surface.js";
import { adminSurface } from "../apps/admin/src/admin-surface.js";
import { mobileSurface } from "../apps/mobile/src/mobile-surface.js";

test("API registry exposes the production V1 modules and routes", () => {
  assert.deepEqual(
    apiModuleRegistry.modules.map((module) => module.name),
    [
      "auth",
      "categories",
      "listings",
      "search",
      "engagement",
      "chat",
      "commerce",
      "ai",
      "admin",
    ],
  );

  assert.ok(apiModuleRegistry.modules.find((module) => module.name === "chat").transports.includes("websocket"));
  assert.ok(apiModuleRegistry.modules.find((module) => module.name === "search").providers.includes("opensearch"));
  assert.ok(apiModuleRegistry.modules.find((module) => module.name === "admin").permissions.includes("listing.moderate"));
});

test("web, admin, and mobile surfaces use shared data and translated navigation", () => {
  assert.equal(webSurface.brand.name, "Mirasly");
  assert.equal(webSurface.header.localeLabels.tk, "TK");
  assert.ok(webSurface.home.quickServices.some((service) => service.code === "charge_go"));
  assert.ok(webSurface.home.feedRails.includes("nearby_listings"));

  assert.ok(adminSurface.moderationQueues.includes("listings"));
  assert.ok(adminSurface.tools.includes("translation_manager"));
  assert.ok(adminSurface.tools.includes("category_filter_builder"));

  assert.deepEqual(mobileSurface.bottomNav.map((item) => item.key), ["home", "favorites", "add", "chats", "profile"]);
  assert.equal(mobileSurface.bottomNav.find((item) => item.key === "add").dominant, true);
  assert.ok(mobileSurface.offlineSafeQueries.includes("home-feed"));
});

test("Docker compose wires required infrastructure services", () => {
  const compose = readFileSync("docker-compose.yml", "utf8");

  for (const service of ["postgres", "redis", "opensearch", "minio", "api", "web", "admin"]) {
    assert.match(compose, new RegExp(`\\n  ${service}:`));
  }

  assert.match(compose, /postgis\/postgis/);
  assert.match(compose, /OPENSEARCH_JAVA_OPTS/);
  assert.match(compose, /MINIO_ROOT_USER/);
});
