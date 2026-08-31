import { z } from "zod";

export const requestsSchema = z.object({
  requestId: z.string().optional(),
  requestAmount: z.union([z.string().min(1, "Request amount is required"), z.number().min(1)]),
  requestFrom: z.string().default("Admin"),
  bankName: z.string().min(1, "Bank Name / Beneficiary is required"),
  transactionId: z.string().min(1, "Transaction ID / UTR is required"),
  paymentBy: z.string().min(1, "Payment By method is required"),
  depositDate: z.string().min(1, "Deposit date is required"),
  remarks: z.string().optional(),
  status: z.string().default("Pending"),
});

export type RequestsFormInput = z.infer<typeof requestsSchema>;
