import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { DMT_DASHBOARD_API_ENDPOINTS } from "./endpoints";
import { DmtDashboardRecord, CreateDmtDashboardPayload, UpdateDmtDashboardPayload } from "./types";

export const dmtDashboardKeys = {
  all: ["dmt-dashboard"] as const,
  lists: () => [...dmtDashboardKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...dmtDashboardKeys.lists(), params] as const,
  details: () => [...dmtDashboardKeys.all, "detail"] as const,
  detail: (id: string) => [...dmtDashboardKeys.details(), id] as const,
};

export function useDmtDashboardListQuery() {
  return useApiQuery<DmtDashboardRecord[]>(
    dmtDashboardKeys.lists(),
    DMT_DASHBOARD_API_ENDPOINTS.LIST
  );
}

export function useDmtDashboardDetailQuery(id?: string) {
  return useApiQuery<DmtDashboardRecord>(
    dmtDashboardKeys.detail(id!),
    DMT_DASHBOARD_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateDmtDashboardMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<DmtDashboardRecord, Error, CreateDmtDashboardPayload>(
    DMT_DASHBOARD_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("DMT Dashboard created successfully!");
          void queryClient.invalidateQueries({ queryKey: dmtDashboardKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateDmtDashboardMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<DmtDashboardRecord, Error, UpdateDmtDashboardPayload>(
    (variables) => DMT_DASHBOARD_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("DMT Dashboard updated successfully!");
          void queryClient.invalidateQueries({ queryKey: dmtDashboardKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteDmtDashboardMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => DMT_DASHBOARD_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("DMT Dashboard deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: dmtDashboardKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
