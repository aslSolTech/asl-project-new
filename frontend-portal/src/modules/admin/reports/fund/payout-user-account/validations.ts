import { z } from "zod";

export const payoutUserAccountSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  account: z.string().min(1, "Account is required"),
  status: z.string().min(1, "Status is required"),
});

export type PayoutUserAccountFormInput = z.infer<typeof payoutUserAccountSchema>;
