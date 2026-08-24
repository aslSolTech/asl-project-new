export interface RequestBankListRecord {
  id: string;
  bankName: string;
  code: string;
  status: string;
}

export type CreateRequestBankListPayload = Omit<RequestBankListRecord, "id">;
export type UpdateRequestBankListPayload = RequestBankListRecord;
