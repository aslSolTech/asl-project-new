import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { ROLLBACK_API_ENDPOINTS } from "./endpoints";
import { RollbackRecord, CreateRollbackPayload, UpdateRollbackPayload } from "./types";

export const rollbackKeys = {
  all: ["rollback"] as const,
  lists: () => [...rollbackKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...rollbackKeys.lists(), params] as const,
  details: () => [...rollbackKeys.all, "detail"] as const,
  detail: (id: string) => [...rollbackKeys.details(), id] as const,
};

export function useRollbackListQuery() {
  return useApiQuery<RollbackRecord[]>(
    rollbackKeys.lists(),
    ROLLBACK_API_ENDPOINTS.LIST
  );
}

export function useRollbackDetailQuery(id?: string) {
  return useApiQuery<RollbackRecord>(
    rollbackKeys.detail(id!),
    ROLLBACK_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateRollbackMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<RollbackRecord, Error, CreateRollbackPayload>(
    ROLLBACK_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Rollback Transactions created successfully!");
          void queryClient.invalidateQueries({ queryKey: rollbackKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateRollbackMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<RollbackRecord, Error, UpdateRollbackPayload>(
    (variables) => ROLLBACK_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Rollback Transactions updated successfully!");
          void queryClient.invalidateQueries({ queryKey: rollbackKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteRollbackMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => ROLLBACK_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Rollback Transactions deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: rollbackKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
