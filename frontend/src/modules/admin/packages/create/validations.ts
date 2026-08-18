import { z } from "zod";

export const createSchema = z.object({
  packageName: z.string().min(1, "Please enter package name!"),
  trialPeriod: z.coerce.number().min(1, "Please select trial period!"),
  packageCharge: z.coerce.number().min(1, "Please enter package charge!"),
  isDefault: z.string().min(1, "Please select is default!"),
  status: z.string().min(1, "Please select status!"),
});

export type CreateFormInput = z.infer<typeof createSchema>;
