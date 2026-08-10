import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { authService } from "@/modules/auth/services";
import {
  LoginRequest,
  CompanySignupRequest,
  ForgotPasswordRequest,
  OtpVerificationRequest,
} from "@/modules/auth/types";

export function useLoginMutation() {
  const { setAuthSuccess, setAuthError, clearMessages } = useAuthStore();

  return useMutation({
    mutationFn: (payload: LoginRequest) => {
      clearMessages();
      return authService.login(payload);
    },
    onSuccess: (data) => {
      if (data.token) {
        localStorage.setItem("auth_token", data.token);
      }
      setAuthSuccess(data.user ?? null, data.token ?? null, data.message ?? "Login successful!");
    },
    onError: (error: Error) => {
      setAuthError(error.message);
    },
  });
}

export function useSignupCompanyMutation() {
  const { setPendingUser, setAuthError, clearMessages } = useAuthStore();

  return useMutation({
    mutationFn: (payload: CompanySignupRequest) => {
      clearMessages();
      return authService.signupCompany(payload);
    },
    onSuccess: (data, variables) => {
      setPendingUser(variables.adminUserId, data.message ?? "Registration successful!");
    },
    onError: (error: Error) => {
      setAuthError(error.message);
    },
  });
}

export function useRequestPasswordResetMutation() {
  const { setPendingUser, setAuthError, clearMessages } = useAuthStore();

  return useMutation({
    mutationFn: (payload: ForgotPasswordRequest) => {
      clearMessages();
      return authService.requestPasswordReset(payload);
    },
    onSuccess: (data, variables) => {
      setPendingUser(variables.userId, data.message ?? "Password reset code sent!");
    },
    onError: (error: Error) => {
      setAuthError(error.message);
    },
  });
}

export function useVerifyOtpMutation() {
  const { setOtpVerified, setAuthError, clearMessages } = useAuthStore();

  return useMutation({
    mutationFn: (payload: OtpVerificationRequest) => {
      clearMessages();
      return authService.verifyOtp(payload);
    },
    onSuccess: (data) => {
      setOtpVerified(data.message ?? "OTP verified!");
    },
    onError: (error: Error) => {
      setAuthError(error.message);
    },
  });
}
