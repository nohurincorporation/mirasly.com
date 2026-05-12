import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { IsOptional, IsString, Length } from "class-validator";
import { AuthService } from "./auth.service";
import { MockAuthGuard, PermissionGuard, RequirePermission } from "./guards";

class SendOtpDto { @IsString() phone!: string; }
class VerifyOtpDto { @IsString() phone!: string; @IsString() @Length(6, 6) code!: string; }
class RefreshTokenDto { @IsString() refreshToken!: string; }
class SocialAuthDto { @IsString() provider!: string; @IsString() providerToken!: string; @IsOptional() @IsString() email?: string; }

@Controller("auth")
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post("otp/send") sendOtp(@Body() body: SendOtpDto) { return this.auth.sendOtp(body.phone); }
  @Post("otp/verify") verifyOtp(@Body() body: VerifyOtpDto) { return this.auth.verifyOtp(body.phone, body.code); }
  @Post("refresh") refresh(@Body() body: RefreshTokenDto) { return this.auth.rotateRefreshToken(body.refreshToken); }
  @Post("social") social(@Body() body: SocialAuthDto) { return this.auth.socialAuthStub(body); }

  @UseGuards(MockAuthGuard, PermissionGuard)
  @RequirePermission("auth.session.read")
  @Get("sessions") sessions() { return this.auth.listSessions("current-user"); }

  @UseGuards(MockAuthGuard, PermissionGuard)
  @RequirePermission("auth.session.revoke")
  @Delete("sessions/:id") revoke(@Param("id") id: string) { return this.auth.revokeSession(id); }

  @UseGuards(MockAuthGuard, PermissionGuard)
  @RequirePermission("auth.session.revoke")
  @Delete("sessions") logoutAll() { return this.auth.logoutAllDevices("current-user"); }
}
