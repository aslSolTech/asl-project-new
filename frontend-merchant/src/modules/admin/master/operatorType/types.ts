export interface OperatorTypeRecord {
  id: string;
  typeName: string;
  code: string;
  description: string;
}

export type CreateOperatorTypePayload = Omit<OperatorTypeRecord, "id">;
export type UpdateOperatorTypePayload = OperatorTypeRecord;
