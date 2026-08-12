import { z } from "zod";

export const twoFactorAuthSchema = z.object({
  method: z.string().min(1, "Method is required"),
  status: z.string().min(1, "Status is required"),
});

export type TwoFactorAuthFormInput = z.infer<typeof twoFactorAuthSchema>;
