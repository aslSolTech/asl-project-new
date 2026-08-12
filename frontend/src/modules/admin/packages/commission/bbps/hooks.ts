import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { BBPS_API_ENDPOINTS } from "./endpoints";
import { BbpsRecord, CreateBbpsPayload, UpdateBbpsPayload } from "./types";

export const bbpsKeys = {
  all: ["bbps"] as const,
  lists: () => [...bbpsKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...bbpsKeys.lists(), params] as const,
  details: () => [...bbpsKeys.all, "detail"] as const,
  detail: (id: string) => [...bbpsKeys.details(), id] as const,
};

export function useBbpsListQuery() {
  return useApiQuery<BbpsRecord[]>(
    bbpsKeys.lists(),
    BBPS_API_ENDPOINTS.LIST
  );
}

export function useBbpsDetailQuery(id?: string) {
  return useApiQuery<BbpsRecord>(
    bbpsKeys.detail(id!),
    BBPS_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateBbpsMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<BbpsRecord, Error, CreateBbpsPayload>(
    BBPS_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("BBPS Commission created successfully!");
          void queryClient.invalidateQueries({ queryKey: bbpsKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateBbpsMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<BbpsRecord, Error, UpdateBbpsPayload>(
    (variables) => BBPS_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("BBPS Commission updated successfully!");
          void queryClient.invalidateQueries({ queryKey: bbpsKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteBbpsMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => BBPS_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("BBPS Commission deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: bbpsKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
