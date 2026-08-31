export interface RequestsRecord {
  id: string;
  requestId?: string;
  requestAmount: number | string;
  requestFrom: string;
  bankName: string;
  transactionId: string;
  paymentBy: string;
  depositDate: string;
  remarks?: string;
  status: string;
}

export type CreateRequestsPayload = Omit<RequestsRecord, "id">;
export type UpdateRequestsPayload = RequestsRecord;
