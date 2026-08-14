import { z } from "zod";

export const notificationSchema = z.object({
  title: z.string().min(1, "Notification Title is required!"),
  message: z.string().min(1, "Message is required!"),
  status: z.enum(["1", "0"], {message:"Status is required!"}),
});

export type NotificationFormInput = z.infer<typeof notificationSchema>;
