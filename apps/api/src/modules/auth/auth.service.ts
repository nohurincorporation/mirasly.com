export class AuthService {
  private readonly mockOtp = "111111";

  sendOtp(phone: string) { return { phone, provider: "mock", expiresInSeconds: 300, devCode: this.mockOtp }; }

  verifyOtp(phone: string, code: string) {
    if (code !== this.mockOtp) return { ok: false, error: { code: "invalid_otp", message: "OTP code is invalid" } };
    return { ok: true, user: { id: `usr-${phone.replace(/\D/g, "").slice(-6)}`, phone, roles: ["registered_user"] }, accessToken: "mock-access-token", refreshToken: `rft-${Date.now()}` };
  }

  rotateRefreshToken(refreshToken: string) {
    return { ok: true, rotated: true, revokedToken: refreshToken, accessToken: "mock-access-token", refreshToken: `rft-${Date.now()}` };
  }

  socialAuthStub(input: { provider: string; providerToken: string; email?: string }) {
    return { ok: true, mode: "stub", ...input, message: "Social/email auth provider wiring pending" };
  }

  listSessions(userId: string) { return [{ id: "sess-current", userId, deviceName: "Current device", current: true }]; }
  revokeSession(sessionId: string) { return { id: sessionId, revoked: true }; }
  logoutAllDevices(userId: string) { return { ok: true, userId, revokedSessions: 4 }; }
}
