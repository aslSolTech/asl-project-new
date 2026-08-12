import { z } from "zod";

export const balanceSchema = z.object({
  balance: z.string().min(1, "Balance is required"),
  currency: z.string().min(1, "Currency is required"),
  status: z.string().min(1, "Status is required"),
});

export type BalanceFormInput = z.infer<typeof balanceSchema>;
