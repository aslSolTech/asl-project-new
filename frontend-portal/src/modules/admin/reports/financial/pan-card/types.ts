export interface PanCardRecord {
  id: string;
  txId: string;
  amount: string;
  status: string;
}

export type CreatePanCardPayload = Omit<PanCardRecord, "id">;
export type UpdatePanCardPayload = PanCardRecord;
