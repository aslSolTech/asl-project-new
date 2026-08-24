export interface CollectionRecord {
  id: string;
  amount: string;
  status: string;
}

export type CreateCollectionPayload = Omit<CollectionRecord, "id">;
export type UpdateCollectionPayload = CollectionRecord;
