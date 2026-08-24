import { z } from "zod";

export const operatorCodeSchema = z.object({
  apiId: z.string().optional(),
  apiName: z.string().optional(),
  apiType: z.string().optional(),
  operatorTypeId: z.string().min(1, "Operator Type is required"),
  operatorTypeName: z.string().optional(),
  operator: z.string().min(1, "Operator Name is required"),
  operatorId: z.string().optional(),
  code: z
    .union([z.number(), z.string()])
    .transform((val) => (val === "" || val === undefined ? 0 : Number(val)))
    .refine((val) => !Number.isNaN(val), { message: "Operator Code must be a valid number" }),
  connectionType: z.string().min(1, "Connection Type is required"),
  commission: z
    .union([z.number(), z.string()])
    .transform((val) => (val === "" || val === undefined ? 0 : Number(val)))
    .refine((val) => !Number.isNaN(val) && val >= 0, { message: "Commission must be a valid positive number" }),
  gst: z
    .union([z.number(), z.string()])
    .transform((val) => (val === "" || val === undefined ? 0 : Number(val)))
    .refine((val) => !Number.isNaN(val) && val >= 0, { message: "GST must be a valid positive number" }),
  isFlat: z.enum(["Yes", "No", "Y", "N"]).default("No"),
  provider: z.string().optional(),
  providerCode: z.string().optional(),
});

export type OperatorCodeFormInput = z.input<typeof operatorCodeSchema>;
export type OperatorCodeFormOutput = z.output<typeof operatorCodeSchema>;

