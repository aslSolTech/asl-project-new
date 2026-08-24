export interface DeductRecord {
  id: string;
  userId: string;
  amount: string;
  status: string;
}

export type CreateDeductPayload = Omit<DeductRecord, "id">;
export type UpdateDeductPayload = DeductRecord;
