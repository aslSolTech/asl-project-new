export interface EmployeeRegisterRecord {
  id: string;
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  address: string;
  isOtpVerify: string;
  status: string;

  // Backward compatibility
  name?: string;
  department?: string;
  designation?: string;
}

export type CreateEmployeeRegisterPayload = Omit<EmployeeRegisterRecord, "id">;
export type UpdateEmployeeRegisterPayload = EmployeeRegisterRecord;
