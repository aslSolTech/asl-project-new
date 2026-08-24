import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { CRON_SETTING_API_ENDPOINTS } from "./endpoints";
import { CronSettingRecord, CreateCronSettingPayload, UpdateCronSettingPayload } from "./types";

export const cronSettingKeys = {
  all: ["cron-setting"] as const,
  lists: () => [...cronSettingKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...cronSettingKeys.lists(), params] as const,
  details: () => [...cronSettingKeys.all, "detail"] as const,
  detail: (id: string) => [...cronSettingKeys.details(), id] as const,
};

export function useCronSettingListQuery() {
  return useApiQuery<CronSettingRecord[]>(
    cronSettingKeys.lists(),
    CRON_SETTING_API_ENDPOINTS.LIST
  );
}

export function useCronSettingDetailQuery(id?: string) {
  return useApiQuery<CronSettingRecord>(
    cronSettingKeys.detail(id!),
    CRON_SETTING_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateCronSettingMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<CronSettingRecord, Error, CreateCronSettingPayload>(
    CRON_SETTING_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Cron Setting created successfully!");
          void queryClient.invalidateQueries({ queryKey: cronSettingKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateCronSettingMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<CronSettingRecord, Error, UpdateCronSettingPayload>(
    (variables) => CRON_SETTING_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Cron Setting updated successfully!");
          void queryClient.invalidateQueries({ queryKey: cronSettingKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteCronSettingMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => CRON_SETTING_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Cron Setting deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: cronSettingKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
