import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { USER_LEDGER_API_ENDPOINTS } from "./endpoints";
import { UserLedgerRecord, CreateUserLedgerPayload, UpdateUserLedgerPayload } from "./types";

export const userLedgerKeys = {
  all: ["user-ledger"] as const,
  lists: () => [...userLedgerKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...userLedgerKeys.lists(), params] as const,
  details: () => [...userLedgerKeys.all, "detail"] as const,
  detail: (id: string) => [...userLedgerKeys.details(), id] as const,
};

export function useUserLedgerListQuery() {
  return useApiQuery<UserLedgerRecord[]>(
    userLedgerKeys.lists(),
    USER_LEDGER_API_ENDPOINTS.LIST
  );
}

export function useUserLedgerDetailQuery(id?: string) {
  return useApiQuery<UserLedgerRecord>(
    userLedgerKeys.detail(id!),
    USER_LEDGER_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateUserLedgerMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<UserLedgerRecord, Error, CreateUserLedgerPayload>(
    USER_LEDGER_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("User Ledger created successfully!");
          void queryClient.invalidateQueries({ queryKey: userLedgerKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateUserLedgerMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<UserLedgerRecord, Error, UpdateUserLedgerPayload>(
    (variables) => USER_LEDGER_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("User Ledger updated successfully!");
          void queryClient.invalidateQueries({ queryKey: userLedgerKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteUserLedgerMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => USER_LEDGER_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("User Ledger deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: userLedgerKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
