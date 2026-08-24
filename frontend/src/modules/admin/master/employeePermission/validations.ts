import { z } from "zod";

export const employeePermissionSchema = z.object({
  employeeId: z.string().min(1, "Employee ID is required"),
  moduleAccess: z.string().min(1, "Module Access is required"),
  canWrite: z.string().min(1, "Can Write is required"),
  canDelete: z.string().min(1, "Can Delete is required"),
});

export type EmployeePermissionFormInput = z.infer<typeof employeePermissionSchema>;
