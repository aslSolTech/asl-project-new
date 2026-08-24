import { z } from "zod";

export const requestParameterItemSchema = z.object({
  paramName: z.string().min(1, "Parameter Name is required!"),
  paramType: z.string().min(1, "Parameter Type is required!"),
  paramValue: z.string().min(1, "Parameter Value is required!"),
});

export const responseParameterItemSchema = z.object({
  paramName: z.string().min(1, "Parameter Name is required!"),
  paramValue: z.string().min(1, "Parameter Value is required!"),
  paramFor: z.string().min(1, "Parameter For is required!"),
});

export const apiStatusSchema = z.object({
  apiName: z.string().min(1, "API Name is required!"),
  statusFor: z.string().min(1, "Status For is required!"),
  url: z.url("Invalid URL format!"),
  requestType: z.string().min(1, "Request Type is required!"),
  requestParameters: z.array(requestParameterItemSchema).optional(),
  responseParameters: z.array(responseParameterItemSchema).optional(),
  responseType: z.string().min(1, "Response Type is required!"),
  apiRemarks: z.string().optional().or(z.literal("")),
});

export type ApiStatusFormInput = z.infer<typeof apiStatusSchema>;

