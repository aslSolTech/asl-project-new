export interface DmtRecord {
  id: string;
  bank: string;
  api: string;
  status: string;
}

export type CreateDmtPayload = Omit<DmtRecord, "id">;
export type UpdateDmtPayload = DmtRecord;
