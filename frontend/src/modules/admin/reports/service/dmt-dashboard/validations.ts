import { z } from "zod";

export const dmtDashboardSchema = z.object({
  metric: z.string().min(1, "Metric is required"),
  value: z.string().min(1, "Value is required"),
  status: z.string().min(1, "Status is required"),
});

export type DmtDashboardFormInput = z.infer<typeof dmtDashboardSchema>;
