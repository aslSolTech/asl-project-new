import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { SERVICE_CONTROL_API_ENDPOINTS } from "./endpoints";
import { ServiceControlRecord, CreateServiceControlPayload, UpdateServiceControlPayload } from "./types";

export const serviceControlKeys = {
  all: ["service-control"] as const,
  lists: () => [...serviceControlKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...serviceControlKeys.lists(), params] as const,
  details: () => [...serviceControlKeys.all, "detail"] as const,
  detail: (id: string) => [...serviceControlKeys.details(), id] as const,
};

export function useServiceControlListQuery() {
  return useApiQuery<ServiceControlRecord[]>(
    serviceControlKeys.lists(),
    SERVICE_CONTROL_API_ENDPOINTS.LIST
  );
}

export function useServiceControlDetailQuery(id?: string) {
  return useApiQuery<ServiceControlRecord>(
    serviceControlKeys.detail(id!),
    SERVICE_CONTROL_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateServiceControlMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<ServiceControlRecord, Error, CreateServiceControlPayload>(
    SERVICE_CONTROL_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Service Control created successfully!");
          void queryClient.invalidateQueries({ queryKey: serviceControlKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create service control");
        },
      },
    }
  );
}

export function useUpdateServiceControlMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<ServiceControlRecord, Error, UpdateServiceControlPayload>(
    (variables) => SERVICE_CONTROL_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Service Control updated successfully!");
          void queryClient.invalidateQueries({ queryKey: serviceControlKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update service control");
        },
      },
    }
  );
}

export function useDeleteServiceControlMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => SERVICE_CONTROL_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Service Control deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: serviceControlKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete service control");
        },
      },
    }
  );
}
