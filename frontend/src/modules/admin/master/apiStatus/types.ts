export interface ApiStatusRecord {
  id: string;
  apiName: string;
  endpoint: string;
  method: string;
  successCode: string;
}

export type CreateApiStatusPayload = Omit<ApiStatusRecord, "id">;
export type UpdateApiStatusPayload = ApiStatusRecord;
