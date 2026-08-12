export interface RequestHistoryRecord {
  id: string;
  requestId: string;
  amount: string;
  status: string;
}

export type CreateRequestHistoryPayload = Omit<RequestHistoryRecord, "id">;
export type UpdateRequestHistoryPayload = RequestHistoryRecord;
