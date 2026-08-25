import { z } from "zod";

export const packageUpgradeSchema = z.object({
  packageName: z.string().min(1, "Package Name is required"),
  status: z.string().min(1, "Status is required"),
});

export type PackageUpgradeFormInput = z.infer<typeof packageUpgradeSchema>;
