export interface TransferRecord {
  id: string;
  apiUserId: number;
  trxnDate: string | Date;
  transferType: string;
  walletType: string;
  amount: number;
}

export type CreateTransferPayload = Omit<TransferRecord, "id">;
export type UpdateTransferPayload = TransferRecord;
