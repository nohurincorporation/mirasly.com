import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { MockAuthGuard, PermissionGuard } from "../auth/guards";
import { CommerceController } from "./commerce.controller";
import { CommerceService } from "./commerce.service";

@Module({ imports: [AuthModule], controllers: [CommerceController], providers: [CommerceService, MockAuthGuard, PermissionGuard] })
export class CommerceModule {}
