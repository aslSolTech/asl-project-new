import { z } from "zod";

export const operatorTypeSchema = z.object({
  operatorType: z.string().min(1, "Operator Type is required"),
  apiType: z.string().min(1, "API Type is required"),
  status: z.string().min(1, "Status is required"),
});

export type OperatorTypeFormInput = z.infer<typeof operatorTypeSchema>;
