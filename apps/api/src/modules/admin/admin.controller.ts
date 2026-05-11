import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AdminService } from "./admin.service";

@Controller("admin")
export class AdminController {
  constructor(private readonly admin: AdminService) {}

  @Get("moderation/listings")
  listingsQueue() {
    return this.admin.listingsQueue();
  }

  @Post("moderation/listings/:id/approve")
  approve(@Param("id") id: string) {
    return this.admin.moderateListing(id, "approved");
  }

  @Post("moderation/listings/:id/reject")
  reject(@Param("id") id: string, @Body() body: { reason: string }) {
    return this.admin.moderateListing(id, "rejected", body.reason);
  }
}
