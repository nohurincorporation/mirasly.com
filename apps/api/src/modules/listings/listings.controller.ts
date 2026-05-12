import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { IsOptional, IsString } from "class-validator";
import { MockAuthGuard, PermissionGuard, RequirePermission } from "../auth/guards";
import { ListingsService } from "./listings.service";

class ReportListingDto { @IsString() reason!: string; @IsOptional() @IsString() note?: string; }

@UseGuards(MockAuthGuard, PermissionGuard)
@RequirePermission("listing.write")
@Controller("listings")
export class ListingsController {
  constructor(private readonly listings: ListingsService) {}
  @Post() create(@Body() body: unknown) { return this.listings.create(body); }
  @Get(":id") detail(@Param("id") id: string) { return this.listings.detail(id); }
  @Patch(":id") update(@Param("id") id: string, @Body() body: unknown) { return this.listings.update(id, body); }
  @Post(":id/media") media(@Param("id") id: string) { return this.listings.presignMediaUpload(id); }
  @Post(":id/pause") pause(@Param("id") id: string) { return this.listings.transition(id, "paused"); }
  @Post(":id/renew") renew(@Param("id") id: string) { return this.listings.transition(id, "active"); }
  @Post(":id/mark-sold") markSold(@Param("id") id: string) { return this.listings.transition(id, "sold"); }
  @Post(":id/mark-rented") markRented(@Param("id") id: string) { return this.listings.transition(id, "rented"); }
  @Post(":id/promote") promote(@Param("id") id: string) { return this.listings.promote(id); }
  @Post(":id/report") report(@Param("id") id: string, @Body() body: ReportListingDto) { return this.listings.report(id, body); }
  @Post(":id/share") share(@Param("id") id: string) { return this.listings.shareHook(id); }
}
