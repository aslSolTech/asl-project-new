import { z } from "zod";

export const qrLedgerSchema = z.object({
  type: z.string().min(1, "Type is required"),
  balance: z.string().min(1, "Balance is required"),
});

export type QrLedgerFormInput = z.infer<typeof qrLedgerSchema>;
