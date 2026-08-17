export interface UserTypeRecord {
  id: string;
  name: string;
  slug: string;
  status: string;
}

export type CreateUserTypePayload = Omit<UserTypeRecord, "id">;
export type UpdateUserTypePayload = UserTypeRecord;
