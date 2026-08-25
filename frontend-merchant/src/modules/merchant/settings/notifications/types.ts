export interface NotificationRecord {
  id: string;
  title: string;
  description: string;
  userTypeId: string;
  userTypeName?: string;
  notificationTypeId: string;
  notificationTypeName?: string;
  imageUrl?: string;
  status: "Active" | "Inactive";
  createdAt?: string;

  // Backward compatibility
  message?: string;
}

export type CreateNotificationPayload = Omit<NotificationRecord, "id">;
export type UpdateNotificationPayload = NotificationRecord;

export interface NotificationTypeRecord {
  id: string;
  name: string;
  slug: string;
  description?: string;
  badgeColor?: string;
  status: "Active" | "Inactive";
  createdAt?: string;
}

export type CreateNotificationTypePayload = Omit<NotificationTypeRecord, "id">;
export type UpdateNotificationTypePayload = NotificationTypeRecord;

export interface NotificationFormProps {
  readonly mode: "create" | "edit";
  readonly initialData?: NotificationRecord | null;
  readonly onSuccess?: () => void;
}

export interface NotificationTypeFormProps {
  readonly mode: "create" | "edit";
  readonly initialData?: NotificationTypeRecord | null;
  readonly onSuccess?: () => void;
}

