import { z } from "zod";

export const historySchema = z.object({
  ip: z.string().min(1, "IP Address is required"),
  date: z.string().min(1, "Date is required"),
  status: z.string().min(1, "Status is required"),
});

export type HistoryFormInput = z.infer<typeof historySchema>;
