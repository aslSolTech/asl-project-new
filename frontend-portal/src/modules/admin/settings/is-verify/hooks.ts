import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { IS_VERIFY_API_ENDPOINTS } from "./endpoints";
import { IsVerifyRecord, CreateIsVerifyPayload, UpdateIsVerifyPayload } from "./types";

export const isVerifyKeys = {
  all: ["settings-is-verify"] as const,
  lists: () => [...isVerifyKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...isVerifyKeys.lists(), params] as const,
  details: () => [...isVerifyKeys.all, "detail"] as const,
  detail: (id: string) => [...isVerifyKeys.details(), id] as const,
};

export function useIsVerifyListQuery() {
  return useApiQuery<IsVerifyRecord[]>(
    isVerifyKeys.lists(),
    IS_VERIFY_API_ENDPOINTS.LIST
  );
}

export function useIsVerifyDetailQuery(id?: string) {
  return useApiQuery<IsVerifyRecord>(
    isVerifyKeys.detail(id!),
    IS_VERIFY_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateIsVerifyMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<IsVerifyRecord, Error, CreateIsVerifyPayload>(
    IS_VERIFY_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Verification type created successfully!");
          void queryClient.invalidateQueries({ queryKey: isVerifyKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create verification type");
        },
      },
    }
  );
}

export function useUpdateIsVerifyMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<IsVerifyRecord, Error, UpdateIsVerifyPayload>(
    (variables) => IS_VERIFY_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Verification type updated successfully!");
          void queryClient.invalidateQueries({ queryKey: isVerifyKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update verification type");
        },
      },
    }
  );
}

export function useDeleteIsVerifyMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => IS_VERIFY_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Verification type deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: isVerifyKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete verification type");
        },
      },
    }
  );
}
