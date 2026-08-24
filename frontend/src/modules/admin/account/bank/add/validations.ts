import { z } from "zod";

export const addSchema = z.object({
  bankName: z.string().min(1, "Bank Name is required!"),
  accountNumber: z.string().min(9, "Account Number should be at least 9 digits!").max(20, "Account Number should not exceed 20 digits!"),
  branchName: z.string().min(1, "Branch Name is required!"),
  ifscCode: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, {
      message: "Invalid IFSC code format!",
    }),
  accountHolderName: z.string().min(1, "Account Holder Name is required!"),
  status: z.boolean().refine(Boolean, "Status is required!"),
});

export type AddFormInput = z.infer<typeof addSchema>;
