import { z } from "zod";

export const aboutSchema = z.object({
  content: z.string().min(1, "About Content is required"),
  status: z.string().min(1, "Status is required"),
});

export type AboutFormInput = z.infer<typeof aboutSchema>;
