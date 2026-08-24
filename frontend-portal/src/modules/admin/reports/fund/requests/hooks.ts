import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { REQUESTS_API_ENDPOINTS } from "./endpoints";
import { RequestsRecord, CreateRequestsPayload, UpdateRequestsPayload } from "./types";

export const requestsKeys = {
  all: ["requests"] as const,
  lists: () => [...requestsKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...requestsKeys.lists(), params] as const,
  details: () => [...requestsKeys.all, "detail"] as const,
  detail: (id: string) => [...requestsKeys.details(), id] as const,
};

export function useRequestsListQuery() {
  return useApiQuery<RequestsRecord[]>(
    requestsKeys.lists(),
    REQUESTS_API_ENDPOINTS.LIST
  );
}

export function useRequestsDetailQuery(id?: string) {
  return useApiQuery<RequestsRecord>(
    requestsKeys.detail(id!),
    REQUESTS_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateRequestsMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<RequestsRecord, Error, CreateRequestsPayload>(
    REQUESTS_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Fund Requests created successfully!");
          void queryClient.invalidateQueries({ queryKey: requestsKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateRequestsMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<RequestsRecord, Error, UpdateRequestsPayload>(
    (variables) => REQUESTS_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Fund Requests updated successfully!");
          void queryClient.invalidateQueries({ queryKey: requestsKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteRequestsMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => REQUESTS_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Fund Requests deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: requestsKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
