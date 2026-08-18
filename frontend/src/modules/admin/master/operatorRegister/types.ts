export interface OperatorRegisterRecord {
  id: string;
  operatorTypeId: string;
  operatorTypeName?: string;
  operatorName: string;
  optionalParameter?: string;
  parameterLink?: string;
  isFetch: string;
  status: string;
  stateName?: string;
  operatorIcon?: string;

  // Backward compatibility
  category?: string;
  code?: string;
}

export type CreateOperatorRegisterPayload = Omit<OperatorRegisterRecord, "id">;
export type UpdateOperatorRegisterPayload = OperatorRegisterRecord;
