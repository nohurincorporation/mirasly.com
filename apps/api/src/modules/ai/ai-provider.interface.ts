import type { Locale } from "@mirasly/contracts";

export interface AiCategorySuggestionInput {
  locale: Locale;
  title?: string;
  description?: string;
  imageObjectKeys?: string[];
}

export interface AiModerationInput {
  title: string;
  description: string;
  categoryCode: string;
}

export interface AiProvider {
  suggestCategory(input: AiCategorySuggestionInput): Promise<{
    categoryCode: string;
    confidence: number;
    provider: string;
    explanation: string;
  }>;
  generateListingCopy(input: {
    locale: Locale;
    categoryCode: string;
    facts: string[];
  }): Promise<{
    title: string;
    description: string;
    tags: string[];
    provider: string;
  }>;
  translateText(input: {
    sourceLocale: Locale;
    targetLocale: Locale;
    text: string;
  }): Promise<{
    text: string;
    sourceLocale: Locale;
    targetLocale: Locale;
    provider: string;
  }>;
  moderateContent(input: AiModerationInput): Promise<{
    status: "approved" | "needs_review";
    riskScore: number;
    reasons: string[];
    provider: string;
  }>;
}
