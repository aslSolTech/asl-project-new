import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { AMOUNT_API_ENDPOINTS } from "./endpoints";
import { AmountRecord, CreateAmountPayload, UpdateAmountPayload } from "./types";

export const amountKeys = {
  all: ["amount"] as const,
  lists: () => [...amountKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...amountKeys.lists(), params] as const,
  details: () => [...amountKeys.all, "detail"] as const,
  detail: (id: string) => [...amountKeys.details(), id] as const,
};

export function useAmountListQuery() {
  return useApiQuery<AmountRecord[]>(
    amountKeys.lists(),
    AMOUNT_API_ENDPOINTS.LIST
  );
}

export function useAmountDetailQuery(id?: string) {
  return useApiQuery<AmountRecord>(
    amountKeys.detail(id!),
    AMOUNT_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateAmountMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<AmountRecord, Error, CreateAmountPayload>(
    AMOUNT_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Amount Wise Routing created successfully!");
          void queryClient.invalidateQueries({ queryKey: amountKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateAmountMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<AmountRecord, Error, UpdateAmountPayload>(
    (variables) => AMOUNT_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Amount Wise Routing updated successfully!");
          void queryClient.invalidateQueries({ queryKey: amountKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteAmountMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => AMOUNT_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Amount Wise Routing deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: amountKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
