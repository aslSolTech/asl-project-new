export interface UserRecord {
  id: string;
  user: string;
  api: string;
  status: string;
}

export type CreateUserPayload = Omit<UserRecord, "id">;
export type UpdateUserPayload = UserRecord;
