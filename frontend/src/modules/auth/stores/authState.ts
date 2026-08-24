import { create } from "zustand";
import { AuthState } from "../types";

export const useAuthState = create<AuthState>((set) => ({
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
}));
