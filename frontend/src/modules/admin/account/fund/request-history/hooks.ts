import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { REQUEST_HISTORY_API_ENDPOINTS } from "./endpoints";
import { RequestHistoryRecord, CreateRequestHistoryPayload, UpdateRequestHistoryPayload } from "./types";

export const requestHistoryKeys = {
  all: ["request-history"] as const,
  lists: () => [...requestHistoryKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...requestHistoryKeys.lists(), params] as const,
  details: () => [...requestHistoryKeys.all, "detail"] as const,
  detail: (id: string) => [...requestHistoryKeys.details(), id] as const,
};

export function useRequestHistoryListQuery() {
  return useApiQuery<RequestHistoryRecord[]>(
    requestHistoryKeys.lists(),
    REQUEST_HISTORY_API_ENDPOINTS.LIST
  );
}

export function useRequestHistoryDetailQuery(id?: string) {
  return useApiQuery<RequestHistoryRecord>(
    requestHistoryKeys.detail(id!),
    REQUEST_HISTORY_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateRequestHistoryMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<RequestHistoryRecord, Error, CreateRequestHistoryPayload>(
    REQUEST_HISTORY_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Fund Request History created successfully!");
          void queryClient.invalidateQueries({ queryKey: requestHistoryKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateRequestHistoryMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<RequestHistoryRecord, Error, UpdateRequestHistoryPayload>(
    (variables) => REQUEST_HISTORY_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Fund Request History updated successfully!");
          void queryClient.invalidateQueries({ queryKey: requestHistoryKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteRequestHistoryMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => REQUEST_HISTORY_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Fund Request History deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: requestHistoryKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
