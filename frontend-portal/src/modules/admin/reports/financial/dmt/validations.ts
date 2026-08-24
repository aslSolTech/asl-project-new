import { z } from "zod";

export const dmtSchema = z.object({
  txId: z.string().min(1, "Transaction ID is required"),
  amount: z.string().min(1, "Amount is required"),
  status: z.string().min(1, "Status is required"),
});

export type DmtFormInput = z.infer<typeof dmtSchema>;
