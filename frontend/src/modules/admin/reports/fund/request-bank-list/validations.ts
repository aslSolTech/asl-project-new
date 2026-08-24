import { z } from "zod";

export const requestBankListSchema = z.object({
  bankName: z.string().min(1, "Bank Name is required"),
  code: z.string().min(1, "Code is required"),
  status: z.string().min(1, "Status is required"),
});

export type RequestBankListFormInput = z.infer<typeof requestBankListSchema>;
