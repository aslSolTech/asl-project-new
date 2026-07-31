export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    SIGNUP_COMPANY: "/auth/signup-company",
    FORGOT_PASSWORD: "/auth/forgot-password",
    VERIFY_OTP: "/auth/verify-otp",
    RESEND_OTP: "/auth/resend-otp",
    ME: "/auth/me",
    LOGOUT: "/auth/logout",
  },
  CONTACT: {
    SUBMIT: "/contact",
  },
} as const;
