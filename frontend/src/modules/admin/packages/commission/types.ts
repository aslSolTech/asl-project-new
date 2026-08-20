export interface CommissionRecord {
  id: string;
  packageName: string;
  rate: string;
  status: string;
}

export type CreateCommissionPayload = Omit<CommissionRecord, "id">;
export type UpdateCommissionPayload = CommissionRecord;
