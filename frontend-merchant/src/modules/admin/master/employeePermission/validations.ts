import { z } from "zod";

export const employeePermissionSchema = z.object({
  employeeId: z.string().min(1, "Employee is required"),
  employeeName: z.string().optional(),
  employeeEmail: z.string().optional(),
  employeeMobile: z.string().optional(),
  allowedRoutes: z.array(z.string()).default([]),
  allowedModules: z.array(z.string()).default([]),
  canWrite: z.union([z.boolean(), z.string()]).default(true),
  canDelete: z.union([z.boolean(), z.string()]).default(false),
  status: z.string().default("Active"),
  moduleAccess: z.string().optional(),
});

export type EmployeePermissionFormInput = z.input<typeof employeePermissionSchema>;
export type EmployeePermissionFormOutput = z.output<typeof employeePermissionSchema>;

