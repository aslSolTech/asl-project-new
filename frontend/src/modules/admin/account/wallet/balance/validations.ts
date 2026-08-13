import { z } from "zod";

export const balanceSchema = z.object({
  walletType: z.string().min(1, "Wallet Type is required!"),
  balance: z.number({ message: "Balance is required!" }).min(1, "Balance is required!"),
  trxnDescription: z.string().min(1, "Transaction Description is required!"),
  trxnDate: z.string().min(1, "Transaction Date is required!"),
});

export type BalanceFormInput = z.infer<typeof balanceSchema>;

export const walletTypeSchema = z.object({
  name: z.string().min(2, "Wallet Type Name must be at least 2 characters!"),
  code: z.string().min(2, "Wallet Type Code must be at least 2 characters!").regex(/^[a-z0-9_-]+$/, "Code must be lowercase alphanumeric, hyphens, or underscores only!"),
  status: z.boolean({ message: "Status is required!" }),
});

export type WalletTypeFormInput = z.infer<typeof walletTypeSchema>;
