import { z } from "zod";

export const userLedgerSchema = z.object({
  type: z.string().min(1, "Type is required"),
  balance: z.string().min(1, "Balance is required"),
});

export type UserLedgerFormInput = z.infer<typeof userLedgerSchema>;
