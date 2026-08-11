import { useAuthStore } from "@/stores/authStore";
import { useApiMutation } from "@/hooks/useGenericApi";
import { AUTH_API_ENDPOINTS } from "./endpoints";
import {
  LoginRequest,
  CompanySignupRequest,
  ForgotPasswordRequest,
  OtpVerificationRequest,
  AuthResponse,
} from "./types";

export function useLoginMutation() {
  const { setAuthSuccess, setAuthError, clearMessages } = useAuthStore();

  return useApiMutation<AuthResponse, Error, LoginRequest>(
    AUTH_API_ENDPOINTS.LOGIN,
    {
      method: "POST",
      options: {
        onMutate: () => {
          clearMessages();
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
      },
    }
  );
}

export function useSignupCompanyMutation() {
  const { setPendingUser, setAuthError, clearMessages } = useAuthStore();

  return useApiMutation<AuthResponse, Error, CompanySignupRequest>(
    AUTH_API_ENDPOINTS.SIGNUP_COMPANY,
    {
      method: "POST",
      options: {
        onMutate: () => {
          clearMessages();
        },
        onSuccess: (data, variables) => {
          setPendingUser(variables.adminUserId, data.message ?? "Registration successful!");
        },
        onError: (error: Error) => {
          setAuthError(error.message);
        },
      },
    }
  );
}

export function useRequestPasswordResetMutation() {
  const { setPendingUser, setAuthError, clearMessages } = useAuthStore();

  return useApiMutation<AuthResponse, Error, ForgotPasswordRequest>(
    AUTH_API_ENDPOINTS.FORGOT_PASSWORD,
    {
      method: "POST",
      options: {
        onMutate: () => {
          clearMessages();
        },
        onSuccess: (data, variables) => {
          setPendingUser(variables.userId, data.message ?? "Password reset code sent!");
        },
        onError: (error: Error) => {
          setAuthError(error.message);
        },
      },
    }
  );
}

export function useVerifyOtpMutation() {
  const { setOtpVerified, setAuthError, clearMessages } = useAuthStore();

  return useApiMutation<AuthResponse, Error, OtpVerificationRequest>(
    AUTH_API_ENDPOINTS.VERIFY_OTP,
    {
      method: "POST",
      options: {
        onMutate: () => {
          clearMessages();
        },
        onSuccess: (data) => {
          setOtpVerified(data.message ?? "OTP verified!");
        },
        onError: (error: Error) => {
          setAuthError(error.message);
        },
      },
    }
  );
}
