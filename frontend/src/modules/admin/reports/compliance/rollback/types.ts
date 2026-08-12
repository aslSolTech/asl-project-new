export interface RollbackRecord {
  id: string;
  txId: string;
  amount: string;
  status: string;
}

export type CreateRollbackPayload = Omit<RollbackRecord, "id">;
export type UpdateRollbackPayload = RollbackRecord;
