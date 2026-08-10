import { axiosClient } from "@/lib/axios/axios-client";
import {
  LoginRequest,
  CompanySignupRequest,
  ForgotPasswordRequest,
  OtpVerificationRequest,
  AuthResponse,
} from "./types";

export const AUTH_API_ENDPOINTS = {
  LOGIN: "/auth/login",
  SIGNUP_COMPANY: "/auth/signup-company",
  FORGOT_PASSWORD: "/auth/forgot-password",
  VERIFY_OTP: "/auth/verify-otp",
  RESEND_OTP: "/auth/resend-otp",
  ME: "/auth/me",
  LOGOUT: "/auth/logout",
} as const;

export const authService = {
  login: async (payload: LoginRequest): Promise<AuthResponse> => {
    const { data } = await axiosClient.post<AuthResponse>(AUTH_API_ENDPOINTS.LOGIN, payload);
    return data;
  },

  signupCompany: async (payload: CompanySignupRequest): Promise<AuthResponse> => {
    const { data } = await axiosClient.post<AuthResponse>(AUTH_API_ENDPOINTS.SIGNUP_COMPANY, payload);
    return data;
  },

  requestPasswordReset: async (payload: ForgotPasswordRequest): Promise<AuthResponse> => {
    const { data } = await axiosClient.post<AuthResponse>(AUTH_API_ENDPOINTS.FORGOT_PASSWORD, payload);
    return data;
  },

  verifyOtp: async (payload: OtpVerificationRequest): Promise<AuthResponse> => {
    const { data } = await axiosClient.post<AuthResponse>(AUTH_API_ENDPOINTS.VERIFY_OTP, payload);
    return data;
  },

  resendOtp: async (userId: string): Promise<AuthResponse> => {
    const { data } = await axiosClient.post<AuthResponse>(AUTH_API_ENDPOINTS.RESEND_OTP, { userId });
    return data;
  },
};
