export interface AllRecord {
  id: string;
  userId: string;
  name: string;
  status: string;
}

export type CreateAllPayload = Omit<AllRecord, "id">;
export type UpdateAllPayload = AllRecord;
