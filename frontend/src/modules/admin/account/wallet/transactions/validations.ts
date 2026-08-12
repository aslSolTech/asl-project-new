import { z } from "zod";

export const transactionsSchema = z.object({
  txId: z.string().min(1, "Transaction ID is required"),
  amount: z.string().min(1, "Amount is required"),
  status: z.string().min(1, "Status is required"),
});

export type TransactionsFormInput = z.infer<typeof transactionsSchema>;
