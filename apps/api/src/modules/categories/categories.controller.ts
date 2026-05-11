import { Controller, Get, Param, Query } from "@nestjs/common";
import { CategoriesService } from "./categories.service";

@Controller("categories")
export class CategoriesController {
  constructor(private readonly categories: CategoriesService) {}

  @Get()
  list(@Query("locale") locale = "tk") {
    return this.categories.list(locale);
  }

  @Get("tree")
  tree(@Query("locale") locale = "tk") {
    return this.categories.tree(locale);
  }

  @Get(":slug/filters")
  filters(@Param("slug") slug: string) {
    return this.categories.filters(slug);
  }
}
