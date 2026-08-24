import { z } from "zod";

export const dailySaleSchema = z.object({
  date: z.string().min(1, "Date is required"),
  sales: z.string().min(1, "Sales is required"),
  status: z.string().min(1, "Status is required"),
});

export type DailySaleFormInput = z.infer<typeof dailySaleSchema>;
