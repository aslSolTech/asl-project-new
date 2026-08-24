import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { STATUS_API_API_ENDPOINTS } from "./endpoints";
import { ApiStatusRecord, CreateApiStatusPayload, UpdateApiStatusPayload } from "./types";

export const apiStatusKeys = {
  all: ["api-status"] as const,
  lists: () => [...apiStatusKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...apiStatusKeys.lists(), params] as const,
  details: () => [...apiStatusKeys.all, "detail"] as const,
  detail: (id: string) => [...apiStatusKeys.details(), id] as const,
};

export function useApiStatusListQuery() {
  return useApiQuery<ApiStatusRecord[]>(
    apiStatusKeys.lists(),
    STATUS_API_API_ENDPOINTS.LIST
  );
}

export function useApiStatusDetailQuery(id?: string) {
  return useApiQuery<ApiStatusRecord>(
    apiStatusKeys.detail(id!),
    STATUS_API_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateApiStatusMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<ApiStatusRecord, Error, CreateApiStatusPayload>(
    STATUS_API_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Status API created successfully!");
          void queryClient.invalidateQueries({ queryKey: apiStatusKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateApiStatusMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<ApiStatusRecord, Error, UpdateApiStatusPayload>(
    (variables) => STATUS_API_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Status API updated successfully!");
          void queryClient.invalidateQueries({ queryKey: apiStatusKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteApiStatusMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => STATUS_API_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Status API deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: apiStatusKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
