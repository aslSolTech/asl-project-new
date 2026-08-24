import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { PROFILE_API_ENDPOINTS } from "./endpoints";
import { ProfileRecord, CreateProfilePayload, UpdateProfilePayload } from "./types";

export const profileKeys = {
  all: ["profile"] as const,
  lists: () => [...profileKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...profileKeys.lists(), params] as const,
  details: () => [...profileKeys.all, "detail"] as const,
  detail: (id: string) => [...profileKeys.details(), id] as const,
};

export function useProfileListQuery() {
  return useApiQuery<ProfileRecord[]>(
    profileKeys.lists(),
    PROFILE_API_ENDPOINTS.LIST
  );
}

export function useProfileDetailQuery(id?: string) {
  return useApiQuery<ProfileRecord>(
    profileKeys.detail(id!),
    PROFILE_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateProfileMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<ProfileRecord, Error, CreateProfilePayload>(
    PROFILE_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Profile Info created successfully!");
          void queryClient.invalidateQueries({ queryKey: profileKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<ProfileRecord, Error, UpdateProfilePayload>(
    (variables) => PROFILE_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Profile Info updated successfully!");
          void queryClient.invalidateQueries({ queryKey: profileKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteProfileMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => PROFILE_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Profile Info deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: profileKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
