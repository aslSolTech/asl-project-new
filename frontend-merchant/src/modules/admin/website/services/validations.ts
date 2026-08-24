import { z } from "zod";

export const servicesSchema = z.object({
  serviceName: z.string().min(1, "Service Name is required"),
  status: z.string().min(1, "Status is required"),
});

export type ServicesFormInput = z.infer<typeof servicesSchema>;
