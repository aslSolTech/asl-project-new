export interface TransactionsRecord {
  id: string;
  txId: string;
  amount: string;
  status: string;
}

export type CreateTransactionsPayload = Omit<TransactionsRecord, "id">;
export type UpdateTransactionsPayload = TransactionsRecord;
