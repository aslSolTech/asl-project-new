export interface AddRecord {
  id: string;
  bankName: string;
  accountNumber: string;
  status: string;
}

export type CreateAddPayload = Omit<AddRecord, "id">;
export type UpdateAddPayload = AddRecord;
