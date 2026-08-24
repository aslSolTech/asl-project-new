import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { LOAN_API_ENDPOINTS } from "./endpoints";
import { LoanRecord, CreateLoanPayload, UpdateLoanPayload } from "./types";

export const loanKeys = {
  all: ["loan"] as const,
  lists: () => [...loanKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...loanKeys.lists(), params] as const,
  details: () => [...loanKeys.all, "detail"] as const,
  detail: (id: string) => [...loanKeys.details(), id] as const,
};

export function useLoanListQuery() {
  return useApiQuery<LoanRecord[]>(
    loanKeys.lists(),
    LOAN_API_ENDPOINTS.LIST
  );
}

export function useLoanDetailQuery(id?: string) {
  return useApiQuery<LoanRecord>(
    loanKeys.detail(id!),
    LOAN_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateLoanMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<LoanRecord, Error, CreateLoanPayload>(
    LOAN_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Loan Report created successfully!");
          void queryClient.invalidateQueries({ queryKey: loanKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateLoanMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<LoanRecord, Error, UpdateLoanPayload>(
    (variables) => LOAN_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Loan Report updated successfully!");
          void queryClient.invalidateQueries({ queryKey: loanKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteLoanMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => LOAN_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Loan Report deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: loanKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
