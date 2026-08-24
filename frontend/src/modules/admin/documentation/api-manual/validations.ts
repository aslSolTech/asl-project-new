import { z } from "zod";

export const apiManualSchema = z.object({
  title: z.string().min(1, "Topic Title is required"),
  status: z.string().min(1, "Status is required"),
});

export type ApiManualFormInput = z.infer<typeof apiManualSchema>;
