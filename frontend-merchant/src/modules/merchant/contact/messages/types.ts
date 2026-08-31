export type TransactionType = "service" | "fund" | "website" | "others";

export interface MessagesRecord {
  id: string;
  name?: string;
  transactionType: string;
  message: string;
  status?: string;
  createdAt?: string;
  created_at?: string;
}

export type CreateMessagesPayload = Omit<MessagesRecord, "id">;
export type UpdateMessagesPayload = MessagesRecord;
