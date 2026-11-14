/**
 * App-wide feature flags, read from the environment.
 */
export const config = {
  /**
   * When false (the default), a new account is usable immediately after
   * signup: no verification email or code is sent. Set
   * REQUIRE_EMAIL_VERIFICATION=true to block login until the user's
   * emailVerified field is set.
   */
  requireEmailVerification: process.env.REQUIRE_EMAIL_VERIFICATION === "true",
};
