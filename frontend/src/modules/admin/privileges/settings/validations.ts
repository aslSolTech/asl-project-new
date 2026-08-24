import { z } from "zod";

export const settingsSchema = z.object({
  role: z.string().min(1, "Role is required"),
  access: z.string().min(1, "Access Level is required"),
  status: z.string().min(1, "Status is required"),
});

export type SettingsFormInput = z.infer<typeof settingsSchema>;
