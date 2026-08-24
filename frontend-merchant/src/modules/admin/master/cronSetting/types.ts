export interface CronSettingRecord {
  id: string;
  cronName: string;
  serviceKey?: string;
  schedule: string;
  endpoint: string;
  description: string;
  isActive: boolean;
}

export type CreateCronSettingPayload = Omit<CronSettingRecord, "id">;
export type UpdateCronSettingPayload = CronSettingRecord;

