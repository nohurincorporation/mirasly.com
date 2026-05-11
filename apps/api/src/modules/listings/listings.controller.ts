import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { ListingsService } from "./listings.service";

@Controller("listings")
export class ListingsController {
  constructor(private readonly listings: ListingsService) {}

  @Post()
  create(@Body() body: unknown) {
    return this.listings.create(body);
  }

  @Get(":id")
  detail(@Param("id") id: string) {
    return this.listings.detail(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() body: unknown) {
    return this.listings.update(id, body);
  }

  @Post(":id/media")
  media(@Param("id") id: string) {
    return this.listings.presignMediaUpload(id);
  }
}
