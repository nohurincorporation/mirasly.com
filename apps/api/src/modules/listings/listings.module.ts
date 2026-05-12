import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { MockAuthGuard, PermissionGuard } from "../auth/guards";
import { ListingsController } from "./listings.controller";
import { ListingsService } from "./listings.service";

@Module({ imports: [AuthModule], controllers: [ListingsController], providers: [ListingsService, MockAuthGuard, PermissionGuard] })
export class ListingsModule {}
