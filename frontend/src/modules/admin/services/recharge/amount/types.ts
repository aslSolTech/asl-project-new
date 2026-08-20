export interface AmountRecord {
  id: string;
  amount: string;
  api: string;
  status: string;
}

export type CreateAmountPayload = Omit<AmountRecord, "id">;
export type UpdateAmountPayload = AmountRecord;
