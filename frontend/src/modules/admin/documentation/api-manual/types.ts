export interface ApiManualRecord {
  id: string;
  title: string;
  status: string;
}

export type CreateApiManualPayload = Omit<ApiManualRecord, "id">;
export type UpdateApiManualPayload = ApiManualRecord;
