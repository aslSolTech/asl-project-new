export interface TransferRecord {
  id: string;
  recipient: string;
  amount: string;
  status: string;
}

export type CreateTransferPayload = Omit<TransferRecord, "id">;
export type UpdateTransferPayload = TransferRecord;
