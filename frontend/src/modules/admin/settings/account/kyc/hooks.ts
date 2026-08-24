import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { KYC_API_ENDPOINTS } from "./endpoints";
import { KycRecord, CreateKycPayload, UpdateKycPayload } from "./types";

export const kycKeys = {
  all: ["kyc"] as const,
  lists: () => [...kycKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...kycKeys.lists(), params] as const,
  details: () => [...kycKeys.all, "detail"] as const,
  detail: (id: string) => [...kycKeys.details(), id] as const,
};

export function useKycListQuery() {
  return useApiQuery<KycRecord[]>(
    kycKeys.lists(),
    KYC_API_ENDPOINTS.LIST
  );
}

export function useKycDetailQuery(id?: string) {
  return useApiQuery<KycRecord>(
    kycKeys.detail(id!),
    KYC_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateKycMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<KycRecord, Error, CreateKycPayload>(
    KYC_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("KYC Verification created successfully!");
          void queryClient.invalidateQueries({ queryKey: kycKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateKycMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<KycRecord, Error, UpdateKycPayload>(
    (variables) => KYC_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("KYC Verification updated successfully!");
          void queryClient.invalidateQueries({ queryKey: kycKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteKycMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => KYC_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("KYC Verification deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: kycKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
