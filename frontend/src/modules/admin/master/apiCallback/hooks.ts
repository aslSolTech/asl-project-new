import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { CALLBACK_API_API_ENDPOINTS } from "./endpoints";
import { ApiCallbackRecord, CreateApiCallbackPayload, UpdateApiCallbackPayload } from "./types";

export const apiCallbackKeys = {
  all: ["api-callback"] as const,
  lists: () => [...apiCallbackKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...apiCallbackKeys.lists(), params] as const,
  details: () => [...apiCallbackKeys.all, "detail"] as const,
  detail: (id: string) => [...apiCallbackKeys.details(), id] as const,
};

export function useApiCallbackListQuery() {
  return useApiQuery<ApiCallbackRecord[]>(
    apiCallbackKeys.lists(),
    CALLBACK_API_API_ENDPOINTS.LIST
  );
}

export function useApiCallbackDetailQuery(id?: string) {
  return useApiQuery<ApiCallbackRecord>(
    apiCallbackKeys.detail(id!),
    CALLBACK_API_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateApiCallbackMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<ApiCallbackRecord, Error, CreateApiCallbackPayload>(
    CALLBACK_API_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Callback API created successfully!");
          void queryClient.invalidateQueries({ queryKey: apiCallbackKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateApiCallbackMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<ApiCallbackRecord, Error, UpdateApiCallbackPayload>(
    (variables) => CALLBACK_API_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Callback API updated successfully!");
          void queryClient.invalidateQueries({ queryKey: apiCallbackKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteApiCallbackMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => CALLBACK_API_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Callback API deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: apiCallbackKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
