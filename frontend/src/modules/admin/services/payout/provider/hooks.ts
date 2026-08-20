import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { PROVIDER_API_ENDPOINTS } from "./endpoints";
import { ProviderRecord, CreateProviderPayload, UpdateProviderPayload } from "./types";

export const providerKeys = {
  all: ["provider"] as const,
  lists: () => [...providerKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...providerKeys.lists(), params] as const,
  details: () => [...providerKeys.all, "detail"] as const,
  detail: (id: string) => [...providerKeys.details(), id] as const,
};

export function useProviderListQuery() {
  return useApiQuery<ProviderRecord[]>(
    providerKeys.lists(),
    PROVIDER_API_ENDPOINTS.LIST
  );
}

export function useProviderDetailQuery(id?: string) {
  return useApiQuery<ProviderRecord>(
    providerKeys.detail(id!),
    PROVIDER_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateProviderMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<ProviderRecord, Error, CreateProviderPayload>(
    PROVIDER_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Provider Wise Routing created successfully!");
          void queryClient.invalidateQueries({ queryKey: providerKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateProviderMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<ProviderRecord, Error, UpdateProviderPayload>(
    (variables) => PROVIDER_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Provider Wise Routing updated successfully!");
          void queryClient.invalidateQueries({ queryKey: providerKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteProviderMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => PROVIDER_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Provider Wise Routing deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: providerKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
