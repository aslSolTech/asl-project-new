import { z } from "zod";

export const amountSchema = z.object({
  userTypeId: z.string().min(1, "User Type is required!"),
  userId: z.string().optional().default("ALL"),
  amountFrom: z.coerce.number().min(0, "Amount From must be 0 or greater!"),
  amountTo: z.coerce.number().min(0.01, "Amount To must be greater than 0!"),
  providerName: z.string().min(1, "Provider name is required!"),
  fallback: z.string().optional().default(""),
  status: z.enum(["active", "inactive"]).default("active"),
}).refine((data) => data.amountTo >= data.amountFrom, {
  message: "Amount To must be greater than or equal to Amount From!",
  path: ["amountTo"],
});

export type AmountFormInput = z.infer<typeof amountSchema>;

