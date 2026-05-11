import { Body, Controller, Get, Post } from "@nestjs/common";
import { CommerceService } from "./commerce.service";

@Controller("commerce")
export class CommerceController {
  constructor(private readonly commerce: CommerceService) {}

  @Post("shops")
  createShop(@Body() body: unknown) {
    return this.commerce.createShop(body);
  }

  @Post("places")
  createPlace(@Body() body: unknown) {
    return this.commerce.createPlace(body);
  }

  @Post("checkout")
  checkout(@Body() body: unknown) {
    return this.commerce.checkout(body);
  }

  @Get("promotions")
  promotions() {
    return this.commerce.promotions();
  }
}
