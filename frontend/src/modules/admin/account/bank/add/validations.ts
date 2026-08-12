import { z } from "zod";

export const addSchema = z.object({
  bankName: z.string().min(1, "Bank Name is required"),
  accountNumber: z.string().min(1, "Account Number is required"),
  status: z.string().min(1, "Status is required"),
});

export type AddFormInput = z.infer<typeof addSchema>;
