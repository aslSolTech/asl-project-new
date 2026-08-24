export interface LoginActivityRecord {
  id: string;
  userId: string;
  ip: string;
  status: string;
}

export type CreateLoginActivityPayload = Omit<LoginActivityRecord, "id">;
export type UpdateLoginActivityPayload = LoginActivityRecord;
