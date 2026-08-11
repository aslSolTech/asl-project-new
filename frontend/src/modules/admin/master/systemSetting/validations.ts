import { z } from "zod";

export const systemSettingSchema = z.object({
  settingKey: z.string().min(1, "Setting Key is required"),
  settingValue: z.string().min(1, "Setting Value is required"),
  description: z.string().min(1, "Description is required"),
});

export type SystemSettingFormInput = z.infer<typeof systemSettingSchema>;
