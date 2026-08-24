import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { API_KEYS_API_ENDPOINTS } from "./endpoints";
import { ApiKeysRecord, CreateApiKeysPayload, UpdateApiKeysPayload } from "./types";

export const apiKeysKeys = {
  all: ["api-keys"] as const,
  lists: () => [...apiKeysKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...apiKeysKeys.lists(), params] as const,
  details: () => [...apiKeysKeys.all, "detail"] as const,
  detail: (id: string) => [...apiKeysKeys.details(), id] as const,
};

export function useApiKeysListQuery() {
  return useApiQuery<ApiKeysRecord[]>(
    apiKeysKeys.lists(),
    API_KEYS_API_ENDPOINTS.LIST
  );
}

export function useApiKeysDetailQuery(id?: string) {
  return useApiQuery<ApiKeysRecord>(
    apiKeysKeys.detail(id!),
    API_KEYS_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateApiKeysMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<ApiKeysRecord, Error, CreateApiKeysPayload>(
    API_KEYS_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("API Keys created successfully!");
          void queryClient.invalidateQueries({ queryKey: apiKeysKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateApiKeysMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<ApiKeysRecord, Error, UpdateApiKeysPayload>(
    (variables) => API_KEYS_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("API Keys updated successfully!");
          void queryClient.invalidateQueries({ queryKey: apiKeysKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteApiKeysMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => API_KEYS_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("API Keys deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: apiKeysKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
