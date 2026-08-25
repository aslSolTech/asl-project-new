import { z } from "zod";

// Login Schema
export const loginSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().default(false),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

// Forgot Password Schema
export const forgotPasswordSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
});

export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;

// OTP Verification Schema
export const otpVerificationSchema = z.object({
  otpCode: z.string().length(6, "OTP must be exactly 6 digits").regex(/^\d+$/, "OTP must contain only numbers"),
});

export type OtpVerificationSchemaType = z.infer<typeof otpVerificationSchema>;

// Reset Password Schema for Retailer, Distributor & SuperDistributor
export const resetPasswordSchema = z
  .object({
    userId: z.string().min(1, "User ID is required"),
    role: z.enum(["retailer", "distributor", "superdistributor"], {
      message: "Please select a valid role",
    }).default("retailer"),
    otpCode: z.string().min(4, "OTP code must be at least 4 digits").max(6, "OTP code cannot exceed 6 digits").optional().or(z.literal("")),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;

