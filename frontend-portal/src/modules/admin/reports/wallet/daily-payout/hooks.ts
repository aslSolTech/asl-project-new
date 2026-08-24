import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { DAILY_PAYOUT_API_ENDPOINTS } from "./endpoints";
import { DailyPayoutRecord, CreateDailyPayoutPayload, UpdateDailyPayoutPayload } from "./types";

export const dailyPayoutKeys = {
  all: ["daily-payout"] as const,
  lists: () => [...dailyPayoutKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...dailyPayoutKeys.lists(), params] as const,
  details: () => [...dailyPayoutKeys.all, "detail"] as const,
  detail: (id: string) => [...dailyPayoutKeys.details(), id] as const,
};

export function useDailyPayoutListQuery() {
  return useApiQuery<DailyPayoutRecord[]>(
    dailyPayoutKeys.lists(),
    DAILY_PAYOUT_API_ENDPOINTS.LIST
  );
}

export function useDailyPayoutDetailQuery(id?: string) {
  return useApiQuery<DailyPayoutRecord>(
    dailyPayoutKeys.detail(id!),
    DAILY_PAYOUT_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateDailyPayoutMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<DailyPayoutRecord, Error, CreateDailyPayoutPayload>(
    DAILY_PAYOUT_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Daily Payout created successfully!");
          void queryClient.invalidateQueries({ queryKey: dailyPayoutKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateDailyPayoutMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<DailyPayoutRecord, Error, UpdateDailyPayoutPayload>(
    (variables) => DAILY_PAYOUT_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Daily Payout updated successfully!");
          void queryClient.invalidateQueries({ queryKey: dailyPayoutKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteDailyPayoutMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => DAILY_PAYOUT_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Daily Payout deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: dailyPayoutKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
