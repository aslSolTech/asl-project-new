import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { BALANCE_API_API_ENDPOINTS } from "./endpoints";
import { ApiBalanceRecord, CreateApiBalancePayload, UpdateApiBalancePayload } from "./types";

export const apiBalanceKeys = {
  all: ["api-balance"] as const,
  lists: () => [...apiBalanceKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...apiBalanceKeys.lists(), params] as const,
  details: () => [...apiBalanceKeys.all, "detail"] as const,
  detail: (id: string) => [...apiBalanceKeys.details(), id] as const,
};

export function useApiBalanceListQuery() {
  return useApiQuery<ApiBalanceRecord[]>(
    apiBalanceKeys.lists(),
    BALANCE_API_API_ENDPOINTS.LIST
  );
}

export function useApiBalanceDetailQuery(id?: string) {
  return useApiQuery<ApiBalanceRecord>(
    apiBalanceKeys.detail(id!),
    BALANCE_API_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateApiBalanceMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<ApiBalanceRecord, Error, CreateApiBalancePayload>(
    BALANCE_API_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Balance API created successfully!");
          void queryClient.invalidateQueries({ queryKey: apiBalanceKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateApiBalanceMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<ApiBalanceRecord, Error, UpdateApiBalancePayload>(
    (variables) => BALANCE_API_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Balance API updated successfully!");
          void queryClient.invalidateQueries({ queryKey: apiBalanceKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteApiBalanceMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => BALANCE_API_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Balance API deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: apiBalanceKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
