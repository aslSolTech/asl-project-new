import { z } from "zod";

export const transferSchema = z.object({
  apiUserId: z.number().min(1, "API User is required!"),
  trxnDate: z.string().min(1, "Trxn Date is required!"),
  transferType: z.string().min(1, "Transfer Type is required!"),
  walletType: z.string().min(1, "Wallet Type is required!"),
  amount: z.number().min(1, "Amount is required!"),
});

export type TransferFormInput = z.infer<typeof transferSchema>;
