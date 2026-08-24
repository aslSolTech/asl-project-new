import { z } from "zod";

export const notificationsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  status: z.string().min(1, "Status is required"),
});

export type NotificationsFormInput = z.infer<typeof notificationsSchema>;
