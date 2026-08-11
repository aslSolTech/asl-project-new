import { z } from "zod";

export const apiRegisterSchema = z.object({
  apiName: z.string().min(1, "API Name is required"),
  provider: z.string().min(1, "Provider is required"),
  url: z.string().min(1, "Endpoint URL is required"),
  apiType: z.string().min(1, "API Type Code is required"),
});

export type ApiRegisterFormInput = z.infer<typeof apiRegisterSchema>;
