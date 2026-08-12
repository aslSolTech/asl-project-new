import { z } from "zod";

export const kycSchema = z.object({
  documentType: z.string().min(1, "Doc Type is required"),
  docNumber: z.string().min(1, "Number is required"),
  status: z.string().min(1, "Status is required"),
});

export type KycFormInput = z.infer<typeof kycSchema>;
