import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { ADMIN_API_ENDPOINTS } from "./endpoints";
import { AdminRegisterRecord, CreateAdminRegisterPayload, UpdateAdminRegisterPayload } from "./types";

export const adminRegisterKeys = {
  all: ["admin-register"] as const,
  lists: () => [...adminRegisterKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...adminRegisterKeys.lists(), params] as const,
  details: () => [...adminRegisterKeys.all, "detail"] as const,
  detail: (id: string) => [...adminRegisterKeys.details(), id] as const,
};

export function useAdminRegisterListQuery() {
  return useApiQuery<AdminRegisterRecord[]>(
    adminRegisterKeys.lists(),
    ADMIN_API_ENDPOINTS.LIST
  );
}

export function useAdminRegisterDetailQuery(id?: string) {
  return useApiQuery<AdminRegisterRecord>(
    adminRegisterKeys.detail(id!),
    ADMIN_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateAdminRegisterMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<AdminRegisterRecord, Error, CreateAdminRegisterPayload>(
    ADMIN_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Admin Register created successfully!");
          void queryClient.invalidateQueries({ queryKey: adminRegisterKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateAdminRegisterMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<AdminRegisterRecord, Error, UpdateAdminRegisterPayload>(
    (variables) => ADMIN_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Admin Register updated successfully!");
          void queryClient.invalidateQueries({ queryKey: adminRegisterKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteAdminRegisterMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => ADMIN_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Admin Register deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: adminRegisterKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
