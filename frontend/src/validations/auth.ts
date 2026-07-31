import { z } from "zod";

// Login Schema
export const loginSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().default(false),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

// Company Signup Schema
export const companySignupSchema = z
  .object({
    companyName: z.string().min(2, "Company name must be at least 2 characters"),
    businessType: z.string().min(1, "Please select a business type"),
    taxId: z.string().min(2, "Tax ID / GST / PAN is required"),
    companyEmail: z.email("Invalid email address"),
    companyPhone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
    adminFullName: z.string().min(2, "Admin full name is required"),
    adminUserId: z.string().min(3, "Admin User ID must be at least 3 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    agreeTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type CompanySignupSchemaType = z.infer<typeof companySignupSchema>;

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
