import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { TRANSFER_API_ENDPOINTS } from "./endpoints";
import { TransferRecord, CreateTransferPayload, UpdateTransferPayload } from "./types";

export const transferKeys = {
  all: ["transfer"] as const,
  lists: () => [...transferKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...transferKeys.lists(), params] as const,
  details: () => [...transferKeys.all, "detail"] as const,
  detail: (id: string) => [...transferKeys.details(), id] as const,
};

export function useTransferListQuery() {
  return useApiQuery<TransferRecord[]>(
    transferKeys.lists(),
    TRANSFER_API_ENDPOINTS.LIST
  );
}

export function useTransferDetailQuery(id?: string) {
  return useApiQuery<TransferRecord>(
    transferKeys.detail(id!),
    TRANSFER_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateTransferMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<TransferRecord, Error, CreateTransferPayload>(
    TRANSFER_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Fund Transfer created successfully!");
          void queryClient.invalidateQueries({ queryKey: transferKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateTransferMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<TransferRecord, Error, UpdateTransferPayload>(
    (variables) => TRANSFER_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Fund Transfer updated successfully!");
          void queryClient.invalidateQueries({ queryKey: transferKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteTransferMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => TRANSFER_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Fund Transfer deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: transferKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
