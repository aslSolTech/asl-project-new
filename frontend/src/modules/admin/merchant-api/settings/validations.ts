import { z } from "zod";

export const settingsSchema = z.object({
  key: z.string().min(1, "Key is required"),
  value: z.string().min(1, "Value is required"),
  status: z.string().min(1, "Status is required"),
});

export type SettingsFormInput = z.infer<typeof settingsSchema>;
