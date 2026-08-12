import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { FAILED_API_ENDPOINTS } from "./endpoints";
import { FailedRecord, CreateFailedPayload, UpdateFailedPayload } from "./types";

export const failedKeys = {
  all: ["failed"] as const,
  lists: () => [...failedKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...failedKeys.lists(), params] as const,
  details: () => [...failedKeys.all, "detail"] as const,
  detail: (id: string) => [...failedKeys.details(), id] as const,
};

export function useFailedListQuery() {
  return useApiQuery<FailedRecord[]>(
    failedKeys.lists(),
    FAILED_API_ENDPOINTS.LIST
  );
}

export function useFailedDetailQuery(id?: string) {
  return useApiQuery<FailedRecord>(
    failedKeys.detail(id!),
    FAILED_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateFailedMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<FailedRecord, Error, CreateFailedPayload>(
    FAILED_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Failed Transaction Refund created successfully!");
          void queryClient.invalidateQueries({ queryKey: failedKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateFailedMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<FailedRecord, Error, UpdateFailedPayload>(
    (variables) => FAILED_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Failed Transaction Refund updated successfully!");
          void queryClient.invalidateQueries({ queryKey: failedKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteFailedMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => FAILED_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Failed Transaction Refund deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: failedKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
