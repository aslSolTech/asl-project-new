import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { LOGIN_ACTIVITY_API_ENDPOINTS } from "./endpoints";
import { LoginActivityRecord, CreateLoginActivityPayload, UpdateLoginActivityPayload } from "./types";

export const loginActivityKeys = {
  all: ["login-activity"] as const,
  lists: () => [...loginActivityKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...loginActivityKeys.lists(), params] as const,
  details: () => [...loginActivityKeys.all, "detail"] as const,
  detail: (id: string) => [...loginActivityKeys.details(), id] as const,
};

export function useLoginActivityListQuery() {
  return useApiQuery<LoginActivityRecord[]>(
    loginActivityKeys.lists(),
    LOGIN_ACTIVITY_API_ENDPOINTS.LIST
  );
}

export function useLoginActivityDetailQuery(id?: string) {
  return useApiQuery<LoginActivityRecord>(
    loginActivityKeys.detail(id!),
    LOGIN_ACTIVITY_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateLoginActivityMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<LoginActivityRecord, Error, CreateLoginActivityPayload>(
    LOGIN_ACTIVITY_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("User Login Activity created successfully!");
          void queryClient.invalidateQueries({ queryKey: loginActivityKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateLoginActivityMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<LoginActivityRecord, Error, UpdateLoginActivityPayload>(
    (variables) => LOGIN_ACTIVITY_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("User Login Activity updated successfully!");
          void queryClient.invalidateQueries({ queryKey: loginActivityKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteLoginActivityMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => LOGIN_ACTIVITY_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("User Login Activity deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: loginActivityKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
