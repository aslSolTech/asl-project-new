export interface SettingsRecord {
  id: string;
  serviceIcon?: string | null;
  serviceType: string;
  serviceName: string;
  shortDesc?: string;
  linkPage: string;
  serviceOrder: string | number;
  status: string;
  createdAt?: string;
}

export type CreateSettingsPayload = Omit<SettingsRecord, "id">;
export type UpdateSettingsPayload = SettingsRecord;
