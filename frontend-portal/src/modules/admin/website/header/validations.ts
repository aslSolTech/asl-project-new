import { z } from "zod";

export const headerSchema = z.object({
  logo: z.string().min(1, "Logo URL is required"),
  title: z.string().min(1, "Header Title is required"),
  status: z.string().min(1, "Status is required"),
});

export type HeaderFormInput = z.infer<typeof headerSchema>;
