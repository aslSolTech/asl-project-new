export interface LiveRechargeRecord {
  id: string;
  amount: string;
  status: string;
}

export type CreateLiveRechargePayload = Omit<LiveRechargeRecord, "id">;
export type UpdateLiveRechargePayload = LiveRechargeRecord;
