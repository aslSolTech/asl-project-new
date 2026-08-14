export interface PrivilegeRecord {
  id: string;
  role: string;
  access: string;
  status: string;
}

export type CreatePrivilegePayload = Omit<PrivilegeRecord, "id">;
export type UpdatePrivilegePayload = PrivilegeRecord;
