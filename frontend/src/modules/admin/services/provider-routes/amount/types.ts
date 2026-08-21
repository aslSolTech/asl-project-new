export type AmountCondition = "==" | ">=" | "<=" | "<>" | ">" | "<" | "AND" | "BETWEEN";

export interface AmountRecord {
  id: string;
  condition: AmountCondition;
  amountFrom: string | number;
  amountTo?: string | number;
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

export type CreateAmountPayload = Omit<AmountRecord, "id">;
export type UpdateAmountPayload = AmountRecord;

