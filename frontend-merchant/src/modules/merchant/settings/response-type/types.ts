export interface ResponseTypeRecord {
  id: string;
  responseFormat: string;
}

export type CreateResponseTypePayload = Omit<ResponseTypeRecord, "id">;
export type UpdateResponseTypePayload = ResponseTypeRecord;

// Response Parameter Types
export interface ResponseParamRecord {
  id: string;
  paramName: string;
  slug: string;
}

export type CreateResponseParamPayload = Omit<ResponseParamRecord, "id">;
export type UpdateResponseParamPayload = ResponseParamRecord;
