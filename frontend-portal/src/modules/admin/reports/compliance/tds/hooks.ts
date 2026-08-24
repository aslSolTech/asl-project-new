import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { TDS_API_ENDPOINTS } from "./endpoints";
import { TdsRecord, CreateTdsPayload, UpdateTdsPayload } from "./types";

export const tdsKeys = {
  all: ["tds"] as const,
  lists: () => [...tdsKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...tdsKeys.lists(), params] as const,
  details: () => [...tdsKeys.all, "detail"] as const,
  detail: (id: string) => [...tdsKeys.details(), id] as const,
};

export function useTdsListQuery() {
  return useApiQuery<TdsRecord[]>(
    tdsKeys.lists(),
    TDS_API_ENDPOINTS.LIST
  );
}

export function useTdsDetailQuery(id?: string) {
  return useApiQuery<TdsRecord>(
    tdsKeys.detail(id!),
    TDS_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateTdsMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<TdsRecord, Error, CreateTdsPayload>(
    TDS_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("TDS Statement created successfully!");
          void queryClient.invalidateQueries({ queryKey: tdsKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateTdsMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<TdsRecord, Error, UpdateTdsPayload>(
    (variables) => TDS_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("TDS Statement updated successfully!");
          void queryClient.invalidateQueries({ queryKey: tdsKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteTdsMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => TDS_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("TDS Statement deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: tdsKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
