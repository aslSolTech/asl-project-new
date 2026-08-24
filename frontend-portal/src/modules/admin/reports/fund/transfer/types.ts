export interface TransferRecord {
  id: string;
  txId: string;
  amount: string;
  status: string;
}

export type CreateTransferPayload = Omit<TransferRecord, "id">;
export type UpdateTransferPayload = TransferRecord;
