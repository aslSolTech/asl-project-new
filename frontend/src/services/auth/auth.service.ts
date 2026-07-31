import { axiosClient } from "@/lib/axiosConfig/axios-client";
import { API_ENDPOINTS } from "@/lib/axiosConfig/endpoints";
import {
  LoginRequest,
  CompanySignupRequest,
  ForgotPasswordRequest,
  OtpVerificationRequest,
  AuthResponse,
} from "./auth.types";

export const authService = {
  login: async (payload: LoginRequest): Promise<AuthResponse> => {
    const { data } = await axiosClient.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, payload);
    return data;
  },

  signupCompany: async (payload: CompanySignupRequest): Promise<AuthResponse> => {
    const { data } = await axiosClient.post<AuthResponse>(API_ENDPOINTS.AUTH.SIGNUP_COMPANY, payload);
    return data;
  },

  requestPasswordReset: async (payload: ForgotPasswordRequest): Promise<AuthResponse> => {
    const { data } = await axiosClient.post<AuthResponse>(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, payload);
    return data;
  },

  verifyOtp: async (payload: OtpVerificationRequest): Promise<AuthResponse> => {
    const { data } = await axiosClient.post<AuthResponse>(API_ENDPOINTS.AUTH.VERIFY_OTP, payload);
    return data;
  },

  resendOtp: async (userId: string): Promise<AuthResponse> => {
    const { data } = await axiosClient.post<AuthResponse>(API_ENDPOINTS.AUTH.RESEND_OTP, { userId });
    return data;
  },
};
