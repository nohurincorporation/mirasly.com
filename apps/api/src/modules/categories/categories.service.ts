import { categoryFilters, mainCategories } from "../../../../../packages/db/src/seed-data.js";

export class CategoriesService {
  list(locale: string) {
    return mainCategories.map((category) => ({
      id: category.id,
      code: category.code,
      name: category.name[locale] ?? category.name.en,
      slug: category.slug[locale] ?? category.slug.en,
      icon: category.icon,
      featured: category.featured,
    }));
  }

  tree(locale: string) {
    return { items: this.list(locale), total: mainCategories.length };
  }

  filters(slugOrCode: string) {
    const category = mainCategories.find((item) => Object.values(item.slug).includes(slugOrCode) || item.code === slugOrCode);
    return categoryFilters[category?.code ?? "goods"] ?? categoryFilters.goods;
  }
}
