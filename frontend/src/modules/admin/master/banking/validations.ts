import { z } from "zod";

export const aepsBankSchema = z.object({
  bankName: z.string().min(1, "Bank Name is required"),
  iinCode: z.string().min(1, "IIN Code is required"),
});

export type AepsBankFormInput = z.infer<typeof aepsBankSchema>;
