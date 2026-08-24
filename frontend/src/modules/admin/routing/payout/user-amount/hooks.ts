import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { USER_AMOUNT_API_ENDPOINTS } from "./endpoints";
import { UserAmountRecord, CreateUserAmountPayload, UpdateUserAmountPayload } from "./types";

export const userAmountKeys = {
  all: ["user-amount"] as const,
  lists: () => [...userAmountKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...userAmountKeys.lists(), params] as const,
  details: () => [...userAmountKeys.all, "detail"] as const,
  detail: (id: string) => [...userAmountKeys.details(), id] as const,
};

export function useUserAmountListQuery() {
  return useApiQuery<UserAmountRecord[]>(
    userAmountKeys.lists(),
    USER_AMOUNT_API_ENDPOINTS.LIST
  );
}

export function useUserAmountDetailQuery(id?: string) {
  return useApiQuery<UserAmountRecord>(
    userAmountKeys.detail(id!),
    USER_AMOUNT_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateUserAmountMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<UserAmountRecord, Error, CreateUserAmountPayload>(
    USER_AMOUNT_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("User Amount Wise Routing created successfully!");
          void queryClient.invalidateQueries({ queryKey: userAmountKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateUserAmountMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<UserAmountRecord, Error, UpdateUserAmountPayload>(
    (variables) => USER_AMOUNT_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("User Amount Wise Routing updated successfully!");
          void queryClient.invalidateQueries({ queryKey: userAmountKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteUserAmountMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => USER_AMOUNT_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("User Amount Wise Routing deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: userAmountKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
