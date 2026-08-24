import { z } from "zod";

export const userSchema = z.object({
  userTypeId: z.string().min(1, "User Type is required!"),
  userId: z.string().min(1, "User is required!"),
  providerName: z.string().min(1, "Provider name is required!"),
  fallback: z.string().optional().default(""),
  status: z.enum(["active", "inactive"]).default("active"),
});

export type UserFormInput = z.infer<typeof userSchema>;

