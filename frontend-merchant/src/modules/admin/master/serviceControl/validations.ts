import { z } from "zod";

export const serviceControlSchema = z.object({
  serviceName: z.string().trim().min(1, "Service Name is required!"),
  endpoint: z.string().trim().optional(),
  status: z.string().min(1, "Status is required!"),
});

export type ServiceControlFormInput = z.infer<typeof serviceControlSchema>;
