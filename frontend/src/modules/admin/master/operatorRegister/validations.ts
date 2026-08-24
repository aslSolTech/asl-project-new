import { z } from "zod";

export const operatorRegisterSchema = z.object({
  operatorName: z.string().min(1, "Operator Name is required"),
  category: z.string().min(1, "Category Code is required"),
  code: z.string().min(1, "Operator Shortcode is required"),
});

export type OperatorRegisterFormInput = z.infer<typeof operatorRegisterSchema>;
