import { z } from "zod";

export const apiBalanceSchema = z.object({
  provider: z.string().min(1, "Provider Name is required"),
  endpoint: z.string().min(1, "Balance Endpoint is required"),
  currency: z.string().min(1, "Currency Code is required"),
});

export type ApiBalanceFormInput = z.infer<typeof apiBalanceSchema>;
