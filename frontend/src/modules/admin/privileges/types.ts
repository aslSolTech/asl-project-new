export interface ApiPermissionItem {
  apiTypeId: string;
  apiTypeName: string;
  status: "active" | "inactive";
}

export interface PrivilegeRecord {
  id: string;
  userId: string;
  regNo: string;
  userName: string;
  companyName: string;
  contactNumber: string;
  packageName: string;
  userTypeId?: string;
  userTypeName?: string;
  apiPermissions: ApiPermissionItem[];
  status?: string;
  updatedAt?: string;
}

export type CreatePrivilegePayload = Omit<PrivilegeRecord, "id">;
export type UpdatePrivilegePayload = PrivilegeRecord;
