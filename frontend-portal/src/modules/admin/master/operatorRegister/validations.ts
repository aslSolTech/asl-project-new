import { z } from "zod";

export const operatorRegisterSchema = z.object({
  operatorTypeId: z.string().min(1, "Operator Type is required!"),
  operatorName: z.string().min(1, "Operator Name is required!"),
  optionalParameter: z.string().optional().or(z.literal("")),
  parameterLink: z.string().optional().or(z.literal("")),
  isFetch: z.string().min(1, "Is Fetch selection is required!"),
  status: z.string().min(1, "Status is required!"),
  stateName: z.string().optional().or(z.literal("")),
  operatorIcon: z.string().optional().or(z.literal("")),
});

export type OperatorRegisterFormInput = z.infer<typeof operatorRegisterSchema>;
