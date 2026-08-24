export interface BillPaymentRecord {
  id: string;
  txId: string;
  amount: string;
  status: string;
}

export type CreateBillPaymentPayload = Omit<BillPaymentRecord, "id">;
export type UpdateBillPaymentPayload = BillPaymentRecord;
