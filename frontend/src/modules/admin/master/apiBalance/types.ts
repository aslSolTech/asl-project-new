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

export interface ApiBalanceRecord {
  id: string;
  apiName: string;
  url: string;
  requestType: string;
  requestParameters?: RequestParameterItem[];
  responseParameters?: ResponseParameterItem[];
  responseType: string;
  apiRemarks?: string;

  // Backward compatibility
  provider?: string;
  endpoint?: string;
  currency?: string;
}

export type CreateApiBalancePayload = Omit<ApiBalanceRecord, "id">;
export type UpdateApiBalancePayload = ApiBalanceRecord;

