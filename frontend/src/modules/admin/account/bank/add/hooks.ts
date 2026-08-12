import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { ADD_API_ENDPOINTS } from "./endpoints";
import { AddRecord, CreateAddPayload, UpdateAddPayload } from "./types";

export const addKeys = {
  all: ["add"] as const,
  lists: () => [...addKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...addKeys.lists(), params] as const,
  details: () => [...addKeys.all, "detail"] as const,
  detail: (id: string) => [...addKeys.details(), id] as const,
};

export function useAddListQuery() {
  return useApiQuery<AddRecord[]>(
    addKeys.lists(),
    ADD_API_ENDPOINTS.LIST
  );
}

export function useAddDetailQuery(id?: string) {
  return useApiQuery<AddRecord>(
    addKeys.detail(id!),
    ADD_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateAddMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<AddRecord, Error, CreateAddPayload>(
    ADD_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Add Bank created successfully!");
          void queryClient.invalidateQueries({ queryKey: addKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateAddMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<AddRecord, Error, UpdateAddPayload>(
    (variables) => ADD_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Add Bank updated successfully!");
          void queryClient.invalidateQueries({ queryKey: addKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteAddMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => ADD_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Add Bank deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: addKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
