import { z } from "zod";

export const messagesSchema = z.object({
  name: z.string().min(1, "Name is required"),
  message: z.string().min(1, "Message is required"),
  status: z.string().min(1, "Status is required"),
});

export type MessagesFormInput = z.infer<typeof messagesSchema>;
