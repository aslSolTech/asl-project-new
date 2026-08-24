import { z } from "zod";

export const contactSchema = z.object({
  address: z.string().min(1, "Address is required"),
  status: z.string().min(1, "Status is required"),
});

export type ContactFormInput = z.infer<typeof contactSchema>;
