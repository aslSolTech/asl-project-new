import { z } from "zod";

export const messagesSchema = z.object({
  transactionType: z.string().min(1, "Transaction Type is required"),
  message: z.string().min(1, "Message is required"),
  name: z.string().optional(),
  status: z.string().optional(),
});

export type MessagesFormInput = z.infer<typeof messagesSchema>;
