import { z } from "zod";

export const privilegeSchema = z.object({
  role: z.string().min(1, "Role is required"),
  access: z.string().min(1, "Access Level is required"),
  status: z.string().min(1, "Status is required"),
});

export type PrivilegeFormInput = z.infer<typeof privilegeSchema>;
