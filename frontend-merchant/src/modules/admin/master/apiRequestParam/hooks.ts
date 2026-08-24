import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { REQUEST_PARAMETER_API_ENDPOINTS } from "./endpoints";
import { ApiRequestParameterRecord, CreateApiRequestParameterPayload, UpdateApiRequestParameterPayload } from "./types";

export const apiRequestParameterKeys = {
  all: ["api-request-parameter"] as const,
  lists: () => [...apiRequestParameterKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...apiRequestParameterKeys.lists(), params] as const,
  details: () => [...apiRequestParameterKeys.all, "detail"] as const,
  detail: (id: string) => [...apiRequestParameterKeys.details(), id] as const,
};

export function useApiRequestParameterListQuery() {
  return useApiQuery<ApiRequestParameterRecord[]>(
    apiRequestParameterKeys.lists(),
    REQUEST_PARAMETER_API_ENDPOINTS.LIST
  );
}

export function useApiRequestParameterDetailQuery(id?: string) {
  return useApiQuery<ApiRequestParameterRecord>(
    apiRequestParameterKeys.detail(id!),
    REQUEST_PARAMETER_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateApiRequestParameterMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<ApiRequestParameterRecord, Error, CreateApiRequestParameterPayload>(
    REQUEST_PARAMETER_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Request Parameter created successfully!");
          void queryClient.invalidateQueries({ queryKey: apiRequestParameterKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateApiRequestParameterMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<ApiRequestParameterRecord, Error, UpdateApiRequestParameterPayload>(
    (variables) => REQUEST_PARAMETER_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Request Parameter updated successfully!");
          void queryClient.invalidateQueries({ queryKey: apiRequestParameterKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteApiRequestParameterMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => REQUEST_PARAMETER_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Request Parameter deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: apiRequestParameterKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
