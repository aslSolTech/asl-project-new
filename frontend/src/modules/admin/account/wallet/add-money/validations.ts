import { z } from "zod";

export const addMoneySchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  paymentMethod: z.string().min(1, "Payment Method is required"),
  status: z.string().min(1, "Status is required"),
});

export type AddMoneyFormInput = z.infer<typeof addMoneySchema>;
