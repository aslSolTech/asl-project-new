import { z } from "zod";

export const apiPermissionItemSchema = z.object({
  apiTypeId: z.string().min(1, "API Type ID is required"),
  apiTypeName: z.string().min(1, "API Type Name is required"),
  status: z.enum(["active", "inactive"]),
});

export const privilegeSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  regNo: z.string().min(1, "Reg No is required"),
  userName: z.string().min(1, "User Name is required"),
  companyName: z.string().min(1, "Company Name is required"),
  contactNumber: z.string().min(1, "Contact Number is required"),
  packageName: z.string().min(1, "Package Name is required"),
  userTypeId: z.string().optional(),
  userTypeName: z.string().optional(),
  apiPermissions: z.array(apiPermissionItemSchema).min(0),
  status: z.string().optional(),
});

export type PrivilegeFormInput = z.infer<typeof privilegeSchema>;
