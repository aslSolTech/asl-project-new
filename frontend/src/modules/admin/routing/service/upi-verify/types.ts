export interface UpiVerifyRecord {
  id: string;
  service: string;
  api: string;
  status: string;
}

export type CreateUpiVerifyPayload = Omit<UpiVerifyRecord, "id">;
export type UpdateUpiVerifyPayload = UpiVerifyRecord;
