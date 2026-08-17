import { z } from "zod";

// Single & Multiple Request Type Schemas
export const requestTypeItemSchema = z.object({
  typeName: z.string().min(1, "Type name is required"),
  requestCode: z.string().min(1, "Request code is required"),
  httpMethod: z.string().min(1, "HTTP Method is required"),
  status: z.string().min(1, "Status is required"),
});

export const requestTypeMultiSchema = z.object({
  items: z.array(requestTypeItemSchema).min(1, "At least one item is required"),
});

export type RequestTypeFormInput = z.infer<typeof requestTypeItemSchema>;
export type RequestTypeMultiFormInput = z.infer<typeof requestTypeMultiSchema>;

// Single & Multiple Request Parameter Schemas
export const requestParamItemSchema = z.object({
  paramName: z.string().min(1, "Parameter name is required"),
  slug: z.string().min(1, "Slug is required"),
});

export const requestParamMultiSchema = z.object({
  items: z.array(requestParamItemSchema).min(1, "At least one parameter is required"),
});

export type RequestParamFormInput = z.infer<typeof requestParamItemSchema>;
export type RequestParamMultiFormInput = z.infer<typeof requestParamMultiSchema>;

// Single & Multiple Parameter Status Schemas
export const paramStatusItemSchema = z.object({
  statusName: z.string().min(1, "Status name is required"),
  statusCode: z.string().min(1, "Status code is required"),
  status: z.string().min(1, "Status is required"),
});

export const paramStatusMultiSchema = z.object({
  items: z.array(paramStatusItemSchema).min(1, "At least one status item is required"),
});

export type ParamStatusFormInput = z.infer<typeof paramStatusItemSchema>;
export type ParamStatusMultiFormInput = z.infer<typeof paramStatusMultiSchema>;
