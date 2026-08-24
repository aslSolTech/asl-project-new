export interface AepsDashboardRecord {
  id: string;
  metric: string;
  value: string;
  status: string;
}

export type CreateAepsDashboardPayload = Omit<AepsDashboardRecord, "id">;
export type UpdateAepsDashboardPayload = AepsDashboardRecord;
