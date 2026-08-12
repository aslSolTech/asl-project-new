export interface RechargeRecord {
  id: string;
  txId: string;
  amount: string;
  status: string;
}

export type CreateRechargePayload = Omit<RechargeRecord, "id">;
export type UpdateRechargePayload = RechargeRecord;
