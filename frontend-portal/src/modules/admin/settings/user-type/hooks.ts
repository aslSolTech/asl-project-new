import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { USER_TYPE_API_ENDPOINTS } from "./endpoints";
import { UserTypeRecord, CreateUserTypePayload, UpdateUserTypePayload } from "./types";

export const userTypeKeys = {
  all: ["settings-user-types"] as const,
  lists: () => [...userTypeKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...userTypeKeys.lists(), params] as const,
  details: () => [...userTypeKeys.all, "detail"] as const,
  detail: (id: string) => [...userTypeKeys.details(), id] as const,
};

export function useUserTypeListQuery() {
  return useApiQuery<UserTypeRecord[]>(
    userTypeKeys.lists(),
    USER_TYPE_API_ENDPOINTS.LIST
  );
}

export function useUserTypeDetailQuery(id?: string) {
  return useApiQuery<UserTypeRecord>(
    userTypeKeys.detail(id!),
    USER_TYPE_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateUserTypeMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<UserTypeRecord, Error, CreateUserTypePayload>(
    USER_TYPE_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("User Type created successfully!");
          void queryClient.invalidateQueries({ queryKey: userTypeKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create user type");
        },
      },
    }
  );
}

export function useUpdateUserTypeMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<UserTypeRecord, Error, UpdateUserTypePayload>(
    (variables) => USER_TYPE_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("User Type updated successfully!");
          void queryClient.invalidateQueries({ queryKey: userTypeKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update user type");
        },
      },
    }
  );
}

export function useDeleteUserTypeMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => USER_TYPE_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("User Type deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: userTypeKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete user type");
        },
      },
    }
  );
}
