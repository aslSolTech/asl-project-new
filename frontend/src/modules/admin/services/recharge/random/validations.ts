import { z } from "zod";

export const randomSchema = z.object({
  api: z.string().min(1, "API Partner is required"),
  weight: z.string().min(1, "Weight is required"),
  status: z.string().min(1, "Status is required"),
});

export type RandomFormInput = z.infer<typeof randomSchema>;
