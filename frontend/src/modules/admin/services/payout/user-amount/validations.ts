import { z } from "zod";

export const userAmountSchema = z.object({
  user: z.string().min(1, "User is required"),
  amount: z.string().min(1, "Amount is required"),
  status: z.string().min(1, "Status is required"),
});

export type UserAmountFormInput = z.infer<typeof userAmountSchema>;
