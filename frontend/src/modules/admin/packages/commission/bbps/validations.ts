import { z } from "zod";

export const bbpsSchema = z.object({
  packageName: z.string().min(1, "Package Name is required"),
  rate: z.string().min(1, "Rate is required"),
  status: z.string().min(1, "Status is required"),
});

export type BbpsFormInput = z.infer<typeof bbpsSchema>;
