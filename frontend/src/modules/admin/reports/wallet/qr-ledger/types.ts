export interface QrLedgerRecord {
  id: string;
  type: string;
  balance: string;
}

export type CreateQrLedgerPayload = Omit<QrLedgerRecord, "id">;
export type UpdateQrLedgerPayload = QrLedgerRecord;
