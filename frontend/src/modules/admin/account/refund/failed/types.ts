export interface FailedRecord {
  id: string;
  txId: string;
  amount: string;
  status: string;
}

export type CreateFailedPayload = Omit<FailedRecord, "id">;
export type UpdateFailedPayload = FailedRecord;
