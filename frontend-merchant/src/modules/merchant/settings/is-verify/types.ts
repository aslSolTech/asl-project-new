export interface IsVerifyRecord {
  id: string;
  name: string;
  value: string;
}

export type CreateIsVerifyPayload = Omit<IsVerifyRecord, "id">;
export type UpdateIsVerifyPayload = IsVerifyRecord;
