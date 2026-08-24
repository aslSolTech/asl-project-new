export interface TwoFactorAuthRecord {
  id: string;
  method: string;
  status: string;
}

export type CreateTwoFactorAuthPayload = Omit<TwoFactorAuthRecord, "id">;
export type UpdateTwoFactorAuthPayload = TwoFactorAuthRecord;
