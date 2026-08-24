import { z } from "zod";

export const createSchema = z.object({
  title: z.string().min(1, "Notification Title is required"),
  message: z.string().min(1, "Message is required"),
  status: z.string().min(1, "Status is required"),
});

export type CreateFormInput = z.infer<typeof createSchema>;
