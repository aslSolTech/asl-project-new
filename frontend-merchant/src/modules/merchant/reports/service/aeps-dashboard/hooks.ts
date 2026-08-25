import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { AEPS_DASHBOARD_API_ENDPOINTS } from "./endpoints";
import { AepsDashboardRecord, CreateAepsDashboardPayload, UpdateAepsDashboardPayload } from "./types";

export const aepsDashboardKeys = {
  all: ["aeps-dashboard"] as const,
  lists: () => [...aepsDashboardKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...aepsDashboardKeys.lists(), params] as const,
  details: () => [...aepsDashboardKeys.all, "detail"] as const,
  detail: (id: string) => [...aepsDashboardKeys.details(), id] as const,
};

export function useAepsDashboardListQuery() {
  return useApiQuery<AepsDashboardRecord[]>(
    aepsDashboardKeys.lists(),
    AEPS_DASHBOARD_API_ENDPOINTS.LIST
  );
}

export function useAepsDashboardDetailQuery(id?: string) {
  return useApiQuery<AepsDashboardRecord>(
    aepsDashboardKeys.detail(id!),
    AEPS_DASHBOARD_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateAepsDashboardMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<AepsDashboardRecord, Error, CreateAepsDashboardPayload>(
    AEPS_DASHBOARD_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("AEPS Dashboard created successfully!");
          void queryClient.invalidateQueries({ queryKey: aepsDashboardKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateAepsDashboardMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<AepsDashboardRecord, Error, UpdateAepsDashboardPayload>(
    (variables) => AEPS_DASHBOARD_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("AEPS Dashboard updated successfully!");
          void queryClient.invalidateQueries({ queryKey: aepsDashboardKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteAepsDashboardMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => AEPS_DASHBOARD_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("AEPS Dashboard deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: aepsDashboardKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
