import { z } from "zod";

export const isVerifySchema = z.object({
  name: z.string().min(1, "Verification label is required!"),
  value: z.string().min(1, "Verification value is required!"),
});

export type IsVerifyFormInput = z.infer<typeof isVerifySchema>;
