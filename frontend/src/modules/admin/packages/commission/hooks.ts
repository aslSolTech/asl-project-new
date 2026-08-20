import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { COMMISSION_API_ENDPOINTS } from "./endpoints";
import { CommissionRecord, CreateCommissionPayload, UpdateCommissionPayload } from "./types";

export const commissionKeys = {
  all: ["commission"] as const,
  lists: () => [...commissionKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...commissionKeys.lists(), params] as const,
  details: () => [...commissionKeys.all, "detail"] as const,
  detail: (id: string) => [...commissionKeys.details(), id] as const,
};

export function useCommissionListQuery() {
  return useApiQuery<CommissionRecord[]>(
    commissionKeys.lists(),
    COMMISSION_API_ENDPOINTS.LIST
  );
}

export function useCommissionDetailQuery(id?: string) {
  return useApiQuery<CommissionRecord>(
    commissionKeys.detail(id!),
    COMMISSION_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateCommissionMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<CommissionRecord, Error, CreateCommissionPayload>(
    COMMISSION_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Commission created successfully!");
          void queryClient.invalidateQueries({ queryKey: commissionKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create commission");
        },
      },
    }
  );
}

export function useUpdateCommissionMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<CommissionRecord, Error, UpdateCommissionPayload>(
    (variables) => COMMISSION_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Commission updated successfully!");
          void queryClient.invalidateQueries({ queryKey: commissionKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update commission");
        },
      },
    }
  );
}

export function useDeleteCommissionMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => COMMISSION_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Commission deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: commissionKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete commission");
        },
      },
    }
  );
}
