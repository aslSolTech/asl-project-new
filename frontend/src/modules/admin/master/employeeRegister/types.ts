export interface EmployeeRegisterRecord {
  id: string;
  name: string;
  email: string;
  department: string;
  designation: string;
}

export type CreateEmployeeRegisterPayload = Omit<EmployeeRegisterRecord, "id">;
export type UpdateEmployeeRegisterPayload = EmployeeRegisterRecord;
