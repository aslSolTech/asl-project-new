export interface SystemSettingRecord {
  id: string;
  settingKey: string;
  settingValue: string;
  description: string;
}

export type CreateSystemSettingPayload = Omit<SystemSettingRecord, "id">;
export type UpdateSystemSettingPayload = SystemSettingRecord;
