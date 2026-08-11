export interface ApiBalanceRecord {
  id: string;
  provider: string;
  endpoint: string;
  currency: string;
}

export type CreateApiBalancePayload = Omit<ApiBalanceRecord, "id">;
export type UpdateApiBalancePayload = ApiBalanceRecord;
