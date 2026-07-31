import { create } from "zustand";
import {
  LoginFormData,
  CompanySignupFormData,
  ForgotPasswordFormData,
  AuthState,
} from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";


export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  pendingUserId: null,
  otpSent: false,
  isLoading: false,
  error: null,
  successMessage: null,

  setAuthSuccess: (user, token, message) =>
    set({ user, token, successMessage: message, error: null, isLoading: false }),

  setPendingUser: (userId, message) =>
    set({ pendingUserId: userId, otpSent: true, successMessage: message, error: null, isLoading: false }),

  setOtpVerified: (message) =>
    set({ otpSent: false, successMessage: message, error: null, isLoading: false }),

  setAuthError: (error) =>
    set({ error, isLoading: false, successMessage: null }),

  clearMessages: () => set({ error: null, successMessage: null }),

  logout: () =>
    set({
      user: null,
      token: null,
      pendingUserId: null,
      otpSent: false,
      error: null,
      successMessage: null,
    }),

  login: async (data: LoginFormData) => {
    set({ isLoading: true, error: null, successMessage: null });
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message ?? "Failed to login. Please check your User ID and Password.");
      }

      set({
        user: resData.user ?? { id: "1", userId: data.userId },
        token: resData.token ?? "dummy-jwt-token",
        isLoading: false,
        successMessage: "Login successful!",
      });
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unable to connect to Express backend server.";
      console.warn("Express API offline or failed, simulating fallback login response", message);
      set({
        isLoading: false,
        error: message,
      });
      return false;
    }
  },

  signupCompany: async (data: CompanySignupFormData) => {
    set({ isLoading: true, error: null, successMessage: null });
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup-company`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message ?? "Company onboarding failed. Please try again.");
      }

      set({
        pendingUserId: data.adminUserId,
        otpSent: true,
        isLoading: false,
        successMessage: "Company registered! Please verify OTP sent to admin email.",
      });
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unable to connect to Express backend server.";
      console.warn("Express API offline or failed", message);
      set({
        isLoading: false,
        error: message,
      });
      return false;
    }
  },

  requestPasswordReset: async (data: ForgotPasswordFormData) => {
    set({ isLoading: true, error: null, successMessage: null });
    try {
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message ?? "User ID not found or server error.");
      }

      set({
        pendingUserId: data.userId,
        otpSent: true,
        isLoading: false,
        successMessage: `OTP code has been sent to the account linked with User ID: ${data.userId}`,
      });
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unable to connect to Express backend server.";
      console.warn("Express API offline or failed", message);
      set({
        isLoading: false,
        error: message,
      });
      return false;
    }
  },

  verifyOtp: async (data) => {
    set({ isLoading: true, error: null, successMessage: null });
    const targetUserId = data.userId ?? get().pendingUserId;
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: targetUserId,
          otpCode: data.otpCode,
        }),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message ?? "Invalid OTP verification code.");
      }

      set({
        isLoading: false,
        otpSent: false,
        successMessage: "OTP verified successfully!",
      });
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Invalid OTP code or server offline.";
      console.warn("Express API offline or failed", message);
      set({
        isLoading: false,
        error: message,
      });
      return false;
    }
  },

  resendOtp: async (userId: string) => {
    set({ isLoading: true, error: null, successMessage: null });
    try {
      const response = await fetch(`${API_BASE_URL}/auth/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message ?? "Failed to resend OTP.");
      }

      set({
        isLoading: false,
        successMessage: "A new OTP code has been sent!",
      });
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to request new OTP.";
      set({
        isLoading: false,
        error: message,
      });
      return false;
    }
  },
}));
