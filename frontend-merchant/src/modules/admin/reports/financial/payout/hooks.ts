import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { PAYOUT_API_ENDPOINTS } from "./endpoints";
import { PayoutRecord, CreatePayoutPayload, UpdatePayoutPayload } from "./types";

export const payoutKeys = {
  all: ["payout"] as const,
  lists: () => [...payoutKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...payoutKeys.lists(), params] as const,
  details: () => [...payoutKeys.all, "detail"] as const,
  detail: (id: string) => [...payoutKeys.details(), id] as const,
};

export function usePayoutListQuery() {
  return useApiQuery<PayoutRecord[]>(
    payoutKeys.lists(),
    PAYOUT_API_ENDPOINTS.LIST
  );
}

export function usePayoutDetailQuery(id?: string) {
  return useApiQuery<PayoutRecord>(
    payoutKeys.detail(id!),
    PAYOUT_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreatePayoutMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<PayoutRecord, Error, CreatePayoutPayload>(
    PAYOUT_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Payout Report created successfully!");
          void queryClient.invalidateQueries({ queryKey: payoutKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdatePayoutMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<PayoutRecord, Error, UpdatePayoutPayload>(
    (variables) => PAYOUT_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Payout Report updated successfully!");
          void queryClient.invalidateQueries({ queryKey: payoutKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeletePayoutMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => PAYOUT_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Payout Report deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: payoutKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
