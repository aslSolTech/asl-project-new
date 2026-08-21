export interface OperatorRecord {
  id: string;
  operatorTypeId: string;
  operatorTypeName?: string;
  operatorId: string;
  operatorName?: string;
  apiIds: string[];
  apiNames?: string[];
  fallback: "active" | "inactive" | boolean;
  status: "active" | "inactive";

  createdAt?: string;
  updatedAt?: string;
}

export type CreateOperatorPayload = Omit<OperatorRecord, "id">;
export type UpdateOperatorPayload = OperatorRecord;

