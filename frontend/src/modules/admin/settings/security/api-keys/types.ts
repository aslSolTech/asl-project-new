export interface ApiKeysRecord {
  id: string;
  keyName: string;
  status: string;
}

export type CreateApiKeysPayload = Omit<ApiKeysRecord, "id">;
export type UpdateApiKeysPayload = ApiKeysRecord;
