export interface GenderRecord {
  id: string;
  genderName: string;
  code: string;
  status: string;
}

export type CreateGenderPayload = Omit<GenderRecord, "id">;
export type UpdateGenderPayload = GenderRecord;
