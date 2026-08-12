import { z } from "zod";

export const balanceSchema = z.object({
  apiPartner: z.string().min(1, "API Partner is required"),
  balance: z.string().min(1, "Balance is required"),
  status: z.string().min(1, "Status is required"),
});

export type BalanceFormInput = z.infer<typeof balanceSchema>;
