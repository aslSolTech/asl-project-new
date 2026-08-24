import { z } from "zod";

export const callbackParameterItemSchema = z.object({
  paramName: z.string().min(1, "Parameter Name is required!"),
  paramValue: z.string().optional().default(""),
  paramFor: z.string().min(1, "Parameter For is required!"),
});

export const apiCallbackSchema = z.object({
  apiName: z.string().min(1, "API Name is required!"),
  apiId: z.string().optional(),
  callbackUrl: z.url("Invalid Callback URL format!"),
  parameters: z.array(callbackParameterItemSchema).optional(),
  apiRemarks: z.string().optional().or(z.literal("")),
});

export type ApiCallbackFormInput = z.infer<typeof apiCallbackSchema>;

