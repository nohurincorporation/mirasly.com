import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MockAuthGuard, PermissionGuard } from "./guards";

@Module({
  controllers: [AuthController],
  providers: [AuthService, MockAuthGuard, PermissionGuard],
  exports: [AuthService, MockAuthGuard, PermissionGuard],
})
export class AuthModule {}
