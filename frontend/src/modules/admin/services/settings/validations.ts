import { z } from "zod";

export const settingsSchema = z.object({
  serviceName: z.string().min(1, "Service Name is required"),
  status: z.string().min(1, "Status is required"),
});

export type SettingsFormInput = z.infer<typeof settingsSchema>;
