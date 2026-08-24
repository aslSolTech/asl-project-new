import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { MERCHANT_API_ENDPOINTS } from "./endpoints";
import { MerchantApiRecord, CreateMerchantApiPayload, UpdateMerchantApiPayload } from "./types";

export const merchantApiKeys = {
  all: ["merchant-api"] as const,
  lists: () => [...merchantApiKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...merchantApiKeys.lists(), params] as const,
  details: () => [...merchantApiKeys.all, "detail"] as const,
  detail: (id: string) => [...merchantApiKeys.details(), id] as const,
};

export function useMerchantApiListQuery() {
  return useApiQuery<MerchantApiRecord[]>(
    merchantApiKeys.lists(),
    MERCHANT_API_ENDPOINTS.LIST
  );
}

export function useMerchantApiDetailQuery(id?: string) {
  return useApiQuery<MerchantApiRecord>(
    merchantApiKeys.detail(id!),
    MERCHANT_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateMerchantApiMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<MerchantApiRecord, Error, CreateMerchantApiPayload>(
    MERCHANT_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Merchant Retailer registered successfully!");
          void queryClient.invalidateQueries({ queryKey: merchantApiKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to register retailer");
        },
      },
    }
  );
}

export function useUpdateMerchantApiMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<MerchantApiRecord, Error, UpdateMerchantApiPayload>(
    (variables) => MERCHANT_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Merchant Retailer updated successfully!");
          void queryClient.invalidateQueries({ queryKey: merchantApiKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteMerchantApiMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => MERCHANT_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Merchant Retailer deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: merchantApiKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
