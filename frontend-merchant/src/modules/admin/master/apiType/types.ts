export interface ApiTypeRecord {
  id: string;
  typeName: string;
  code: string;
  description: string;
}

export type CreateApiTypePayload = Omit<ApiTypeRecord, "id">;
export type UpdateApiTypePayload = ApiTypeRecord;
