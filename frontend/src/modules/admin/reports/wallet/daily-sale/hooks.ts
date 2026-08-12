import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { DAILY_SALE_API_ENDPOINTS } from "./endpoints";
import { DailySaleRecord, CreateDailySalePayload, UpdateDailySalePayload } from "./types";

export const dailySaleKeys = {
  all: ["daily-sale"] as const,
  lists: () => [...dailySaleKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...dailySaleKeys.lists(), params] as const,
  details: () => [...dailySaleKeys.all, "detail"] as const,
  detail: (id: string) => [...dailySaleKeys.details(), id] as const,
};

export function useDailySaleListQuery() {
  return useApiQuery<DailySaleRecord[]>(
    dailySaleKeys.lists(),
    DAILY_SALE_API_ENDPOINTS.LIST
  );
}

export function useDailySaleDetailQuery(id?: string) {
  return useApiQuery<DailySaleRecord>(
    dailySaleKeys.detail(id!),
    DAILY_SALE_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateDailySaleMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<DailySaleRecord, Error, CreateDailySalePayload>(
    DAILY_SALE_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Daily Sale created successfully!");
          void queryClient.invalidateQueries({ queryKey: dailySaleKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateDailySaleMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<DailySaleRecord, Error, UpdateDailySalePayload>(
    (variables) => DAILY_SALE_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Daily Sale updated successfully!");
          void queryClient.invalidateQueries({ queryKey: dailySaleKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteDailySaleMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => DAILY_SALE_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Daily Sale deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: dailySaleKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
