export interface BalanceRecord {
  id: string;
  apiPartner: string;
  balance: string;
  status: string;
}

export type CreateBalancePayload = Omit<BalanceRecord, "id">;
export type UpdateBalancePayload = BalanceRecord;
