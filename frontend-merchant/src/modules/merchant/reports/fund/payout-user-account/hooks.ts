import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { PAYOUT_USER_ACCOUNT_API_ENDPOINTS } from "./endpoints";
import { PayoutUserAccountRecord, CreatePayoutUserAccountPayload, UpdatePayoutUserAccountPayload } from "./types";

export const payoutUserAccountKeys = {
  all: ["payout-user-account"] as const,
  lists: () => [...payoutUserAccountKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...payoutUserAccountKeys.lists(), params] as const,
  details: () => [...payoutUserAccountKeys.all, "detail"] as const,
  detail: (id: string) => [...payoutUserAccountKeys.details(), id] as const,
};

export function usePayoutUserAccountListQuery() {
  return useApiQuery<PayoutUserAccountRecord[]>(
    payoutUserAccountKeys.lists(),
    PAYOUT_USER_ACCOUNT_API_ENDPOINTS.LIST
  );
}

export function usePayoutUserAccountDetailQuery(id?: string) {
  return useApiQuery<PayoutUserAccountRecord>(
    payoutUserAccountKeys.detail(id!),
    PAYOUT_USER_ACCOUNT_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreatePayoutUserAccountMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<PayoutUserAccountRecord, Error, CreatePayoutUserAccountPayload>(
    PAYOUT_USER_ACCOUNT_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Payout User Account created successfully!");
          void queryClient.invalidateQueries({ queryKey: payoutUserAccountKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdatePayoutUserAccountMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<PayoutUserAccountRecord, Error, UpdatePayoutUserAccountPayload>(
    (variables) => PAYOUT_USER_ACCOUNT_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Payout User Account updated successfully!");
          void queryClient.invalidateQueries({ queryKey: payoutUserAccountKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeletePayoutUserAccountMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => PAYOUT_USER_ACCOUNT_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Payout User Account deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: payoutUserAccountKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
