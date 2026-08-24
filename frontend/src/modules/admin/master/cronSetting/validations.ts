import { z } from "zod";

export const cronSettingSchema = z.object({
  cronName: z.string().min(1, "Cron Name is required"),
  schedule: z.string().min(1, "Schedule is required"),
  endpoint: z.string().min(1, "Target Endpoint is required"),
  description: z.string().min(1, "Description is required"),
});

export type CronSettingFormInput = z.infer<typeof cronSettingSchema>;
