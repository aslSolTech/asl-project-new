import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { EMPLOYEE_LEDGER_API_ENDPOINTS } from "./endpoints";
import { EmployeeLedgerRecord, CreateEmployeeLedgerPayload, UpdateEmployeeLedgerPayload } from "./types";

export const employeeLedgerKeys = {
  all: ["employee-ledger"] as const,
  lists: () => [...employeeLedgerKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...employeeLedgerKeys.lists(), params] as const,
  details: () => [...employeeLedgerKeys.all, "detail"] as const,
  detail: (id: string) => [...employeeLedgerKeys.details(), id] as const,
};

export function useEmployeeLedgerListQuery() {
  return useApiQuery<EmployeeLedgerRecord[]>(
    employeeLedgerKeys.lists(),
    EMPLOYEE_LEDGER_API_ENDPOINTS.LIST
  );
}

export function useEmployeeLedgerDetailQuery(id?: string) {
  return useApiQuery<EmployeeLedgerRecord>(
    employeeLedgerKeys.detail(id!),
    EMPLOYEE_LEDGER_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateEmployeeLedgerMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<EmployeeLedgerRecord, Error, CreateEmployeeLedgerPayload>(
    EMPLOYEE_LEDGER_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Employee Ledger created successfully!");
          void queryClient.invalidateQueries({ queryKey: employeeLedgerKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateEmployeeLedgerMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<EmployeeLedgerRecord, Error, UpdateEmployeeLedgerPayload>(
    (variables) => EMPLOYEE_LEDGER_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Employee Ledger updated successfully!");
          void queryClient.invalidateQueries({ queryKey: employeeLedgerKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteEmployeeLedgerMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => EMPLOYEE_LEDGER_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Employee Ledger deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: employeeLedgerKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
