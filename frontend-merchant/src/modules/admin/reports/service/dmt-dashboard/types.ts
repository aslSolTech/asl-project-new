export interface DmtDashboardRecord {
  id: string;
  metric: string;
  value: string;
  status: string;
}

export type CreateDmtDashboardPayload = Omit<DmtDashboardRecord, "id">;
export type UpdateDmtDashboardPayload = DmtDashboardRecord;
