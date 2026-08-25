export interface LivePanelRecord {
  id: string;
  metric: string;
  value: string;
  status: string;
}

export type CreateLivePanelPayload = Omit<LivePanelRecord, "id">;
export type UpdateLivePanelPayload = LivePanelRecord;
