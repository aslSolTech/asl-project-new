import { z } from "zod";

export const operatorSchema = z.object({
  operatorTypeId: z.string().min(1, "Operator Type is required!"),
  operatorId: z.string().min(1, "Operator Name is required!"),
  apiIds: z.array(z.string()).min(1, "At least one API must be selected!"),
  fallback: z.enum(["active", "inactive"]),
  status: z.enum(["active", "inactive"]),
});


export type OperatorFormInput = z.infer<typeof operatorSchema>;

