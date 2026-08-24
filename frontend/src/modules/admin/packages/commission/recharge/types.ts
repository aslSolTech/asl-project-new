export interface RechargeRecord {
  id: string;
  packageName: string;
  rate: string;
  status: string;
}

export type CreateRechargePayload = Omit<RechargeRecord, "id">;
export type UpdateRechargePayload = RechargeRecord;
