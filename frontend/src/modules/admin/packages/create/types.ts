export interface CreateRecord {
  id: string;
  packageName: string;
  trialPeriod: number | string;
  packageCharge: number | string;
  isDefault: string;
  status: string;
}

export type CreateCreatePayload = Omit<CreateRecord, "id">;
export type UpdateCreatePayload = CreateRecord;
