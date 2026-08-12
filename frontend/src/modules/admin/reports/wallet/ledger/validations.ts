import { z } from "zod";

export const ledgerSchema = z.object({
  type: z.string().min(1, "Type is required"),
  balance: z.string().min(1, "Balance is required"),
});

export type LedgerFormInput = z.infer<typeof ledgerSchema>;
