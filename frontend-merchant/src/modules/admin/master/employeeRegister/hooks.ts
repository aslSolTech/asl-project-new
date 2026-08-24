import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { EMPLOYEE_API_ENDPOINTS } from "./endpoints";
import { EmployeeRegisterRecord, CreateEmployeeRegisterPayload, UpdateEmployeeRegisterPayload } from "./types";

export const employeeRegisterKeys = {
  all: ["employee-register"] as const,
  lists: () => [...employeeRegisterKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...employeeRegisterKeys.lists(), params] as const,
  details: () => [...employeeRegisterKeys.all, "detail"] as const,
  detail: (id: string) => [...employeeRegisterKeys.details(), id] as const,
};

export function useEmployeeRegisterListQuery() {
  return useApiQuery<EmployeeRegisterRecord[]>(
    employeeRegisterKeys.lists(),
    EMPLOYEE_API_ENDPOINTS.LIST
  );
}

export function useEmployeeRegisterDetailQuery(id?: string) {
  return useApiQuery<EmployeeRegisterRecord>(
    employeeRegisterKeys.detail(id!),
    EMPLOYEE_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateEmployeeRegisterMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<EmployeeRegisterRecord, Error, CreateEmployeeRegisterPayload>(
    EMPLOYEE_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Employee Register created successfully!");
          void queryClient.invalidateQueries({ queryKey: employeeRegisterKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateEmployeeRegisterMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<EmployeeRegisterRecord, Error, UpdateEmployeeRegisterPayload>(
    (variables) => EMPLOYEE_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Employee Register updated successfully!");
          void queryClient.invalidateQueries({ queryKey: employeeRegisterKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteEmployeeRegisterMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => EMPLOYEE_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Employee Register deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: employeeRegisterKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
