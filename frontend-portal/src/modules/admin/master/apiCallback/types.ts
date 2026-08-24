export interface CallbackParameterItem {
  id?: string;
  paramName: string;
  paramValue: string;
  paramFor: string;
}

export interface ApiCallbackRecord {
  id: string;
  apiName: string;
  apiId?: string;
  callbackUrl: string;
  parameters?: CallbackParameterItem[];
  apiRemarks?: string;

  // Backward compatibility
  customerName?: string;
  url?: string;
  retryPolicy?: string;
}

export type CreateApiCallbackPayload = Omit<ApiCallbackRecord, "id">;
export type UpdateApiCallbackPayload = ApiCallbackRecord;

