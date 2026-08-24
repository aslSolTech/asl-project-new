export interface DailySaleRecord {
  id: string;
  date: string;
  sales: string;
  status: string;
}

export type CreateDailySalePayload = Omit<DailySaleRecord, "id">;
export type UpdateDailySalePayload = DailySaleRecord;
