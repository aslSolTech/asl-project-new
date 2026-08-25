import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { DISTRIBUTOR_REQUESTS_API_ENDPOINTS } from "./endpoints";
import { DistributorRequestsRecord, CreateDistributorRequestsPayload, UpdateDistributorRequestsPayload } from "./types";

export const distributorRequestsKeys = {
  all: ["distributor-requests"] as const,
  lists: () => [...distributorRequestsKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...distributorRequestsKeys.lists(), params] as const,
  details: () => [...distributorRequestsKeys.all, "detail"] as const,
  detail: (id: string) => [...distributorRequestsKeys.details(), id] as const,
};

export function useDistributorRequestsListQuery() {
  return useApiQuery<DistributorRequestsRecord[]>(
    distributorRequestsKeys.lists(),
    DISTRIBUTOR_REQUESTS_API_ENDPOINTS.LIST
  );
}

export function useDistributorRequestsDetailQuery(id?: string) {
  return useApiQuery<DistributorRequestsRecord>(
    distributorRequestsKeys.detail(id!),
    DISTRIBUTOR_REQUESTS_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateDistributorRequestsMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<DistributorRequestsRecord, Error, CreateDistributorRequestsPayload>(
    DISTRIBUTOR_REQUESTS_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Distributor Requests created successfully!");
          void queryClient.invalidateQueries({ queryKey: distributorRequestsKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateDistributorRequestsMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<DistributorRequestsRecord, Error, UpdateDistributorRequestsPayload>(
    (variables) => DISTRIBUTOR_REQUESTS_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Distributor Requests updated successfully!");
          void queryClient.invalidateQueries({ queryKey: distributorRequestsKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteDistributorRequestsMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => DISTRIBUTOR_REQUESTS_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Distributor Requests deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: distributorRequestsKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
