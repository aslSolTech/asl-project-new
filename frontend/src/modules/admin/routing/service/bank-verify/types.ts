export interface BankVerifyRecord {
  id: string;
  service: string;
  api: string;
  status: string;
}

export type CreateBankVerifyPayload = Omit<BankVerifyRecord, "id">;
export type UpdateBankVerifyPayload = BankVerifyRecord;
