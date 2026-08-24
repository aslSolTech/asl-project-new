import { z } from "zod";

export const transferSchema = z.object({
  recipient: z.string().min(1, "Recipient is required"),
  amount: z.string().min(1, "Amount is required"),
  status: z.string().min(1, "Status is required"),
});

export type TransferFormInput = z.infer<typeof transferSchema>;
