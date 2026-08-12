import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { TWO_FACTOR_AUTH_API_ENDPOINTS } from "./endpoints";
import { TwoFactorAuthRecord, CreateTwoFactorAuthPayload, UpdateTwoFactorAuthPayload } from "./types";

export const twoFactorAuthKeys = {
  all: ["2fa"] as const,
  lists: () => [...twoFactorAuthKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...twoFactorAuthKeys.lists(), params] as const,
  details: () => [...twoFactorAuthKeys.all, "detail"] as const,
  detail: (id: string) => [...twoFactorAuthKeys.details(), id] as const,
};

export function useTwoFactorAuthListQuery() {
  return useApiQuery<TwoFactorAuthRecord[]>(
    twoFactorAuthKeys.lists(),
    TWO_FACTOR_AUTH_API_ENDPOINTS.LIST
  );
}

export function useTwoFactorAuthDetailQuery(id?: string) {
  return useApiQuery<TwoFactorAuthRecord>(
    twoFactorAuthKeys.detail(id!),
    TWO_FACTOR_AUTH_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateTwoFactorAuthMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<TwoFactorAuthRecord, Error, CreateTwoFactorAuthPayload>(
    TWO_FACTOR_AUTH_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Two-Factor Auth created successfully!");
          void queryClient.invalidateQueries({ queryKey: twoFactorAuthKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateTwoFactorAuthMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<TwoFactorAuthRecord, Error, UpdateTwoFactorAuthPayload>(
    (variables) => TWO_FACTOR_AUTH_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Two-Factor Auth updated successfully!");
          void queryClient.invalidateQueries({ queryKey: twoFactorAuthKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteTwoFactorAuthMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => TWO_FACTOR_AUTH_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Two-Factor Auth deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: twoFactorAuthKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
