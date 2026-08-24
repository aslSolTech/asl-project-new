import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { DEVICE_REQUESTS_API_ENDPOINTS } from "./endpoints";
import { DeviceRequestsRecord, CreateDeviceRequestsPayload, UpdateDeviceRequestsPayload } from "./types";

export const deviceRequestsKeys = {
  all: ["device-requests"] as const,
  lists: () => [...deviceRequestsKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...deviceRequestsKeys.lists(), params] as const,
  details: () => [...deviceRequestsKeys.all, "detail"] as const,
  detail: (id: string) => [...deviceRequestsKeys.details(), id] as const,
};

export function useDeviceRequestsListQuery() {
  return useApiQuery<DeviceRequestsRecord[]>(
    deviceRequestsKeys.lists(),
    DEVICE_REQUESTS_API_ENDPOINTS.LIST
  );
}

export function useDeviceRequestsDetailQuery(id?: string) {
  return useApiQuery<DeviceRequestsRecord>(
    deviceRequestsKeys.detail(id!),
    DEVICE_REQUESTS_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateDeviceRequestsMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<DeviceRequestsRecord, Error, CreateDeviceRequestsPayload>(
    DEVICE_REQUESTS_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Device Requests created successfully!");
          void queryClient.invalidateQueries({ queryKey: deviceRequestsKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateDeviceRequestsMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<DeviceRequestsRecord, Error, UpdateDeviceRequestsPayload>(
    (variables) => DEVICE_REQUESTS_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Device Requests updated successfully!");
          void queryClient.invalidateQueries({ queryKey: deviceRequestsKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteDeviceRequestsMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => DEVICE_REQUESTS_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Device Requests deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: deviceRequestsKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
