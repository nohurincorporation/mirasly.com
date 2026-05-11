export type Locale = "tk" | "ru" | "en";
export const SUPPORTED_LOCALES: Locale[] = ["tk", "ru", "en"];

export interface TranslationCoverageResult {
  ok: boolean;
  missingKeys: Record<string, string[]>;
}

export declare const translations: Record<Locale, Record<string, unknown>>;
export declare function assertTranslationCoverage(localeMap?: typeof translations): TranslationCoverageResult;
export declare function t(locale: Locale, key: string): string;
