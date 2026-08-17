export interface ResponseTypeRecord {
  id: string;
  responseFormat: string;
  code: string;
}

export type CreateResponseTypePayload = Omit<ResponseTypeRecord, "id">;
export type UpdateResponseTypePayload = ResponseTypeRecord;
