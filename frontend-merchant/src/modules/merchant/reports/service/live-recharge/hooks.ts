import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { LIVE_RECHARGE_API_ENDPOINTS } from "./endpoints";
import { LiveRechargeRecord, CreateLiveRechargePayload, UpdateLiveRechargePayload } from "./types";

export const liveRechargeKeys = {
  all: ["live-recharge"] as const,
  lists: () => [...liveRechargeKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...liveRechargeKeys.lists(), params] as const,
  details: () => [...liveRechargeKeys.all, "detail"] as const,
  detail: (id: string) => [...liveRechargeKeys.details(), id] as const,
};

export function useLiveRechargeListQuery() {
  return useApiQuery<LiveRechargeRecord[]>(
    liveRechargeKeys.lists(),
    LIVE_RECHARGE_API_ENDPOINTS.LIST
  );
}

export function useLiveRechargeDetailQuery(id?: string) {
  return useApiQuery<LiveRechargeRecord>(
    liveRechargeKeys.detail(id!),
    LIVE_RECHARGE_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateLiveRechargeMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<LiveRechargeRecord, Error, CreateLiveRechargePayload>(
    LIVE_RECHARGE_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Live Recharge created successfully!");
          void queryClient.invalidateQueries({ queryKey: liveRechargeKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateLiveRechargeMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<LiveRechargeRecord, Error, UpdateLiveRechargePayload>(
    (variables) => LIVE_RECHARGE_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Live Recharge updated successfully!");
          void queryClient.invalidateQueries({ queryKey: liveRechargeKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteLiveRechargeMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => LIVE_RECHARGE_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Live Recharge deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: liveRechargeKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
