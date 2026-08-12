import { z } from "zod";

export const packageSchema = z.object({
  package: z.string().min(1, "Package is required"),
  api: z.string().min(1, "API Partner is required"),
  status: z.string().min(1, "Status is required"),
});

export type PackageFormInput = z.infer<typeof packageSchema>;
