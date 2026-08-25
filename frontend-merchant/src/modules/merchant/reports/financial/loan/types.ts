export interface LoanRecord {
  id: string;
  txId: string;
  amount: string;
  status: string;
}

export type CreateLoanPayload = Omit<LoanRecord, "id">;
export type UpdateLoanPayload = LoanRecord;
