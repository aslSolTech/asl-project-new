import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required"),
  status: z.string().min(1, "Status is required"),
});

export type ProfileFormInput = z.infer<typeof profileSchema>;
