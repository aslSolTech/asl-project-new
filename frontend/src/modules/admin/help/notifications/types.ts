export interface NotificationsRecord {
  id: string;
  title: string;
  status: string;
}

export type CreateNotificationsPayload = Omit<NotificationsRecord, "id">;
export type UpdateNotificationsPayload = NotificationsRecord;
