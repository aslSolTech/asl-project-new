import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { LIST_API_ENDPOINTS } from "./endpoints";
import { ListRecord, CreateListPayload, UpdateListPayload } from "./types";

export const listKeys = {
  all: ["list"] as const,
  lists: () => [...listKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...listKeys.lists(), params] as const,
  details: () => [...listKeys.all, "detail"] as const,
  detail: (id: string) => [...listKeys.details(), id] as const,
};

export function useListListQuery() {
  return useApiQuery<ListRecord[]>(
    listKeys.lists(),
    LIST_API_ENDPOINTS.LIST
  );
}

export function useListDetailQuery(id?: string) {
  return useApiQuery<ListRecord>(
    listKeys.detail(id!),
    LIST_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateListMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<ListRecord, Error, CreateListPayload>(
    LIST_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Notification List created successfully!");
          void queryClient.invalidateQueries({ queryKey: listKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateListMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<ListRecord, Error, UpdateListPayload>(
    (variables) => LIST_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Notification List updated successfully!");
          void queryClient.invalidateQueries({ queryKey: listKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteListMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => LIST_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Notification List deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: listKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
