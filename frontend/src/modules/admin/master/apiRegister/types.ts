export interface ApiRegisterRecord {
  id: string;
  apiName: string;
  provider: string;
  url: string;
  apiType: string;
}

export type CreateApiRegisterPayload = Omit<ApiRegisterRecord, "id">;
export type UpdateApiRegisterPayload = ApiRegisterRecord;
