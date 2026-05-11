export interface LocalizedText {
  tk: string;
  ru: string;
  en: string;
}

export interface CategorySeed {
  id: string;
  order: number;
  code: string;
  name: LocalizedText;
  slug: LocalizedText;
  icon: string;
  featured: boolean;
}

export declare const mainCategories: CategorySeed[];
export declare const categoryFilters: Record<string, unknown[]>;
export declare const seedCities: string[];
