import { z } from "zod";

export const operatorSchema = z.object({
  operator: z.string().min(1, "Operator is required"),
  api: z.string().min(1, "API Partner is required"),
  status: z.string().min(1, "Status is required"),
});

export type OperatorFormInput = z.infer<typeof operatorSchema>;
