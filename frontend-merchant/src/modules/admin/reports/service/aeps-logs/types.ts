export interface AepsLogsRecord {
  id: string;
  details: string;
  status: string;
}

export type CreateAepsLogsPayload = Omit<AepsLogsRecord, "id">;
export type UpdateAepsLogsPayload = AepsLogsRecord;
