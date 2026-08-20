export interface ServiceApiRecord {
  id: string;
  providerName: string;
  apiName: string;
  apiType: string;
  apiKey: number | string;
  status: "active" | "inactive";
  updatedAt?: string;
  createdAt?: string;
  // Aliases for compatibility
  bank?: string;
  service?: string;
  api?: string;
}

export type CreateServiceApiPayload = Omit<ServiceApiRecord, "id">;
export type UpdateServiceApiPayload = ServiceApiRecord;
