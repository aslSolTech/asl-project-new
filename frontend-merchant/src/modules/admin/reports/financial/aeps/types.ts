export interface AepsRecord {
  id: string;
  txId: string;
  amount: string;
  status: string;
}

export type CreateAepsPayload = Omit<AepsRecord, "id">;
export type UpdateAepsPayload = AepsRecord;
