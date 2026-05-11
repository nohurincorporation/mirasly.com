import { Controller, Get, Query } from "@nestjs/common";
import { SearchService } from "./search.service";

@Controller("search")
export class SearchController {
  constructor(private readonly search: SearchService) {}

  @Get("listings")
  listings(@Query() query: Record<string, string>) {
    return this.search.listings(query);
  }

  @Get("suggestions")
  suggestions(@Query("q") query = "") {
    return this.search.suggestions(query);
  }
}
