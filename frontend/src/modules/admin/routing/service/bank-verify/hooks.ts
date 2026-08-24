import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { BANK_VERIFY_API_ENDPOINTS } from "./endpoints";
import { BankVerifyRecord, CreateBankVerifyPayload, UpdateBankVerifyPayload } from "./types";

export const bankVerifyKeys = {
  all: ["bank-verify"] as const,
  lists: () => [...bankVerifyKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...bankVerifyKeys.lists(), params] as const,
  details: () => [...bankVerifyKeys.all, "detail"] as const,
  detail: (id: string) => [...bankVerifyKeys.details(), id] as const,
};

export function useBankVerifyListQuery() {
  return useApiQuery<BankVerifyRecord[]>(
    bankVerifyKeys.lists(),
    BANK_VERIFY_API_ENDPOINTS.LIST
  );
}

export function useBankVerifyDetailQuery(id?: string) {
  return useApiQuery<BankVerifyRecord>(
    bankVerifyKeys.detail(id!),
    BANK_VERIFY_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateBankVerifyMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<BankVerifyRecord, Error, CreateBankVerifyPayload>(
    BANK_VERIFY_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Bank Account Verify API created successfully!");
          void queryClient.invalidateQueries({ queryKey: bankVerifyKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateBankVerifyMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<BankVerifyRecord, Error, UpdateBankVerifyPayload>(
    (variables) => BANK_VERIFY_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Bank Account Verify API updated successfully!");
          void queryClient.invalidateQueries({ queryKey: bankVerifyKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteBankVerifyMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => BANK_VERIFY_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Bank Account Verify API deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: bankVerifyKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
