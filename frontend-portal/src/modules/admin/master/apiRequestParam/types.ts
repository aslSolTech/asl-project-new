export interface ApiRequestParameterRecord {
  id: string;
  paramName: string;
  dataType: string;
  required: string;
  description: string;
}

export type CreateApiRequestParameterPayload = Omit<ApiRequestParameterRecord, "id">;
export type UpdateApiRequestParameterPayload = ApiRequestParameterRecord;
