import { z } from "zod";

export const notificationSchema = z.object({
  userTypeId: z.string().min(1, "User Type is required"),
  notificationTypeId: z.string().min(1, "Notification Type is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().optional(),
  status: z.enum(["Active", "Inactive"]).default("Active"),
  message: z.string().optional(),
});

export type NotificationFormInput = z.infer<typeof notificationSchema>;

export const notificationTypeSchema = z.object({
  name: z.string().min(1, "Type Name is required"),
  slug: z.string().min(1, "Slug / Code is required"),
  description: z.string().optional(),
  badgeColor: z.string().optional(),
  status: z.enum(["Active", "Inactive"]).default("Active"),
});

export type NotificationTypeFormInput = z.infer<typeof notificationTypeSchema>;
