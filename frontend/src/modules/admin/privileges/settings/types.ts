export interface SettingsRecord {
  id: string;
  role: string;
  access: string;
  status: string;
}

export type CreateSettingsPayload = Omit<SettingsRecord, "id">;
export type UpdateSettingsPayload = SettingsRecord;
