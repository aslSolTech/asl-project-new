export interface CategoriesRecord {
  id: string;
  categoryName: string;
  status: string;
  createdAt?: string;
}

export type CreateCategoriesPayload = Omit<CategoriesRecord, "id">;
export type UpdateCategoriesPayload = CategoriesRecord;
