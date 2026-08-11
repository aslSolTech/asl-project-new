export interface OperatorCodeRecord {
  id: string;
  provider: string;
  operator: string;
  code: string;
  providerCode: string;
}

export type CreateOperatorCodePayload = Omit<OperatorCodeRecord, "id">;
export type UpdateOperatorCodePayload = OperatorCodeRecord;
