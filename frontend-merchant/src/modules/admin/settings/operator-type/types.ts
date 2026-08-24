export interface OperatorTypeRecord {
  id: string;
  operatorType: string;
  apiType: string;
  status: string;
}

export type CreateOperatorTypePayload = Omit<OperatorTypeRecord, "id">;
export type UpdateOperatorTypePayload = OperatorTypeRecord;
