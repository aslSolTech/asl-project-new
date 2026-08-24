import { z } from "zod";

export const deviceRequestsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  status: z.string().min(1, "Status is required"),
});

export type DeviceRequestsFormInput = z.infer<typeof deviceRequestsSchema>;
