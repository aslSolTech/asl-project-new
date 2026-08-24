import { z } from "zod";

export const apiCallbackSchema = z.object({
  customerName: z.string().min(1, "Customer Name is required"),
  url: z.string().min(1, "Callback URL is required"),
  retryPolicy: z.string().min(1, "Retry Policy Rule is required"),
});

export type ApiCallbackFormInput = z.infer<typeof apiCallbackSchema>;
