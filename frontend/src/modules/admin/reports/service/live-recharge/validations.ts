import { z } from "zod";

export const liveRechargeSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  status: z.string().min(1, "Status is required"),
});

export type LiveRechargeFormInput = z.infer<typeof liveRechargeSchema>;
