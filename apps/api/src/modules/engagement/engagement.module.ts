import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { MockAuthGuard, PermissionGuard } from "../auth/guards";
import { EngagementController } from "./engagement.controller";
import { EngagementService } from "./engagement.service";

@Module({ imports: [AuthModule], controllers: [EngagementController], providers: [EngagementService, MockAuthGuard, PermissionGuard] })
export class EngagementModule {}
