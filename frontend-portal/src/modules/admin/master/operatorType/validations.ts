import { z } from "zod";

export const operatorTypeSchema = z.object({
  typeName: z.string().min(1, "Operator Type Name is required"),
  code: z.string().min(1, "Operator Code is required"),
  description: z.string().min(1, "Description is required"),
});

export type OperatorTypeFormInput = z.infer<typeof operatorTypeSchema>;
