import { z } from "zod";

export const responseTypeSchema = z.object({
  responseFormat: z.string().min(1, "Response format is required!"),
});

export type ResponseTypeFormInput = z.infer<typeof responseTypeSchema>;

// Single & Multiple Response Parameter Schemas
export const responseParamItemSchema = z.object({
  paramName: z.string().min(1, "Parameter name is required!"),
  slug: z.string().min(1, "Slug is required!"),
});

export const responseParamMultiSchema = z.object({
  items: z.array(responseParamItemSchema).min(1, "At least one parameter is required!"),
});

export type ResponseParamFormInput = z.infer<typeof responseParamItemSchema>;
export type ResponseParamMultiFormInput = z.infer<typeof responseParamMultiSchema>;
