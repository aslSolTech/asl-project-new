export interface OperatorRegisterRecord {
  id: string;
  operatorName: string;
  category: string;
  code: string;
}

export type CreateOperatorRegisterPayload = Omit<OperatorRegisterRecord, "id">;
export type UpdateOperatorRegisterPayload = OperatorRegisterRecord;
