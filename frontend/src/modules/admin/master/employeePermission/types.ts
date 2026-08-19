export interface EmployeePermissionRecord {
  id: string;
  employeeId: string;
  employeeName?: string;
  employeeEmail?: string;
  employeeMobile?: string;
  allowedRoutes: string[];
  allowedModules: string[];
  canWrite: boolean | string;
  canDelete: boolean | string;
  status: "Active" | "Inactive";

  // Backward compatibility
  moduleAccess?: string;
}

export type CreateEmployeePermissionPayload = Omit<EmployeePermissionRecord, "id">;
export type UpdateEmployeePermissionPayload = EmployeePermissionRecord;

