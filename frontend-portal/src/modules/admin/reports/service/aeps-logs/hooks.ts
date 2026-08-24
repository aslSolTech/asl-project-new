import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { AEPS_LOGS_API_ENDPOINTS } from "./endpoints";
import { AepsLogsRecord, CreateAepsLogsPayload, UpdateAepsLogsPayload } from "./types";

export const aepsLogsKeys = {
  all: ["aeps-logs"] as const,
  lists: () => [...aepsLogsKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...aepsLogsKeys.lists(), params] as const,
  details: () => [...aepsLogsKeys.all, "detail"] as const,
  detail: (id: string) => [...aepsLogsKeys.details(), id] as const,
};

export function useAepsLogsListQuery() {
  return useApiQuery<AepsLogsRecord[]>(
    aepsLogsKeys.lists(),
    AEPS_LOGS_API_ENDPOINTS.LIST
  );
}

export function useAepsLogsDetailQuery(id?: string) {
  return useApiQuery<AepsLogsRecord>(
    aepsLogsKeys.detail(id!),
    AEPS_LOGS_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateAepsLogsMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<AepsLogsRecord, Error, CreateAepsLogsPayload>(
    AEPS_LOGS_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("AEPS Logs created successfully!");
          void queryClient.invalidateQueries({ queryKey: aepsLogsKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateAepsLogsMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<AepsLogsRecord, Error, UpdateAepsLogsPayload>(
    (variables) => AEPS_LOGS_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("AEPS Logs updated successfully!");
          void queryClient.invalidateQueries({ queryKey: aepsLogsKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteAepsLogsMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => AEPS_LOGS_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("AEPS Logs deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: aepsLogsKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
