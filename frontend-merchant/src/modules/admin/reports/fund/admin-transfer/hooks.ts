import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { ADMIN_TRANSFER_API_ENDPOINTS } from "./endpoints";
import { AdminTransferRecord, CreateAdminTransferPayload, UpdateAdminTransferPayload } from "./types";

export const adminTransferKeys = {
  all: ["admin-transfer"] as const,
  lists: () => [...adminTransferKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...adminTransferKeys.lists(), params] as const,
  details: () => [...adminTransferKeys.all, "detail"] as const,
  detail: (id: string) => [...adminTransferKeys.details(), id] as const,
};

export function useAdminTransferListQuery() {
  return useApiQuery<AdminTransferRecord[]>(
    adminTransferKeys.lists(),
    ADMIN_TRANSFER_API_ENDPOINTS.LIST
  );
}

export function useAdminTransferDetailQuery(id?: string) {
  return useApiQuery<AdminTransferRecord>(
    adminTransferKeys.detail(id!),
    ADMIN_TRANSFER_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateAdminTransferMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<AdminTransferRecord, Error, CreateAdminTransferPayload>(
    ADMIN_TRANSFER_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Admin Fund Transfer created successfully!");
          void queryClient.invalidateQueries({ queryKey: adminTransferKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateAdminTransferMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<AdminTransferRecord, Error, UpdateAdminTransferPayload>(
    (variables) => ADMIN_TRANSFER_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Admin Fund Transfer updated successfully!");
          void queryClient.invalidateQueries({ queryKey: adminTransferKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteAdminTransferMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => ADMIN_TRANSFER_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Admin Fund Transfer deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: adminTransferKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
