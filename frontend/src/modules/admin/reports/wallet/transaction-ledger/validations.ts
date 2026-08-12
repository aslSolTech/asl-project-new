import { z } from "zod";

export const transactionLedgerSchema = z.object({
  type: z.string().min(1, "Type is required"),
  balance: z.string().min(1, "Balance is required"),
});

export type TransactionLedgerFormInput = z.infer<typeof transactionLedgerSchema>;
