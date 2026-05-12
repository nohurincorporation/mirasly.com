import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { IsBoolean, IsOptional, IsString } from "class-validator";
import { MockAuthGuard, PermissionGuard, RequirePermission } from "../auth/guards";
import { EngagementService } from "./engagement.service";

class FavoriteDto { @IsString() listingId!: string; @IsOptional() @IsString() collectionId?: string; }
class SavedSearchDto { @IsString() query!: string; @IsOptional() @IsBoolean() paused?: boolean; }

@UseGuards(MockAuthGuard, PermissionGuard)
@RequirePermission("user.write")
@Controller("me")
export class EngagementController {
  constructor(private readonly engagement: EngagementService) {}
  @Post("favorites") favorite(@Body() body: FavoriteDto) { return this.engagement.favorite(body); }
  @Delete("favorites/:listingId") unfavorite(@Param("listingId") listingId: string) { return this.engagement.unfavorite(listingId); }
  @Get("favorites") listFavorites() { return this.engagement.listFavorites(); }
  @Get("favorite-collections") collections() { return this.engagement.collections(); }
  @Post("saved-searches") saveSearch(@Body() body: SavedSearchDto) { return this.engagement.saveSearch(body); }
  @Patch("saved-searches/:id") updateSaved(@Param("id") id: string, @Body() body: SavedSearchDto) { return this.engagement.updateSavedSearch(id, body); }
  @Post("saved-searches/:id/pause") pauseSaved(@Param("id") id: string) { return this.engagement.pauseSavedSearch(id); }
  @Delete("saved-searches/:id") deleteSaved(@Param("id") id: string) { return this.engagement.deleteSavedSearch(id); }
  @Get("saved-searches/:id/matches") matches(@Param("id") id: string) { return this.engagement.savedSearchMatches(id); }
  @Get("notifications") notifications() { return this.engagement.notifications(); }
  @Post("notifications/:id/read") markRead(@Param("id") id: string) { return this.engagement.markNotificationRead(id); }
  @Patch("notification-preferences") prefs(@Body() body: unknown) { return this.engagement.updateNotificationPreferences(body); }
}
