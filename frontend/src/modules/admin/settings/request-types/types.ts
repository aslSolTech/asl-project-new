// Request Type Types
export interface RequestTypeRecord {
  id: string;
  typeName: string;
  requestCode: string;
  httpMethod: string;
  status: string;
}

export type CreateRequestTypePayload = Omit<RequestTypeRecord, "id">;
export type UpdateRequestTypePayload = RequestTypeRecord;

// Request Parameter Types
export interface RequestParamRecord {
  id: string;
  paramName: string;
  slug: string;
}

export type CreateRequestParamPayload = Omit<RequestParamRecord, "id">;
export type UpdateRequestParamPayload = RequestParamRecord;

// Parameter Status Types
export interface ParamStatusRecord {
  id: string;
  statusName: string;
  statusCode: string;
  status: string;
}

export type CreateParamStatusPayload = Omit<ParamStatusRecord, "id">;
export type UpdateParamStatusPayload = ParamStatusRecord;
