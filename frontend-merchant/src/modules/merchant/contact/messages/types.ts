export interface MessagesRecord {
  id: string;
  name: string;
  message: string;
  status: string;
}

export type CreateMessagesPayload = Omit<MessagesRecord, "id">;
export type UpdateMessagesPayload = MessagesRecord;
