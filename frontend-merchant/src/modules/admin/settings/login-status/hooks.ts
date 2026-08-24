import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { LOGIN_STATUS_API_ENDPOINTS } from "./endpoints";
import { LoginStatusRecord, CreateLoginStatusPayload, UpdateLoginStatusPayload } from "./types";

export const loginStatusKeys = {
  all: ["settings-login-status"] as const,
  lists: () => [...loginStatusKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...loginStatusKeys.lists(), params] as const,
  details: () => [...loginStatusKeys.all, "detail"] as const,
  detail: (id: string) => [...loginStatusKeys.details(), id] as const,
};

export function useLoginStatusListQuery() {
  return useApiQuery<LoginStatusRecord[]>(
    loginStatusKeys.lists(),
    LOGIN_STATUS_API_ENDPOINTS.LIST
  );
}

export function useLoginStatusDetailQuery(id?: string) {
  return useApiQuery<LoginStatusRecord>(
    loginStatusKeys.detail(id!),
    LOGIN_STATUS_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateLoginStatusMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<LoginStatusRecord, Error, CreateLoginStatusPayload>(
    LOGIN_STATUS_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Login status created successfully!");
          void queryClient.invalidateQueries({ queryKey: loginStatusKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create login status");
        },
      },
    }
  );
}

export function useUpdateLoginStatusMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<LoginStatusRecord, Error, UpdateLoginStatusPayload>(
    (variables) => LOGIN_STATUS_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Login status updated successfully!");
          void queryClient.invalidateQueries({ queryKey: loginStatusKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update login status");
        },
      },
    }
  );
}

export function useDeleteLoginStatusMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => LOGIN_STATUS_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Login status deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: loginStatusKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete login status");
        },
      },
    }
  );
}
