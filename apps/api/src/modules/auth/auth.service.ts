export class AuthService {
  private readonly mockOtp = "111111";

  sendOtp(phone: string) {
    return {
      phone,
      provider: "mock",
      expiresInSeconds: 300,
      devCode: this.mockOtp,
    };
  }

  verifyOtp(phone: string, code: string) {
    if (code !== this.mockOtp) {
      return { ok: false, error: "invalid_otp" };
    }

    return {
      ok: true,
      user: { id: `usr-${phone.replace(/\D/g, "").slice(-6)}`, phone, roles: ["registered_user"] },
      accessToken: "mock-access-token",
      refreshToken: "mock-refresh-token",
    };
  }

  listSessions(userId: string) {
    return [{ id: "sess-current", userId, deviceName: "Current device", current: true }];
  }

  revokeSession(sessionId: string) {
    return { id: sessionId, revoked: true };
  }
}
