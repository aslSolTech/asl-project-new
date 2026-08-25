export interface TransactionLedgerRecord {
  id: string;
  type: string;
  balance: string;
}

export type CreateTransactionLedgerPayload = Omit<TransactionLedgerRecord, "id">;
export type UpdateTransactionLedgerPayload = TransactionLedgerRecord;
