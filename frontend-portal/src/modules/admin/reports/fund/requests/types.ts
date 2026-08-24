export interface RequestsRecord {
  id: string;
  requestId: string;
  amount: string;
  status: string;
}

export type CreateRequestsPayload = Omit<RequestsRecord, "id">;
export type UpdateRequestsPayload = RequestsRecord;
