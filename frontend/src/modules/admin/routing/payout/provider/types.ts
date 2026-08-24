export interface ProviderRecord {
  id: string;
  provider: string;
  api: string;
  status: string;
}

export type CreateProviderPayload = Omit<ProviderRecord, "id">;
export type UpdateProviderPayload = ProviderRecord;
