import { z } from "zod";

export const userSchema = z.object({
  user: z.string().min(1, "User is required"),
  api: z.string().min(1, "API Partner is required"),
  status: z.string().min(1, "Status is required"),
});

export type UserFormInput = z.infer<typeof userSchema>;
