import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { DEDUCT_API_ENDPOINTS } from "./endpoints";
import { DeductRecord, CreateDeductPayload, UpdateDeductPayload } from "./types";

export const deductKeys = {
  all: ["deduct"] as const,
  lists: () => [...deductKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...deductKeys.lists(), params] as const,
  details: () => [...deductKeys.all, "detail"] as const,
  detail: (id: string) => [...deductKeys.details(), id] as const,
};

export function useDeductListQuery() {
  return useApiQuery<DeductRecord[]>(
    deductKeys.lists(),
    DEDUCT_API_ENDPOINTS.LIST
  );
}

export function useDeductDetailQuery(id?: string) {
  return useApiQuery<DeductRecord>(
    deductKeys.detail(id!),
    DEDUCT_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateDeductMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<DeductRecord, Error, CreateDeductPayload>(
    DEDUCT_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Deduct Wallet Balance created successfully!");
          void queryClient.invalidateQueries({ queryKey: deductKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateDeductMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<DeductRecord, Error, UpdateDeductPayload>(
    (variables) => DEDUCT_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Deduct Wallet Balance updated successfully!");
          void queryClient.invalidateQueries({ queryKey: deductKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteDeductMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => DEDUCT_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Deduct Wallet Balance deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: deductKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
