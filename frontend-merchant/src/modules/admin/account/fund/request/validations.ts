import { z } from "zod";

export const declineRequestSchema = z.object({
  reason: z.string().min(1, "Reason is required to decline request"),
});

export type DeclineRequestFormInput = z.infer<typeof declineRequestSchema>;
