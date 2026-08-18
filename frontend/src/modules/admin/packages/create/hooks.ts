import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { CREATE_API_ENDPOINTS } from "./endpoints";
import { CreateRecord, CreateCreatePayload, UpdateCreatePayload } from "./types";

export const createKeys = {
  all: ["create"] as const,
  lists: () => [...createKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...createKeys.lists(), params] as const,
  details: () => [...createKeys.all, "detail"] as const,
  detail: (id: string) => [...createKeys.details(), id] as const,
};

export function useCreateListQuery() {
  return useApiQuery<CreateRecord[]>(
    createKeys.lists(),
    CREATE_API_ENDPOINTS.LIST
  );
}

export function useCreateDetailQuery(id?: string) {
  return useApiQuery<CreateRecord>(
    createKeys.detail(id!),
    CREATE_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateCreateMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<CreateRecord, Error, CreateCreatePayload>(
    CREATE_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Package created successfully!");
          void queryClient.invalidateQueries({ queryKey: createKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create package");
        },
      },
    }
  );
}

export function useUpdateCreateMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<CreateRecord, Error, UpdateCreatePayload>(
    (variables) => CREATE_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Package updated successfully!");
          void queryClient.invalidateQueries({ queryKey: createKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update package");
        },
      },
    }
  );
}

export function useDeleteCreateMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => CREATE_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Package deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: createKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete package");
        },
      },
    }
  );
}
