import { z } from "zod";

export const operatorCodeSchema = z.object({
  provider: z.string().min(1, "Provider Name is required"),
  operator: z.string().min(1, "Operator Name is required"),
  code: z.string().min(1, "Internal Code is required"),
  providerCode: z.string().min(1, "Provider Match Code is required"),
});

export type OperatorCodeFormInput = z.infer<typeof operatorCodeSchema>;
