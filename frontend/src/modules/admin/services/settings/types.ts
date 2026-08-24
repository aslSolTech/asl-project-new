export interface SettingsRecord {
  id: string;
  serviceName: string;
  status: string;
}

export type CreateSettingsPayload = Omit<SettingsRecord, "id">;
export type UpdateSettingsPayload = SettingsRecord;
