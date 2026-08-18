import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { API_TYPE_ENDPOINTS } from "./endpoints";
import {
  ApiTypeRecord,
  CreateApiTypePayload,
  UpdateApiTypePayload,
} from "./types";

export const apiTypeKeys = {
  all: ["apiTypes"] as const,
  lists: () => [...apiTypeKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...apiTypeKeys.lists(), params] as const,
  details: () => [...apiTypeKeys.all, "detail"] as const,
  detail: (id: string) => [...apiTypeKeys.details(), id] as const,
};

export function useApiTypeListQuery() {
  return useApiQuery<ApiTypeRecord[]>(
    apiTypeKeys.lists(),
    API_TYPE_ENDPOINTS.LIST
  );
}

export function useApiTypeDetailQuery(id?: string) {
  return useApiQuery<ApiTypeRecord>(
    apiTypeKeys.detail(id!),
    API_TYPE_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateApiTypeMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<ApiTypeRecord, Error, CreateApiTypePayload>(
    API_TYPE_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("API Type created successfully!");
          void queryClient.invalidateQueries({ queryKey: apiTypeKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create API Type");
        },
      },
    }
  );
}

export function useUpdateApiTypeMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<ApiTypeRecord, Error, UpdateApiTypePayload>(
    (variables) => API_TYPE_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("API Type updated successfully!");
          void queryClient.invalidateQueries({ queryKey: apiTypeKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update API Type");
        },
      },
    }
  );
}

export function useDeleteApiTypeMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => API_TYPE_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("API Type deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: apiTypeKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete API Type");
        },
      },
    }
  );
}
