export interface ProfileRecord {
  id: string;
  name: string;
  email: string;
  status: string;
}

export type CreateProfilePayload = Omit<ProfileRecord, "id">;
export type UpdateProfilePayload = ProfileRecord;
