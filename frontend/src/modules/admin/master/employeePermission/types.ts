export interface EmployeePermissionRecord {
  id: string;
  employeeId: string;
  moduleAccess: string;
  canWrite: string;
  canDelete: string;
}

export type CreateEmployeePermissionPayload = Omit<EmployeePermissionRecord, "id">;
export type UpdateEmployeePermissionPayload = EmployeePermissionRecord;
