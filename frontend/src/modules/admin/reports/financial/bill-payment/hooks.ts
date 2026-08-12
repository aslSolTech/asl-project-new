import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { BILL_PAYMENT_API_ENDPOINTS } from "./endpoints";
import { BillPaymentRecord, CreateBillPaymentPayload, UpdateBillPaymentPayload } from "./types";

export const billPaymentKeys = {
  all: ["bill-payment"] as const,
  lists: () => [...billPaymentKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...billPaymentKeys.lists(), params] as const,
  details: () => [...billPaymentKeys.all, "detail"] as const,
  detail: (id: string) => [...billPaymentKeys.details(), id] as const,
};

export function useBillPaymentListQuery() {
  return useApiQuery<BillPaymentRecord[]>(
    billPaymentKeys.lists(),
    BILL_PAYMENT_API_ENDPOINTS.LIST
  );
}

export function useBillPaymentDetailQuery(id?: string) {
  return useApiQuery<BillPaymentRecord>(
    billPaymentKeys.detail(id!),
    BILL_PAYMENT_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateBillPaymentMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<BillPaymentRecord, Error, CreateBillPaymentPayload>(
    BILL_PAYMENT_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Bill Payment Report created successfully!");
          void queryClient.invalidateQueries({ queryKey: billPaymentKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateBillPaymentMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<BillPaymentRecord, Error, UpdateBillPaymentPayload>(
    (variables) => BILL_PAYMENT_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Bill Payment Report updated successfully!");
          void queryClient.invalidateQueries({ queryKey: billPaymentKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteBillPaymentMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => BILL_PAYMENT_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Bill Payment Report deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: billPaymentKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
