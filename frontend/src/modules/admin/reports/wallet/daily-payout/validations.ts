import { z } from "zod";

export const dailyPayoutSchema = z.object({
  date: z.string().min(1, "Date is required"),
  payouts: z.string().min(1, "Payouts is required"),
  status: z.string().min(1, "Status is required"),
});

export type DailyPayoutFormInput = z.infer<typeof dailyPayoutSchema>;
