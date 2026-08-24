export interface ServiceControlRecord {
  id: string;
  serviceName: string;
  endpoint?: string;
  status: string; // "1" | "0" | "PAYU" | "UPI" | "UNLIMIT" | "CASH FREE"
}

export type CreateServiceControlPayload = Omit<ServiceControlRecord, "id">;
export type UpdateServiceControlPayload = ServiceControlRecord;
