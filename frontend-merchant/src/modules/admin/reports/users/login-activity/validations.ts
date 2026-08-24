import { z } from "zod";

export const loginActivitySchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  ip: z.string().min(1, "IP Address is required"),
  status: z.string().min(1, "Status is required"),
});

export type LoginActivityFormInput = z.infer<typeof loginActivitySchema>;
