export interface OperatorCodeRecord {
  id: string;
  apiId?: string;
  apiName?: string;
  apiType?: string;
  operatorTypeId?: string;
  operatorTypeName?: string;
  operator?: string;
  operatorName?: string;
  operatorId?: string;
  code?: string | number;
  connectionType?: string;
  commission?: number | string;
  gst?: number | string;
  isFlat?: "Yes" | "No" | "Y" | "N" | boolean;

  // Backward compatibility
  provider?: string;
  providerCode?: string;
}

export type CreateOperatorCodePayload = Omit<OperatorCodeRecord, "id">;
export type UpdateOperatorCodePayload = OperatorCodeRecord;

