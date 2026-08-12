import { z } from "zod";

export const payoutSchema = z.object({
  service: z.string().min(1, "Service is required"),
  api: z.string().min(1, "API Partner is required"),
  status: z.string().min(1, "Status is required"),
});

export type PayoutFormInput = z.infer<typeof payoutSchema>;
