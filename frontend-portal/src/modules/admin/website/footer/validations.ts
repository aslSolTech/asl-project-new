import { z } from "zod";

export const footerSchema = z.object({
  copyrightText: z.string().min(1, "Copyright Text is required"),
  status: z.string().min(1, "Status is required"),
});

export type FooterFormInput = z.infer<typeof footerSchema>;
