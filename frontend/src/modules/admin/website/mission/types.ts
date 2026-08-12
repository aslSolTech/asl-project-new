export interface MissionRecord {
  id: string;
  missionText: string;
  status: string;
}

export type CreateMissionPayload = Omit<MissionRecord, "id">;
export type UpdateMissionPayload = MissionRecord;
