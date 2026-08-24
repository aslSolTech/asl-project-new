import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { INACTIVE_API_ENDPOINTS } from "./endpoints";
import { InactiveRecord, CreateInactivePayload, UpdateInactivePayload } from "./types";

export const inactiveKeys = {
  all: ["inactive"] as const,
  lists: () => [...inactiveKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...inactiveKeys.lists(), params] as const,
  details: () => [...inactiveKeys.all, "detail"] as const,
  detail: (id: string) => [...inactiveKeys.details(), id] as const,
};

export function useInactiveListQuery() {
  return useApiQuery<InactiveRecord[]>(
    inactiveKeys.lists(),
    INACTIVE_API_ENDPOINTS.LIST
  );
}

export function useInactiveDetailQuery(id?: string) {
  return useApiQuery<InactiveRecord>(
    inactiveKeys.detail(id!),
    INACTIVE_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateInactiveMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<InactiveRecord, Error, CreateInactivePayload>(
    INACTIVE_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Inactive Users created successfully!");
          void queryClient.invalidateQueries({ queryKey: inactiveKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateInactiveMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<InactiveRecord, Error, UpdateInactivePayload>(
    (variables) => INACTIVE_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Inactive Users updated successfully!");
          void queryClient.invalidateQueries({ queryKey: inactiveKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteInactiveMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => INACTIVE_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Inactive Users deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: inactiveKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
