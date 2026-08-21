import { z } from "zod";

export const serviceApiSchema = z.object({
  providerName: z.string().min(1, "Provider/Service/Bank name is required!"),
  apiName: z.string().min(1, "API name is required!"),
  apiType: z.string().min(1, "API type is required!"),
  apiKey: z.coerce.number().min(1, "API Key must be a valid number!"),
  userTypeIds: z.array(z.string()).min(1, "Please select at least one User Type!").default([]),
  status: z.enum(["active", "inactive"]).default("active"),
});

export type ServiceApiFormInput = z.infer<typeof serviceApiSchema>;

