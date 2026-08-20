import { z } from "zod";

export const commissionSchema = z.object({
  packageName: z.string().min(1, "Package Name is required"),
  rate: z.string().min(1, "Rate is required"),
  status: z.string().min(1, "Status is required"),
});

export type CommissionFormInput = z.infer<typeof commissionSchema>;
