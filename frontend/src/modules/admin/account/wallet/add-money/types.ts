export interface AddMoneyRecord {
  id: string;
  amount: string;
  paymentMethod: string;
  status: string;
}

export type CreateAddMoneyPayload = Omit<AddMoneyRecord, "id">;
export type UpdateAddMoneyPayload = AddMoneyRecord;
