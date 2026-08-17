export interface LoginStatusRecord {
  id: string;
  statusName: string;
  value: string;
}

export type CreateLoginStatusPayload = Omit<LoginStatusRecord, "id">;
export type UpdateLoginStatusPayload = LoginStatusRecord;
