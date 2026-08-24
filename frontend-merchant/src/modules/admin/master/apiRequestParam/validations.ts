import { z } from "zod";

export const apiRequestParameterSchema = z.object({
  paramName: z.string().min(1, "Parameter Name is required"),
  dataType: z.string().min(1, "Data Type is required"),
  required: z.string().min(1, "Is Required is required"),
  description: z.string().min(1, "Description is required"),
});

export type ApiRequestParameterFormInput = z.infer<typeof apiRequestParameterSchema>;
