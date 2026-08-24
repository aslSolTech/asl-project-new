import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { API_REGISTER_API_ENDPOINTS } from "./endpoints";
import { ApiRegisterRecord, CreateApiRegisterPayload, UpdateApiRegisterPayload } from "./types";

export const apiRegisterKeys = {
  all: ["api-register"] as const,
  lists: () => [...apiRegisterKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...apiRegisterKeys.lists(), params] as const,
  details: () => [...apiRegisterKeys.all, "detail"] as const,
  detail: (id: string) => [...apiRegisterKeys.details(), id] as const,
};

export function useApiRegisterListQuery() {
  return useApiQuery<ApiRegisterRecord[]>(
    apiRegisterKeys.lists(),
    API_REGISTER_API_ENDPOINTS.LIST
  );
}

export function useApiRegisterDetailQuery(id?: string) {
  return useApiQuery<ApiRegisterRecord>(
    apiRegisterKeys.detail(id!),
    API_REGISTER_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateApiRegisterMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<ApiRegisterRecord, Error, CreateApiRegisterPayload>(
    API_REGISTER_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("API Register created successfully!");
          void queryClient.invalidateQueries({ queryKey: apiRegisterKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateApiRegisterMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<ApiRegisterRecord, Error, UpdateApiRegisterPayload>(
    (variables) => API_REGISTER_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("API Register updated successfully!");
          void queryClient.invalidateQueries({ queryKey: apiRegisterKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteApiRegisterMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => API_REGISTER_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("API Register deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: apiRegisterKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
