export interface DmtRecord {
  id: string;
  txId: string;
  amount: string;
  status: string;
}

export type CreateDmtPayload = Omit<DmtRecord, "id">;
export type UpdateDmtPayload = DmtRecord;
