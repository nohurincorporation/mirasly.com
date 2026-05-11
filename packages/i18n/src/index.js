import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const SUPPORTED_LOCALES = ["tk", "ru", "en"];

const packageRoot = dirname(dirname(fileURLToPath(import.meta.url)));

function loadLocale(locale) {
  return JSON.parse(readFileSync(join(packageRoot, `${locale}.json`), "utf8"));
}

export const translations = Object.fromEntries(
  SUPPORTED_LOCALES.map((locale) => [locale, loadLocale(locale)]),
);

function flattenKeys(value, prefix = "") {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return [prefix];
  }

  return Object.entries(value).flatMap(([key, nested]) =>
    flattenKeys(nested, prefix ? `${prefix}.${key}` : key),
  );
}

export function assertTranslationCoverage(localeMap = translations) {
  const baselineLocale = "en";
  const baseline = new Set(flattenKeys(localeMap[baselineLocale]));
  const missingKeys = {};

  for (const locale of SUPPORTED_LOCALES) {
    const localeKeys = new Set(flattenKeys(localeMap[locale]));
    const missing = [...baseline].filter((key) => !localeKeys.has(key));
    if (missing.length > 0) {
      missingKeys[locale] = missing;
    }
  }

  return {
    ok: Object.keys(missingKeys).length === 0,
    missingKeys,
  };
}

export function t(locale, key) {
  const requested = SUPPORTED_LOCALES.includes(locale) ? locale : "en";
  return key.split(".").reduce((node, segment) => node?.[segment], translations[requested]) ?? key;
}
