import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { AEPS_API_ENDPOINTS } from "./endpoints";
import { AepsRecord, CreateAepsPayload, UpdateAepsPayload } from "./types";

export const aepsKeys = {
  all: ["aeps"] as const,
  lists: () => [...aepsKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...aepsKeys.lists(), params] as const,
  details: () => [...aepsKeys.all, "detail"] as const,
  detail: (id: string) => [...aepsKeys.details(), id] as const,
};

export function useAepsListQuery() {
  return useApiQuery<AepsRecord[]>(
    aepsKeys.lists(),
    AEPS_API_ENDPOINTS.LIST
  );
}

export function useAepsDetailQuery(id?: string) {
  return useApiQuery<AepsRecord>(
    aepsKeys.detail(id!),
    AEPS_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateAepsMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<AepsRecord, Error, CreateAepsPayload>(
    AEPS_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("AEPS Report created successfully!");
          void queryClient.invalidateQueries({ queryKey: aepsKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateAepsMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<AepsRecord, Error, UpdateAepsPayload>(
    (variables) => AEPS_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("AEPS Report updated successfully!");
          void queryClient.invalidateQueries({ queryKey: aepsKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteAepsMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => AEPS_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("AEPS Report deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: aepsKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
