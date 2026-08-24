import { z } from "zod";

export const footerLinksSchema = z.object({
  name: z.string().min(1, "Link Name is required"),
  url: z.string().min(1, "URL is required"),
  status: z.string().min(1, "Status is required"),
});

export type FooterLinksFormInput = z.infer<typeof footerLinksSchema>;
