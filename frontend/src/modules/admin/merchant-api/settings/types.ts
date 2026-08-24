export interface SettingsRecord {
  id: string;
  key: string;
  value: string;
  status: string;
}

export type CreateSettingsPayload = Omit<SettingsRecord, "id">;
export type UpdateSettingsPayload = SettingsRecord;
