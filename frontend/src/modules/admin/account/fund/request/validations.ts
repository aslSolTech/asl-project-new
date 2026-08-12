import { z } from "zod";

export const requestSchema = z.object({
  bankName: z.string().min(1, "Bank is required"),
  amount: z.string().min(1, "Amount is required"),
  status: z.string().min(1, "Status is required"),
});

export type RequestFormInput = z.infer<typeof requestSchema>;
