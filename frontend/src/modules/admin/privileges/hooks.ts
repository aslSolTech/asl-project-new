import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { PRIVILEGES_API_ENDPOINTS } from "./endpoints";
import { PrivilegeRecord, CreatePrivilegePayload, UpdatePrivilegePayload } from "./types";

export const privilegesKeys = {
  all: ["privileges"] as const,
  lists: () => [...privilegesKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...privilegesKeys.lists(), params] as const,
  details: () => [...privilegesKeys.all, "detail"] as const,
  detail: (id: string) => [...privilegesKeys.details(), id] as const,
};

export function usePrivilegeListQuery() {
  return useApiQuery<PrivilegeRecord[]>(
    privilegesKeys.lists(),
    PRIVILEGES_API_ENDPOINTS.LIST
  );
}

export function usePrivilegeDetailQuery(id?: string) {
  return useApiQuery<PrivilegeRecord>(
    privilegesKeys.detail(id!),
    PRIVILEGES_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreatePrivilegeMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<PrivilegeRecord, Error, CreatePrivilegePayload>(
    PRIVILEGES_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Privilege Settings created successfully!");
          void queryClient.invalidateQueries({ queryKey: privilegesKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdatePrivilegeMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<PrivilegeRecord, Error, UpdatePrivilegePayload>(
    (variables) => PRIVILEGES_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Privilege Settings updated successfully!");
          void queryClient.invalidateQueries({ queryKey: privilegesKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeletePrivilegeMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => PRIVILEGES_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Privilege Settings deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: privilegesKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
