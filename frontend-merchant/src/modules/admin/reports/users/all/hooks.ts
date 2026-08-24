import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { ALL_API_ENDPOINTS } from "./endpoints";
import { AllRecord, CreateAllPayload, UpdateAllPayload } from "./types";

export const allKeys = {
  all: ["all"] as const,
  lists: () => [...allKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...allKeys.lists(), params] as const,
  details: () => [...allKeys.all, "detail"] as const,
  detail: (id: string) => [...allKeys.details(), id] as const,
};

export function useAllListQuery() {
  return useApiQuery<AllRecord[]>(
    allKeys.lists(),
    ALL_API_ENDPOINTS.LIST
  );
}

export function useAllDetailQuery(id?: string) {
  return useApiQuery<AllRecord>(
    allKeys.detail(id!),
    ALL_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateAllMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<AllRecord, Error, CreateAllPayload>(
    ALL_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("All Users Report created successfully!");
          void queryClient.invalidateQueries({ queryKey: allKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateAllMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<AllRecord, Error, UpdateAllPayload>(
    (variables) => ALL_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("All Users Report updated successfully!");
          void queryClient.invalidateQueries({ queryKey: allKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteAllMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => ALL_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("All Users Report deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: allKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
