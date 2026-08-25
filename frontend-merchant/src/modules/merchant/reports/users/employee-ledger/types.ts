export interface EmployeeLedgerRecord {
  id: string;
  type: string;
  balance: string;
}

export type CreateEmployeeLedgerPayload = Omit<EmployeeLedgerRecord, "id">;
export type UpdateEmployeeLedgerPayload = EmployeeLedgerRecord;
