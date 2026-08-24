export interface ListRecord {
  id: string;
  title: string;
  message: string;
  status: string;
}

export type CreateListPayload = Omit<ListRecord, "id">;
export type UpdateListPayload = ListRecord;
