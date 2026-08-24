import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { LEDGER_API_ENDPOINTS } from "./endpoints";
import { LedgerRecord, CreateLedgerPayload, UpdateLedgerPayload } from "./types";

export const ledgerKeys = {
  all: ["ledger"] as const,
  lists: () => [...ledgerKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...ledgerKeys.lists(), params] as const,
  details: () => [...ledgerKeys.all, "detail"] as const,
  detail: (id: string) => [...ledgerKeys.details(), id] as const,
};

export function useLedgerListQuery() {
  return useApiQuery<LedgerRecord[]>(
    ledgerKeys.lists(),
    LEDGER_API_ENDPOINTS.LIST
  );
}

export function useLedgerDetailQuery(id?: string) {
  return useApiQuery<LedgerRecord>(
    ledgerKeys.detail(id!),
    LEDGER_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateLedgerMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<LedgerRecord, Error, CreateLedgerPayload>(
    LEDGER_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Wallet Ledger created successfully!");
          void queryClient.invalidateQueries({ queryKey: ledgerKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateLedgerMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<LedgerRecord, Error, UpdateLedgerPayload>(
    (variables) => LEDGER_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Wallet Ledger updated successfully!");
          void queryClient.invalidateQueries({ queryKey: ledgerKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteLedgerMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => LEDGER_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Wallet Ledger deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: ledgerKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
