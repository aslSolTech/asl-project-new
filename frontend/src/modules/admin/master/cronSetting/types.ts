export interface CronSettingRecord {
  id: string;
  cronName: string;
  schedule: string;
  endpoint: string;
  description: string;
}

export type CreateCronSettingPayload = Omit<CronSettingRecord, "id">;
export type UpdateCronSettingPayload = CronSettingRecord;
