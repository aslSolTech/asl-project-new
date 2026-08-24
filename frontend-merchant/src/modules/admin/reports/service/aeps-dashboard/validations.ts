import { z } from "zod";

export const aepsDashboardSchema = z.object({
  metric: z.string().min(1, "Metric is required"),
  value: z.string().min(1, "Value is required"),
  status: z.string().min(1, "Status is required"),
});

export type AepsDashboardFormInput = z.infer<typeof aepsDashboardSchema>;
