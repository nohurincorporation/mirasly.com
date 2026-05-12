import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { MockAuthGuard, PermissionGuard, RequirePermission } from "../auth/guards";
import { CommerceService } from "./commerce.service";

class CartItemDto { @IsString() sku!: string; @IsNumber() qty!: number; @IsOptional() @IsString() note?: string; }

@UseGuards(MockAuthGuard, PermissionGuard)
@Controller("commerce")
export class CommerceController {
  constructor(private readonly commerce: CommerceService) {}
  @RequirePermission("shop.write") @Post("shops") createShop(@Body() body: unknown) { return this.commerce.createShop(body); }
  @RequirePermission("place.write") @Post("places") createPlace(@Body() body: unknown) { return this.commerce.createPlace(body); }
  @RequirePermission("order.write") @Post("checkout") checkout(@Body() body: unknown) { return this.commerce.checkout(body); }
  @RequirePermission("promotion.buy") @Get("promotions") promotions() { return this.commerce.promotions(); }
  @RequirePermission("order.write") @Post("cart/items") addCart(@Body() body: CartItemDto) { return this.commerce.addCartItem(body); }
  @RequirePermission("order.write") @Patch("cart/items/:id") updateCart(@Param("id") id: string, @Body() body: CartItemDto) { return this.commerce.updateCartItem(id, body); }
  @RequirePermission("order.write") @Delete("cart/items/:id") deleteCart(@Param("id") id: string) { return this.commerce.deleteCartItem(id); }
  @RequirePermission("order.read") @Get("cart/items") listCart() { return this.commerce.listCartItems(); }
  @RequirePermission("order.write") @Post("orders/:id/status") orderStatus(@Param("id") id: string, @Body() body: { status: string }) { return this.commerce.transitionOrder(id, body.status); }
  @RequirePermission("order.read") @Get("orders/buyer") buyerOrders() { return this.commerce.listBuyerOrders(); }
  @RequirePermission("order.write") @Get("orders/seller") sellerOrders() { return this.commerce.listSellerOrders(); }
  @RequirePermission("promotion.buy") @Post("promotions/purchase") purchasePromotion(@Body() body: unknown) { return this.commerce.purchasePromotion(body); }
  @RequirePermission("shop.write") @Post("shops/:id/follow") followShop(@Param("id") id: string) { return this.commerce.follow("shop", id); }
  @RequirePermission("shop.write") @Delete("shops/:id/follow") unfollowShop(@Param("id") id: string) { return this.commerce.unfollow("shop", id); }
  @RequirePermission("place.write") @Post("places/:id/claim") claimPlace(@Param("id") id: string, @Body() body: unknown) { return this.commerce.claimPlace(id, body); }
  @RequirePermission("place.write") @Post("places/:id/reviews") createReview(@Param("id") id: string, @Body() body: unknown) { return this.commerce.createReview(id, body); }
  @RequirePermission("listing.moderate") @Patch("places/:id/reviews/:reviewId/moderate") moderateReview(@Param("id") id: string, @Param("reviewId") reviewId: string, @Body() body: { state: string }) { return this.commerce.moderateReview(id, reviewId, body.state); }
}
