import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { QR_LEDGER_API_ENDPOINTS } from "./endpoints";
import { QrLedgerRecord, CreateQrLedgerPayload, UpdateQrLedgerPayload } from "./types";

export const qrLedgerKeys = {
  all: ["qr-ledger"] as const,
  lists: () => [...qrLedgerKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...qrLedgerKeys.lists(), params] as const,
  details: () => [...qrLedgerKeys.all, "detail"] as const,
  detail: (id: string) => [...qrLedgerKeys.details(), id] as const,
};

export function useQrLedgerListQuery() {
  return useApiQuery<QrLedgerRecord[]>(
    qrLedgerKeys.lists(),
    QR_LEDGER_API_ENDPOINTS.LIST
  );
}

export function useQrLedgerDetailQuery(id?: string) {
  return useApiQuery<QrLedgerRecord>(
    qrLedgerKeys.detail(id!),
    QR_LEDGER_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateQrLedgerMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<QrLedgerRecord, Error, CreateQrLedgerPayload>(
    QR_LEDGER_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("QR Wallet Ledger created successfully!");
          void queryClient.invalidateQueries({ queryKey: qrLedgerKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateQrLedgerMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<QrLedgerRecord, Error, UpdateQrLedgerPayload>(
    (variables) => QR_LEDGER_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("QR Wallet Ledger updated successfully!");
          void queryClient.invalidateQueries({ queryKey: qrLedgerKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteQrLedgerMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => QR_LEDGER_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("QR Wallet Ledger deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: qrLedgerKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
