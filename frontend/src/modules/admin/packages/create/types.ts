export interface CreateRecord {
  id: string;
  name: string;
  price: string;
  status: string;
}

export type CreateCreatePayload = Omit<CreateRecord, "id">;
export type UpdateCreatePayload = CreateRecord;
