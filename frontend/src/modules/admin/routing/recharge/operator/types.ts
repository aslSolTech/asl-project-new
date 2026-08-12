export interface OperatorRecord {
  id: string;
  operator: string;
  api: string;
  status: string;
}

export type CreateOperatorPayload = Omit<OperatorRecord, "id">;
export type UpdateOperatorPayload = OperatorRecord;
