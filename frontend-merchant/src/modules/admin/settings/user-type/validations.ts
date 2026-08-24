import { z } from "zod";

export const userTypeSchema = z.object({
  name: z.string().min(1, "User Type Name is required"),
  slug: z.string().min(1, "Slug / Identifier is required"),
  status: z.string().min(1, "Status is required"),
});

export type UserTypeFormInput = z.infer<typeof userTypeSchema>;
