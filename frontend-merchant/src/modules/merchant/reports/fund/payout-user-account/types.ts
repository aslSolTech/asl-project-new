export interface PayoutUserAccountRecord {
  id: string;
  userId: string;
  account: string;
  status: string;
}

export type CreatePayoutUserAccountPayload = Omit<PayoutUserAccountRecord, "id">;
export type UpdatePayoutUserAccountPayload = PayoutUserAccountRecord;
