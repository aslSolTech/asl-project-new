import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { NOTIFICATIONS_API_ENDPOINTS } from "./endpoints";
import { NotificationsRecord, CreateNotificationsPayload, UpdateNotificationsPayload } from "./types";

export const notificationsKeys = {
  all: ["notifications"] as const,
  lists: () => [...notificationsKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...notificationsKeys.lists(), params] as const,
  details: () => [...notificationsKeys.all, "detail"] as const,
  detail: (id: string) => [...notificationsKeys.details(), id] as const,
};

export function useNotificationsListQuery() {
  return useApiQuery<NotificationsRecord[]>(
    notificationsKeys.lists(),
    NOTIFICATIONS_API_ENDPOINTS.LIST
  );
}

export function useNotificationsDetailQuery(id?: string) {
  return useApiQuery<NotificationsRecord>(
    notificationsKeys.detail(id!),
    NOTIFICATIONS_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateNotificationsMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<NotificationsRecord, Error, CreateNotificationsPayload>(
    NOTIFICATIONS_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Announcements created successfully!");
          void queryClient.invalidateQueries({ queryKey: notificationsKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateNotificationsMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<NotificationsRecord, Error, UpdateNotificationsPayload>(
    (variables) => NOTIFICATIONS_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Announcements updated successfully!");
          void queryClient.invalidateQueries({ queryKey: notificationsKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteNotificationsMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => NOTIFICATIONS_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Announcements deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: notificationsKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
