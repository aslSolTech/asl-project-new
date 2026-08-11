export interface OperatorCategoryRecord {
  id: string;
  categoryName: string;
  code: string;
}

export type CreateOperatorCategoryPayload = Omit<OperatorCategoryRecord, "id">;
export type UpdateOperatorCategoryPayload = OperatorCategoryRecord;
