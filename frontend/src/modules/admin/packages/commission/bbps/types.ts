export interface BbpsRecord {
  id: string;
  packageName: string;
  rate: string;
  status: string;
}

export type CreateBbpsPayload = Omit<BbpsRecord, "id">;
export type UpdateBbpsPayload = BbpsRecord;
