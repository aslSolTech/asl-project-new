import { z } from "zod";

export const tdsSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  status: z.string().min(1, "Status is required"),
});

export type TdsFormInput = z.infer<typeof tdsSchema>;
