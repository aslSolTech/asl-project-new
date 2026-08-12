import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { BALANCE_API_ENDPOINTS } from "./endpoints";
import { BalanceRecord, CreateBalancePayload, UpdateBalancePayload } from "./types";

export const balanceKeys = {
  all: ["balance"] as const,
  lists: () => [...balanceKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...balanceKeys.lists(), params] as const,
  details: () => [...balanceKeys.all, "detail"] as const,
  detail: (id: string) => [...balanceKeys.details(), id] as const,
};

export function useBalanceListQuery() {
  return useApiQuery<BalanceRecord[]>(
    balanceKeys.lists(),
    BALANCE_API_ENDPOINTS.LIST
  );
}

export function useBalanceDetailQuery(id?: string) {
  return useApiQuery<BalanceRecord>(
    balanceKeys.detail(id!),
    BALANCE_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateBalanceMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<BalanceRecord, Error, CreateBalancePayload>(
    BALANCE_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Wallet Balance created successfully!");
          void queryClient.invalidateQueries({ queryKey: balanceKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateBalanceMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<BalanceRecord, Error, UpdateBalancePayload>(
    (variables) => BALANCE_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Wallet Balance updated successfully!");
          void queryClient.invalidateQueries({ queryKey: balanceKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteBalanceMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => BALANCE_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Wallet Balance deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: balanceKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
