import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { TRANSACTIONS_API_ENDPOINTS } from "./endpoints";
import { TransactionsRecord, CreateTransactionsPayload, UpdateTransactionsPayload } from "./types";

export const transactionsKeys = {
  all: ["transactions"] as const,
  lists: () => [...transactionsKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...transactionsKeys.lists(), params] as const,
  details: () => [...transactionsKeys.all, "detail"] as const,
  detail: (id: string) => [...transactionsKeys.details(), id] as const,
};

export function useTransactionsListQuery() {
  return useApiQuery<TransactionsRecord[]>(
    transactionsKeys.lists(),
    TRANSACTIONS_API_ENDPOINTS.LIST
  );
}

export function useTransactionsDetailQuery(id?: string) {
  return useApiQuery<TransactionsRecord>(
    transactionsKeys.detail(id!),
    TRANSACTIONS_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateTransactionsMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<TransactionsRecord, Error, CreateTransactionsPayload>(
    TRANSACTIONS_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Wallet Transactions created successfully!");
          void queryClient.invalidateQueries({ queryKey: transactionsKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateTransactionsMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<TransactionsRecord, Error, UpdateTransactionsPayload>(
    (variables) => TRANSACTIONS_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Wallet Transactions updated successfully!");
          void queryClient.invalidateQueries({ queryKey: transactionsKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteTransactionsMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => TRANSACTIONS_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Wallet Transactions deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: transactionsKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
