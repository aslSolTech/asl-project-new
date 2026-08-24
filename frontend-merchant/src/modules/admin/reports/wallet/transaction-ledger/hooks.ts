import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { TRANSACTION_LEDGER_API_ENDPOINTS } from "./endpoints";
import { TransactionLedgerRecord, CreateTransactionLedgerPayload, UpdateTransactionLedgerPayload } from "./types";

export const transactionLedgerKeys = {
  all: ["transaction-ledger"] as const,
  lists: () => [...transactionLedgerKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...transactionLedgerKeys.lists(), params] as const,
  details: () => [...transactionLedgerKeys.all, "detail"] as const,
  detail: (id: string) => [...transactionLedgerKeys.details(), id] as const,
};

export function useTransactionLedgerListQuery() {
  return useApiQuery<TransactionLedgerRecord[]>(
    transactionLedgerKeys.lists(),
    TRANSACTION_LEDGER_API_ENDPOINTS.LIST
  );
}

export function useTransactionLedgerDetailQuery(id?: string) {
  return useApiQuery<TransactionLedgerRecord>(
    transactionLedgerKeys.detail(id!),
    TRANSACTION_LEDGER_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateTransactionLedgerMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<TransactionLedgerRecord, Error, CreateTransactionLedgerPayload>(
    TRANSACTION_LEDGER_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Transaction Ledger created successfully!");
          void queryClient.invalidateQueries({ queryKey: transactionLedgerKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateTransactionLedgerMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<TransactionLedgerRecord, Error, UpdateTransactionLedgerPayload>(
    (variables) => TRANSACTION_LEDGER_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Transaction Ledger updated successfully!");
          void queryClient.invalidateQueries({ queryKey: transactionLedgerKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteTransactionLedgerMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => TRANSACTION_LEDGER_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Transaction Ledger deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: transactionLedgerKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
