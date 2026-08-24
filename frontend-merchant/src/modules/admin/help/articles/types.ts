export interface ArticlesRecord {
  id: string;
  title: string;
  status: string;
}

export type CreateArticlesPayload = Omit<ArticlesRecord, "id">;
export type UpdateArticlesPayload = ArticlesRecord;
