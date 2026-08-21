export interface UserRecord {
  id: string;
  userTypeId: string;
  userTypeName?: string;
  userId: string;
  userName?: string;
  userCode?: string;
  apiIds: string[];
  apiNames?: string[];
  fallback: "active" | "inactive" | boolean;
  status: "active" | "inactive";
  createdAt?: string;
  updatedAt?: string;
}

export type CreateUserPayload = Omit<UserRecord, "id">;
export type UpdateUserPayload = UserRecord;

