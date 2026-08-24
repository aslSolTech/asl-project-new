import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { API_MANUAL_API_ENDPOINTS } from "./endpoints";
import { ApiManualRecord, CreateApiManualPayload, UpdateApiManualPayload } from "./types";

export const apiManualKeys = {
  all: ["api-manual"] as const,
  lists: () => [...apiManualKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...apiManualKeys.lists(), params] as const,
  details: () => [...apiManualKeys.all, "detail"] as const,
  detail: (id: string) => [...apiManualKeys.details(), id] as const,
};

export function useApiManualListQuery() {
  return useApiQuery<ApiManualRecord[]>(
    apiManualKeys.lists(),
    API_MANUAL_API_ENDPOINTS.LIST
  );
}

export function useApiManualDetailQuery(id?: string) {
  return useApiQuery<ApiManualRecord>(
    apiManualKeys.detail(id!),
    API_MANUAL_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateApiManualMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<ApiManualRecord, Error, CreateApiManualPayload>(
    API_MANUAL_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("API Manual created successfully!");
          void queryClient.invalidateQueries({ queryKey: apiManualKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateApiManualMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<ApiManualRecord, Error, UpdateApiManualPayload>(
    (variables) => API_MANUAL_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("API Manual updated successfully!");
          void queryClient.invalidateQueries({ queryKey: apiManualKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteApiManualMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => API_MANUAL_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("API Manual deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: apiManualKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
