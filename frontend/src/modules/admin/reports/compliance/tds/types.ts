export interface TdsRecord {
  id: string;
  amount: string;
  status: string;
}

export type CreateTdsPayload = Omit<TdsRecord, "id">;
export type UpdateTdsPayload = TdsRecord;
