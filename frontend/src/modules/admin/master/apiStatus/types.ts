export interface RequestParameterItem {
  id?: string;
  paramName: string;
  paramType: string;
  paramValue: string;
}

export interface ResponseParameterItem {
  id?: string;
  paramName: string;
  paramValue: string;
  paramFor: string;
}

export interface ApiStatusRecord {
  id: string;
  apiName: string;
  statusFor?: string;
  url: string;
  requestType: string;
  requestParameters?: RequestParameterItem[];
  responseParameters?: ResponseParameterItem[];
  responseType: string;
  apiRemarks?: string;

  // Backward compatibility
  endpoint?: string;
  method?: string;
  successCode?: string;
}

export type CreateApiStatusPayload = Omit<ApiStatusRecord, "id">;
export type UpdateApiStatusPayload = ApiStatusRecord;

