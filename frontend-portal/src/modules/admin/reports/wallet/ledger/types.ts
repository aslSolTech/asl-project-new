export interface LedgerRecord {
  id: string;
  type: string;
  balance: string;
}

export type CreateLedgerPayload = Omit<LedgerRecord, "id">;
export type UpdateLedgerPayload = LedgerRecord;
