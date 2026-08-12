export interface BalanceRecord {
  id: string;
  balance: string;
  currency: string;
  status: string;
}

export type CreateBalancePayload = Omit<BalanceRecord, "id">;
export type UpdateBalancePayload = BalanceRecord;
