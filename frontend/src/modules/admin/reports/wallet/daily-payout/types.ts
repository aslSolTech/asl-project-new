export interface DailyPayoutRecord {
  id: string;
  date: string;
  payouts: string;
  status: string;
}

export type CreateDailyPayoutPayload = Omit<DailyPayoutRecord, "id">;
export type UpdateDailyPayoutPayload = DailyPayoutRecord;
