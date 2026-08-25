import { z } from "zod";
export const merchantProfileSchema = z.object({
  name: z.string().trim().min(1, "Full Name is required!"),
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters!")
    .regex(/^[a-zA-Z0-9._-]+$/, "Username can only contain alphanumeric characters, dots, underscores, and dashes!"),
  email: z.email("Invalid email address!").min(1, "Email is required!"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone Number is required!")
    .regex(/^[+]?[0-9\s-]{10,15}$/, "Invalid phone number format!"),
  designation: z.string().trim().min(1, "Designation is required!"),
  department: z.string().trim().min(1, "Department is required!"),
  location: z.string().trim().min(1, "Location is required!"),
  bio: z.string().trim().optional(),
});

export type MerchantProfileFormInput = z.infer<typeof merchantProfileSchema>;

export const merchantChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current Password is required!"),
    newPassword: z
      .string()
      .min(6, "New Password must be at least 6 characters!")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter!")
      .regex(/\d/, "Must contain at least one number!"),
    confirmPassword: z.string().min(1, "Confirm Password is required!"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New password and Confirm password do not match!",
    path: ["confirmPassword"],
  });

export type MerchantChangePasswordFormInput = z.infer<typeof merchantChangePasswordSchema>;