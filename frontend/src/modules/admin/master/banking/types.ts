export interface AepsBankRecord {
  id: string;
  bankName: string;
  iinCode: string;
}

export type CreateAepsBankPayload = Omit<AepsBankRecord, "id">;
export type UpdateAepsBankPayload = AepsBankRecord;
