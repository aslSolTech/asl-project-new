import { z } from "zod";

export const amountSchema = z.object({
  condition: z.enum(["==", ">=", "<=", "<>", ">", "<", "AND", "BETWEEN"]),
  amountFrom: z.string().min(1, "Amount is required!"),
  amountTo: z.string().optional(),
  operatorTypeId: z.string().min(1, "Operator Type is required!"),
  operatorId: z.string().min(1, "Operator Name is required!"),
  apiIds: z.array(z.string()).min(1, "At least one API must be selected!"),
  fallback: z.enum(["active", "inactive"]),
  status: z.enum(["active", "inactive"]),
});

export type AmountFormInput = z.infer<typeof amountSchema>;

