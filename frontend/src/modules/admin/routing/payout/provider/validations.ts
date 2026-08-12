import { z } from "zod";

export const providerSchema = z.object({
  provider: z.string().min(1, "Provider is required"),
  api: z.string().min(1, "API Partner is required"),
  status: z.string().min(1, "Status is required"),
});

export type ProviderFormInput = z.infer<typeof providerSchema>;
