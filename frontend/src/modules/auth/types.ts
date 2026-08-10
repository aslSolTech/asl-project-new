import type {
  LoginSchemaType,
  CompanySignupSchemaType,
  ForgotPasswordSchemaType,
  OtpVerificationSchemaType,
} from "./validations";

export type {
  LoginSchemaType,
  CompanySignupSchemaType,
  ForgotPasswordSchemaType,
  OtpVerificationSchemaType,
};

// Form data aliases
export type LoginFormData = LoginSchemaType;
export type CompanySignupFormData = CompanySignupSchemaType;
export type ForgotPasswordFormData = ForgotPasswordSchemaType;
export type OtpVerificationFormData = OtpVerificationSchemaType;

// Service Request Payload Types
export type LoginRequest = LoginSchemaType;
export type CompanySignupRequest = CompanySignupSchemaType;
export type ForgotPasswordRequest = ForgotPasswordSchemaType;
export type OtpVerificationRequest = OtpVerificationSchemaType & { userId?: string };

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

  login: (data: LoginFormData) => Promise<boolean>;
  signupCompany: (data: CompanySignupFormData) => Promise<boolean>;
  requestPasswordReset: (data: ForgotPasswordFormData) => Promise<boolean>;
  verifyOtp: (data: OtpVerificationFormData & { userId?: string }) => Promise<boolean>;
  resendOtp: (userId: string) => Promise<boolean>;
  clearMessages: () => void;
  logout: () => void;
}
