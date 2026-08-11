export interface AdminRegisterRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

export type CreateAdminRegisterPayload = Omit<AdminRegisterRecord, "id">;
export type UpdateAdminRegisterPayload = AdminRegisterRecord;
