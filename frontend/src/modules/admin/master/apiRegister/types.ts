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

export interface ApiRegisterRecord {
  id: string;
  apiName: string;
  apiType: string;
  apiTypeId?: string;
  developmentType: "admin" | "developer";
  url: string;
  requestType: string;
  requestTypeId?: string;
  requestParameters?: RequestParameterItem[];
  responseParameters?: ResponseParameterItem[];
  responseType: string;
  responseTypeId?: string;
  apiRemarks?: string;

  // Backward compatibility
  provider?: string;
}

export type CreateApiRegisterPayload = Omit<ApiRegisterRecord, "id">;
export type UpdateApiRegisterPayload = ApiRegisterRecord;

