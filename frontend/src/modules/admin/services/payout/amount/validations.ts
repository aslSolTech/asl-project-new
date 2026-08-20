import { z } from "zod";

export const amountSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  api: z.string().min(1, "API Partner is required"),
  status: z.string().min(1, "Status is required"),
});

export type AmountFormInput = z.infer<typeof amountSchema>;
