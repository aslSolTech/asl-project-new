import { z } from "zod";

export const apiTypeSchema = z.object({
  typeName: z.string().min(1, "Type Name is required"),
  code: z.string().min(1, "API Code is required"),
  description: z.string().min(1, "Description is required"),
});

export type ApiTypeFormInput = z.infer<typeof apiTypeSchema>;
