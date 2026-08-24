import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { NOTIFICATION_API_ENDPOINTS } from "./endpoints";
import {
  NotificationRecord,
  CreateNotificationPayload,
  UpdateNotificationPayload,
  NotificationTypeRecord,
  CreateNotificationTypePayload,
  UpdateNotificationTypePayload,
} from "./types";

export const notificationsKeys = {
  all: ["notifications"] as const,
  lists: () => [...notificationsKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...notificationsKeys.lists(), params] as const,
  details: () => [...notificationsKeys.all, "detail"] as const,
  detail: (id: string) => [...notificationsKeys.details(), id] as const,
};

export const notificationTypeKeys = {
  all: ["notification-types"] as const,
  lists: () => [...notificationTypeKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...notificationTypeKeys.lists(), params] as const,
  details: () => [...notificationTypeKeys.all, "detail"] as const,
  detail: (id: string) => [...notificationTypeKeys.details(), id] as const,
};

// ==========================================
// NOTIFICATIONS HOOKS
// ==========================================
export function useNotificationListQuery() {
  return useApiQuery<NotificationRecord[]>(
    notificationsKeys.lists(),
    NOTIFICATION_API_ENDPOINTS.LIST
  );
}

export function useNotificationDetailQuery(id?: string) {
  return useApiQuery<NotificationRecord>(
    notificationsKeys.detail(id!),
    NOTIFICATION_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateNotificationMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<NotificationRecord, Error, CreateNotificationPayload>(
    NOTIFICATION_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Notification broadcast created successfully!");
          void queryClient.invalidateQueries({ queryKey: notificationsKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create notification");
        },
      },
    }
  );
}

export function useUpdateNotificationMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<NotificationRecord, Error, UpdateNotificationPayload>(
    (variables) => NOTIFICATION_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Notification broadcast updated successfully!");
          void queryClient.invalidateQueries({ queryKey: notificationsKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update notification");
        },
      },
    }
  );
}

export function useDeleteNotificationMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => NOTIFICATION_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Notification deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: notificationsKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete notification");
        },
      },
    }
  );
}

// ==========================================
// NOTIFICATION TYPE HOOKS
// ==========================================
export function useNotificationTypeListQuery() {
  return useApiQuery<NotificationTypeRecord[]>(
    notificationTypeKeys.lists(),
    "/api/settings/notification-types"
  );
}

export function useNotificationTypeDetailQuery(id?: string) {
  return useApiQuery<NotificationTypeRecord>(
    notificationTypeKeys.detail(id!),
    `/api/settings/notification-types/${id}`,
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateNotificationTypeMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<NotificationTypeRecord, Error, CreateNotificationTypePayload>(
    "/api/settings/notification-types",
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Notification Type created successfully!");
          void queryClient.invalidateQueries({ queryKey: notificationTypeKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create notification type");
        },
      },
    }
  );
}

export function useUpdateNotificationTypeMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<NotificationTypeRecord, Error, UpdateNotificationTypePayload>(
    (variables) => `/api/settings/notification-types/${variables.id}`,
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Notification Type updated successfully!");
          void queryClient.invalidateQueries({ queryKey: notificationTypeKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update notification type");
        },
      },
    }
  );
}

export function useDeleteNotificationTypeMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => `/api/settings/notification-types/${id}`,
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Notification Type deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: notificationTypeKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete notification type");
        },
      },
    }
  );
}

