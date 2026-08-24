import { z } from "zod";

export const footerContactSchema = z.object({
  phone: z.string().min(1, "Phone is required"),
  email: z.string().min(1, "Email is required"),
  status: z.string().min(1, "Status is required"),
});

export type FooterContactFormInput = z.infer<typeof footerContactSchema>;
