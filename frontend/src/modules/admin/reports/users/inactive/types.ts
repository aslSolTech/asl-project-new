export interface InactiveRecord {
  id: string;
  userId: string;
  name: string;
  status: string;
}

export type CreateInactivePayload = Omit<InactiveRecord, "id">;
export type UpdateInactivePayload = InactiveRecord;
