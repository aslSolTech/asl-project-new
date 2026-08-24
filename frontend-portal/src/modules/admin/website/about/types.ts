export interface AboutRecord {
  id: string;
  content: string;
  status: string;
}

export type CreateAboutPayload = Omit<AboutRecord, "id">;
export type UpdateAboutPayload = AboutRecord;
