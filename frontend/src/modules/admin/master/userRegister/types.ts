export interface UserRegisterRecord {
  id: string;
  userName: string;
  email: string;
  mobile: string;
  companyName: string;
}

export type CreateUserRegisterPayload = Omit<UserRegisterRecord, "id">;
export type UpdateUserRegisterPayload = UserRegisterRecord;
