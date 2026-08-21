import { z } from "zod";

export const userSchema = z.object({
  userTypeId: z.string().min(1, "User Type is required!"),
  userId: z.string().min(1, "User is required!"),
  apiIds: z.array(z.string()).min(1, "At least one API must be selected!"),
  fallback: z.enum(["active", "inactive"]),
  status: z.enum(["active", "inactive"]),
});

export type UserFormInput = z.infer<typeof userSchema>;

