import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { RECHARGE_API_ENDPOINTS } from "./endpoints";
import { RechargeRecord, CreateRechargePayload, UpdateRechargePayload } from "./types";

export const rechargeKeys = {
  all: ["recharge"] as const,
  lists: () => [...rechargeKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...rechargeKeys.lists(), params] as const,
  details: () => [...rechargeKeys.all, "detail"] as const,
  detail: (id: string) => [...rechargeKeys.details(), id] as const,
};

export function useRechargeListQuery() {
  return useApiQuery<RechargeRecord[]>(
    rechargeKeys.lists(),
    RECHARGE_API_ENDPOINTS.LIST
  );
}

export function useRechargeDetailQuery(id?: string) {
  return useApiQuery<RechargeRecord>(
    rechargeKeys.detail(id!),
    RECHARGE_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateRechargeMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<RechargeRecord, Error, CreateRechargePayload>(
    RECHARGE_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Recharge Report created successfully!");
          void queryClient.invalidateQueries({ queryKey: rechargeKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateRechargeMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<RechargeRecord, Error, UpdateRechargePayload>(
    (variables) => RECHARGE_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Recharge Report updated successfully!");
          void queryClient.invalidateQueries({ queryKey: rechargeKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteRechargeMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => RECHARGE_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Recharge Report deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: rechargeKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
