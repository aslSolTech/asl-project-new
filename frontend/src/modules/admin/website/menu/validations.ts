import { z } from "zod";

export const menuSchema = z.object({
  name: z.string().min(1, "Menu Name is required"),
  link: z.string().min(1, "Link URL is required"),
  status: z.string().min(1, "Status is required"),
});

export type MenuFormInput = z.infer<typeof menuSchema>;
