import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { PERMISSION_API_ENDPOINTS } from "./endpoints";
import { EmployeePermissionRecord, CreateEmployeePermissionPayload, UpdateEmployeePermissionPayload } from "./types";

export const employeePermissionKeys = {
  all: ["employee-permission"] as const,
  lists: () => [...employeePermissionKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...employeePermissionKeys.lists(), params] as const,
  details: () => [...employeePermissionKeys.all, "detail"] as const,
  detail: (id: string) => [...employeePermissionKeys.details(), id] as const,
};

export function useEmployeePermissionListQuery() {
  return useApiQuery<EmployeePermissionRecord[]>(
    employeePermissionKeys.lists(),
    PERMISSION_API_ENDPOINTS.LIST
  );
}

export function useEmployeePermissionDetailQuery(id?: string) {
  return useApiQuery<EmployeePermissionRecord>(
    employeePermissionKeys.detail(id!),
    PERMISSION_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateEmployeePermissionMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<EmployeePermissionRecord, Error, CreateEmployeePermissionPayload>(
    PERMISSION_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Employee Permission created successfully!");
          void queryClient.invalidateQueries({ queryKey: employeePermissionKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateEmployeePermissionMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<EmployeePermissionRecord, Error, UpdateEmployeePermissionPayload>(
    (variables) => PERMISSION_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Employee Permission updated successfully!");
          void queryClient.invalidateQueries({ queryKey: employeePermissionKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteEmployeePermissionMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => PERMISSION_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Employee Permission deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: employeePermissionKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
