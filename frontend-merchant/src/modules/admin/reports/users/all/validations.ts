import { z } from "zod";

export const allSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  name: z.string().min(1, "Name is required"),
  status: z.string().min(1, "Status is required"),
});

export type AllFormInput = z.infer<typeof allSchema>;
