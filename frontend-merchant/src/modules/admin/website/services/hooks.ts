import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { SERVICES_API_ENDPOINTS } from "./endpoints";
import { ServicesRecord, CreateServicesPayload, UpdateServicesPayload } from "./types";

export const servicesKeys = {
  all: ["services"] as const,
  lists: () => [...servicesKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...servicesKeys.lists(), params] as const,
  details: () => [...servicesKeys.all, "detail"] as const,
  detail: (id: string) => [...servicesKeys.details(), id] as const,
};

export function useServicesListQuery() {
  return useApiQuery<ServicesRecord[]>(
    servicesKeys.lists(),
    SERVICES_API_ENDPOINTS.LIST
  );
}

export function useServicesDetailQuery(id?: string) {
  return useApiQuery<ServicesRecord>(
    servicesKeys.detail(id!),
    SERVICES_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateServicesMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<ServicesRecord, Error, CreateServicesPayload>(
    SERVICES_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Services Page created successfully!");
          void queryClient.invalidateQueries({ queryKey: servicesKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateServicesMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<ServicesRecord, Error, UpdateServicesPayload>(
    (variables) => SERVICES_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Services Page updated successfully!");
          void queryClient.invalidateQueries({ queryKey: servicesKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteServicesMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => SERVICES_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Services Page deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: servicesKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
