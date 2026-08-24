import { z } from "zod";

export const contactSchema = z.object({
  phone: z.string().min(1, "Support Phone is required"),
  status: z.string().min(1, "Status is required"),
});

export type ContactFormInput = z.infer<typeof contactSchema>;
