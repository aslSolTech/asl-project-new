export interface ApiCallbackRecord {
  id: string;
  customerName: string;
  url: string;
  retryPolicy: string;
}

export type CreateApiCallbackPayload = Omit<ApiCallbackRecord, "id">;
export type UpdateApiCallbackPayload = ApiCallbackRecord;
