import { Body, Controller, Get, Post } from "@nestjs/common";
import { EngagementService } from "./engagement.service";

@Controller("me")
export class EngagementController {
  constructor(private readonly engagement: EngagementService) {}

  @Post("favorites")
  favorite(@Body() body: { listingId: string }) {
    return this.engagement.favorite(body.listingId);
  }

  @Post("saved-searches")
  saveSearch(@Body() body: unknown) {
    return this.engagement.saveSearch(body);
  }

  @Get("notifications")
  notifications() {
    return this.engagement.notifications();
  }
}
