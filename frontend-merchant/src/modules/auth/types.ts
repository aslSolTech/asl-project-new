import type {
  LoginSchemaType,
  ForgotPasswordSchemaType,
  OtpVerificationSchemaType,
  ResetPasswordSchemaType,
} from "./validations";

export type {
  LoginSchemaType,
  ForgotPasswordSchemaType,
  OtpVerificationSchemaType,
  ResetPasswordSchemaType,
};

export type { MerchantRole } from "./constants";

// Form data aliases
export type LoginFormData = LoginSchemaType;
export type ForgotPasswordFormData = ForgotPasswordSchemaType;
export type OtpVerificationFormData = OtpVerificationSchemaType;
export type ResetPasswordFormData = ResetPasswordSchemaType;

// Service Request Payload Types
export type LoginRequest = LoginSchemaType;
export type ForgotPasswordRequest = ForgotPasswordSchemaType;
export type OtpVerificationRequest = OtpVerificationSchemaType & { userId?: string };
export type ResetPasswordRequest = ResetPasswordSchemaType;


// Auth User & Response Interfaces
export interface AuthUser {
  id: string;
  userId: string;
  email?: string;
  companyName?: string;
  role?: string;
}

export type UserProfile = AuthUser;

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: AuthUser;
}

// Auth Store State Interface
export interface AuthState {
  user: UserProfile | null;
  token: string | null;
  pendingUserId: string | null;
  otpSent: boolean;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;

  // Actions
  setAuthSuccess: (user: UserProfile | null, token: string | null, message: string) => void;
  setPendingUser: (userId: string, message: string) => void;
  setOtpVerified: (message: string) => void;
  setAuthError: (error: string) => void;

  clearMessages: () => void;
  logout: () => void;
}
