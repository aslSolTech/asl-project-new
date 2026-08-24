export interface ApiTypeRecord {
  id: string;
  apiType: string;
  requestParams: string[];
  responseParams: string[];
  walletType: string;
  isDisplayPdf: boolean;
}

export type CreateApiTypePayload = Omit<ApiTypeRecord, "id">;
export type UpdateApiTypePayload = ApiTypeRecord;
