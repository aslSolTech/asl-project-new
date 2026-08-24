export interface HistoryRecord {
  id: string;
  ip: string;
  date: string;
  status: string;
}

export type CreateHistoryPayload = Omit<HistoryRecord, "id">;
export type UpdateHistoryPayload = HistoryRecord;
