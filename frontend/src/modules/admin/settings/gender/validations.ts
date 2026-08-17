import { z } from "zod";

export const genderSchema = z.object({
  genderName: z.string().min(1, "Gender name is required"),
  code: z.string().min(1, "Gender code is required"),
  status: z.string().min(1, "Status is required"),
});

export type GenderFormInput = z.infer<typeof genderSchema>;
