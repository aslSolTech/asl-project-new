export interface HeaderRecord {
  id: string;
  logo: string;
  title: string;
  status: string;
}

export type CreateHeaderPayload = Omit<HeaderRecord, "id">;
export type UpdateHeaderPayload = HeaderRecord;
