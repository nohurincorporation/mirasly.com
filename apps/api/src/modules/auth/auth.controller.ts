import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post("otp/send")
  sendOtp(@Body() body: { phone: string }) {
    return this.auth.sendOtp(body.phone);
  }

  @Post("otp/verify")
  verifyOtp(@Body() body: { phone: string; code: string }) {
    return this.auth.verifyOtp(body.phone, body.code);
  }

  @Get("sessions")
  sessions() {
    return this.auth.listSessions("current-user");
  }

  @Delete("sessions/:id")
  revoke(@Param("id") id: string) {
    return this.auth.revokeSession(id);
  }
}
