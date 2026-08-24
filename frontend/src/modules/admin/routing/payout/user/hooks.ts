import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { USER_API_ENDPOINTS } from "./endpoints";
import { UserRecord, CreateUserPayload, UpdateUserPayload } from "./types";

export const userKeys = {
  all: ["user"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...userKeys.lists(), params] as const,
  details: () => [...userKeys.all, "detail"] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};

export function useUserListQuery() {
  return useApiQuery<UserRecord[]>(
    userKeys.lists(),
    USER_API_ENDPOINTS.LIST
  );
}

export function useUserDetailQuery(id?: string) {
  return useApiQuery<UserRecord>(
    userKeys.detail(id!),
    USER_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateUserMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<UserRecord, Error, CreateUserPayload>(
    USER_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("User Wise Routing created successfully!");
          void queryClient.invalidateQueries({ queryKey: userKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateUserMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<UserRecord, Error, UpdateUserPayload>(
    (variables) => USER_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("User Wise Routing updated successfully!");
          void queryClient.invalidateQueries({ queryKey: userKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteUserMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => USER_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("User Wise Routing deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: userKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
