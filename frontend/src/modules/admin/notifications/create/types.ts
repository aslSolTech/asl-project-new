export interface CreateRecord {
  id: string;
  title: string;
  message: string;
  status: string;
}

export type CreateCreatePayload = Omit<CreateRecord, "id">;
export type UpdateCreatePayload = CreateRecord;
