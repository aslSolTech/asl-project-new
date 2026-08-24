import { z } from "zod";

export const notificationsSchema = z.object({
  channel: z.string().min(1, "Channel is required"),
  enabled: z.string().min(1, "Enabled is required"),
  status: z.string().min(1, "Status is required"),
});

export type NotificationsFormInput = z.infer<typeof notificationsSchema>;
