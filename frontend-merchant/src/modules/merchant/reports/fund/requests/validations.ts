import { z } from "zod";

export const requestsSchema = z.object({
  requestId: z.string().min(1, "Request ID is required"),
  amount: z.string().min(1, "Amount is required"),
  status: z.string().min(1, "Status is required"),
});

export type RequestsFormInput = z.infer<typeof requestsSchema>;
