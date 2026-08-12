export interface PayoutRecord {
  id: string;
  txId: string;
  amount: string;
  status: string;
}

export type CreatePayoutPayload = Omit<PayoutRecord, "id">;
export type UpdatePayoutPayload = PayoutRecord;
