export interface NotificationsRecord {
  id: string;
  channel: string;
  enabled: string;
  status: string;
}

export type CreateNotificationsPayload = Omit<NotificationsRecord, "id">;
export type UpdateNotificationsPayload = NotificationsRecord;
