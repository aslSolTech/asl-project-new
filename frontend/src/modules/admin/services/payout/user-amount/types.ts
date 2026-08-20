export interface UserAmountRecord {
  id: string;
  user: string;
  amount: string;
  status: string;
}

export type CreateUserAmountPayload = Omit<UserAmountRecord, "id">;
export type UpdateUserAmountPayload = UserAmountRecord;
