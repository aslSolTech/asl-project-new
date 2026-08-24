export interface PayoutRecord {
  id: string;
  service: string;
  api: string;
  status: string;
}

export type CreatePayoutPayload = Omit<PayoutRecord, "id">;
export type UpdatePayoutPayload = PayoutRecord;
