export interface RandomRecord {
  id: string;
  api: string;
  weight: string;
  status: string;
}

export type CreateRandomPayload = Omit<RandomRecord, "id">;
export type UpdateRandomPayload = RandomRecord;
