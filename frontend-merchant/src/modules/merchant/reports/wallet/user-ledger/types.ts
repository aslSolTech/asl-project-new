export interface UserLedgerRecord {
  id: string;
  type: string;
  balance: string;
}

export type CreateUserLedgerPayload = Omit<UserLedgerRecord, "id">;
export type UpdateUserLedgerPayload = UserLedgerRecord;
