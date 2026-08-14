export interface NotificationRecord {
  id: string;
  title: string;
  message: string;
  status: string;
}

export type CreateNotificationPayload = Omit<NotificationRecord, "id">;
export type UpdateNotificationPayload = NotificationRecord;


export interface NotificationFormProps {
  readonly mode: "create" | "edit";
  readonly initialData?: NotificationRecord | null;
  readonly onSuccess?: () => void;
}
