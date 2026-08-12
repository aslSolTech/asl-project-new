import { z } from "zod";

export const feedbackSchema = z.object({
  name: z.string().min(1, "Name is required"),
  feedback: z.string().min(1, "Feedback is required"),
  status: z.string().min(1, "Status is required"),
});

export type FeedbackFormInput = z.infer<typeof feedbackSchema>;
