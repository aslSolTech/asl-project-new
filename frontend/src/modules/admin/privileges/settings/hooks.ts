import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { SETTINGS_API_ENDPOINTS } from "./endpoints";
import { SettingsRecord, CreateSettingsPayload, UpdateSettingsPayload } from "./types";

export const settingsKeys = {
  all: ["settings"] as const,
  lists: () => [...settingsKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...settingsKeys.lists(), params] as const,
  details: () => [...settingsKeys.all, "detail"] as const,
  detail: (id: string) => [...settingsKeys.details(), id] as const,
};

export function useSettingsListQuery() {
  return useApiQuery<SettingsRecord[]>(
    settingsKeys.lists(),
    SETTINGS_API_ENDPOINTS.LIST
  );
}

export function useSettingsDetailQuery(id?: string) {
  return useApiQuery<SettingsRecord>(
    settingsKeys.detail(id!),
    SETTINGS_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateSettingsMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<SettingsRecord, Error, CreateSettingsPayload>(
    SETTINGS_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Privilege Settings created successfully!");
          void queryClient.invalidateQueries({ queryKey: settingsKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateSettingsMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<SettingsRecord, Error, UpdateSettingsPayload>(
    (variables) => SETTINGS_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Privilege Settings updated successfully!");
          void queryClient.invalidateQueries({ queryKey: settingsKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteSettingsMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => SETTINGS_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Privilege Settings deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: settingsKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
