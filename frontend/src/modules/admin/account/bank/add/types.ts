export interface AddRecord {
  id: string;
  bankName: string;
  branchName: string;
  ifscCode: string;
  accountNumber: string;
  accountHolderName: string;
  status: boolean;
}

export type CreateAddPayload = Omit<AddRecord, "id">;
export type UpdateAddPayload = AddRecord;
