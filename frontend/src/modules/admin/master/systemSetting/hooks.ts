import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { SYSTEM_SETTING_API_ENDPOINTS } from "./endpoints";
import { SystemSettingRecord, CreateSystemSettingPayload, UpdateSystemSettingPayload } from "./types";

export const systemSettingKeys = {
  all: ["system-setting"] as const,
  lists: () => [...systemSettingKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...systemSettingKeys.lists(), params] as const,
  details: () => [...systemSettingKeys.all, "detail"] as const,
  detail: (id: string) => [...systemSettingKeys.details(), id] as const,
};

export function useSystemSettingListQuery() {
  return useApiQuery<SystemSettingRecord[]>(
    systemSettingKeys.lists(),
    SYSTEM_SETTING_API_ENDPOINTS.LIST
  );
}

export function useSystemSettingDetailQuery(id?: string) {
  return useApiQuery<SystemSettingRecord>(
    systemSettingKeys.detail(id!),
    SYSTEM_SETTING_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateSystemSettingMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<SystemSettingRecord, Error, CreateSystemSettingPayload>(
    SYSTEM_SETTING_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("System Setting created successfully!");
          void queryClient.invalidateQueries({ queryKey: systemSettingKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateSystemSettingMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<SystemSettingRecord, Error, UpdateSystemSettingPayload>(
    (variables) => SYSTEM_SETTING_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("System Setting updated successfully!");
          void queryClient.invalidateQueries({ queryKey: systemSettingKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteSystemSettingMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => SYSTEM_SETTING_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("System Setting deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: systemSettingKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
