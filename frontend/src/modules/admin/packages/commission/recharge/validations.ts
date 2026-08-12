import { z } from "zod";

export const rechargeSchema = z.object({
  packageName: z.string().min(1, "Package Name is required"),
  rate: z.string().min(1, "Rate is required"),
  status: z.string().min(1, "Status is required"),
});

export type RechargeFormInput = z.infer<typeof rechargeSchema>;
