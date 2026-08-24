import { z } from "zod";

export const cronSettingSchema = z.object({
  cronName: z.string().trim().min(1, "Cron Name is required!"),
  schedule: z
    .string()
    .trim()
    .min(1, "Schedule is required!")
    .refine(
      (val) => {
        if (!val) return false;
        const normalized = val.trim().replace(/\s+/g, " ");
        const parts = normalized.split(" ");
        if (parts.length !== 5) return false;

        // Valid cron field: * OR */5 OR 1-5 OR 1,2,3 OR 5
        const cronRegex = /^(\*(\/\d+)?|\d+([,-]\d+)*)$/;
        return parts.every((p) => cronRegex.test(p));
      },
      {
        message: "Invalid cron expression! e.g. */5 * * * *",
      }
    ),
  endpoint: z.string().trim().min(1, "Target Endpoint is required!"),
  description: z.string().trim().min(1, "Description is required!"),
  isActive: z.boolean().default(true),
});

export type CronSettingFormInput = z.infer<typeof cronSettingSchema>;

