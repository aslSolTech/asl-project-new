import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { HISTORY_API_ENDPOINTS } from "./endpoints";
import { HistoryRecord, CreateHistoryPayload, UpdateHistoryPayload } from "./types";

export const historyKeys = {
  all: ["history"] as const,
  lists: () => [...historyKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...historyKeys.lists(), params] as const,
  details: () => [...historyKeys.all, "detail"] as const,
  detail: (id: string) => [...historyKeys.details(), id] as const,
};

export function useHistoryListQuery() {
  return useApiQuery<HistoryRecord[]>(
    historyKeys.lists(),
    HISTORY_API_ENDPOINTS.LIST
  );
}

export function useHistoryDetailQuery(id?: string) {
  return useApiQuery<HistoryRecord>(
    historyKeys.detail(id!),
    HISTORY_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateHistoryMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<HistoryRecord, Error, CreateHistoryPayload>(
    HISTORY_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Login History created successfully!");
          void queryClient.invalidateQueries({ queryKey: historyKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateHistoryMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<HistoryRecord, Error, UpdateHistoryPayload>(
    (variables) => HISTORY_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Login History updated successfully!");
          void queryClient.invalidateQueries({ queryKey: historyKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteHistoryMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => HISTORY_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Login History deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: historyKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
