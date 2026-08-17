import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { NOTIFICATION_API_ENDPOINTS } from "./endpoints";
import { NotificationRecord, CreateNotificationPayload, UpdateNotificationPayload } from "./types";

export const notificationsKeys = {
  all: ["list"] as const,
  lists: () => [...notificationsKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...notificationsKeys.lists(), params] as const,
  details: () => [...notificationsKeys.all, "detail"] as const,
  detail: (id: string) => [...notificationsKeys.details(), id] as const,
};

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
          toast.success("Notification List created successfully!");
          void queryClient.invalidateQueries({ queryKey: notificationsKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
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
          toast.success("Notification List updated successfully!");
          void queryClient.invalidateQueries({ queryKey: notificationsKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
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
          toast.success("Notification List deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: notificationsKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
