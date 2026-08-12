import { z } from "zod";

export const deductSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  amount: z.string().min(1, "Amount is required"),
  status: z.string().min(1, "Status is required"),
});

export type DeductFormInput = z.infer<typeof deductSchema>;
