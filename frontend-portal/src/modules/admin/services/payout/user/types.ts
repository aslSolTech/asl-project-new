export interface UserRecord {
  id: string;
  userTypeId?: string;
  userTypeName?: string;
  userId?: string;
  userName?: string;
  userCode?: string;
  providerId?: string;
  providerName: string;
  fallback?: string;
  status: "active" | "inactive";
  createdAt?: string;
  updatedAt?: string;

  // Aliases for compatibility
  user?: string;
  api?: string;
}

export type CreateUserPayload = Omit<UserRecord, "id">;
export type UpdateUserPayload = UserRecord;

