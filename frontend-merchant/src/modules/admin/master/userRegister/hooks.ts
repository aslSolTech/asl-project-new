import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { USER_REGISTER_API_ENDPOINTS } from "./endpoints";
import { UserRegisterRecord, CreateUserRegisterPayload, UpdateUserRegisterPayload } from "./types";

export const userRegisterKeys = {
  all: ["user-register"] as const,
  lists: () => [...userRegisterKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...userRegisterKeys.lists(), params] as const,
  details: () => [...userRegisterKeys.all, "detail"] as const,
  detail: (id: string) => [...userRegisterKeys.details(), id] as const,
};

export function useUserRegisterListQuery() {
  return useApiQuery<UserRegisterRecord[]>(
    userRegisterKeys.lists(),
    USER_REGISTER_API_ENDPOINTS.LIST
  );
}

export function useUserRegisterDetailQuery(id?: string) {
  return useApiQuery<UserRegisterRecord>(
    userRegisterKeys.detail(id!),
    USER_REGISTER_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateUserRegisterMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<UserRegisterRecord, Error, CreateUserRegisterPayload>(
    USER_REGISTER_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("User Register created successfully!");
          void queryClient.invalidateQueries({ queryKey: userRegisterKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateUserRegisterMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<UserRegisterRecord, Error, UpdateUserRegisterPayload>(
    (variables) => USER_REGISTER_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("User Register updated successfully!");
          void queryClient.invalidateQueries({ queryKey: userRegisterKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteUserRegisterMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => USER_REGISTER_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("User Register deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: userRegisterKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
