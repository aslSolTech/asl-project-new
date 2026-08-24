export interface RequestRecord {
  id: string;
  bankName: string;
  amount: string;
  status: string;
}

export type CreateRequestPayload = Omit<RequestRecord, "id">;
export type UpdateRequestPayload = RequestRecord;
