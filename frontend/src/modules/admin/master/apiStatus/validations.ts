import { z } from "zod";

export const apiStatusSchema = z.object({
  apiName: z.string().min(1, "API Name is required"),
  endpoint: z.string().min(1, "Status Endpoint is required"),
  method: z.string().min(1, "HTTP Method is required"),
  successCode: z.string().min(1, "Success Code is required"),
});

export type ApiStatusFormInput = z.infer<typeof apiStatusSchema>;
