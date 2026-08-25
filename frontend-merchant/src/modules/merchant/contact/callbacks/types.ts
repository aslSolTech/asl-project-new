export interface CallbacksRecord {
  id: string;
  name: string;
  phone: string;
  status: string;
}

export type CreateCallbacksPayload = Omit<CallbacksRecord, "id">;
export type UpdateCallbacksPayload = CallbacksRecord;
