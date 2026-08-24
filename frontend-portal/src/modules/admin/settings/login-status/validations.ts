import { z } from "zod";

export const loginStatusSchema = z.object({
  statusName: z.string().min(1, "Status name is required!"),
  value: z.string().min(1, "Status value is required!"),
});

export type LoginStatusFormInput = z.infer<typeof loginStatusSchema>;
