import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { MESSAGES_API_ENDPOINTS } from "./endpoints";
import { MessagesRecord, CreateMessagesPayload, UpdateMessagesPayload } from "./types";

export const messagesKeys = {
  all: ["messages"] as const,
  lists: () => [...messagesKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...messagesKeys.lists(), params] as const,
  details: () => [...messagesKeys.all, "detail"] as const,
  detail: (id: string) => [...messagesKeys.details(), id] as const,
};

export function useMessagesListQuery() {
  return useApiQuery<MessagesRecord[]>(
    messagesKeys.lists(),
    MESSAGES_API_ENDPOINTS.LIST
  );
}

export function useMessagesDetailQuery(id?: string) {
  return useApiQuery<MessagesRecord>(
    messagesKeys.detail(id!),
    MESSAGES_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateMessagesMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<MessagesRecord, Error, CreateMessagesPayload>(
    MESSAGES_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Contact Messages created successfully!");
          void queryClient.invalidateQueries({ queryKey: messagesKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateMessagesMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<MessagesRecord, Error, UpdateMessagesPayload>(
    (variables) => MESSAGES_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Contact Messages updated successfully!");
          void queryClient.invalidateQueries({ queryKey: messagesKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteMessagesMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => MESSAGES_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Contact Messages deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: messagesKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
