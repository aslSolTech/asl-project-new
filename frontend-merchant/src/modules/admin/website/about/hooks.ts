import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { ABOUT_API_ENDPOINTS } from "./endpoints";
import { AboutRecord, CreateAboutPayload, UpdateAboutPayload } from "./types";

export const aboutKeys = {
  all: ["about"] as const,
  lists: () => [...aboutKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...aboutKeys.lists(), params] as const,
  details: () => [...aboutKeys.all, "detail"] as const,
  detail: (id: string) => [...aboutKeys.details(), id] as const,
};

export function useAboutListQuery() {
  return useApiQuery<AboutRecord[]>(
    aboutKeys.lists(),
    ABOUT_API_ENDPOINTS.LIST
  );
}

export function useAboutDetailQuery(id?: string) {
  return useApiQuery<AboutRecord>(
    aboutKeys.detail(id!),
    ABOUT_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateAboutMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<AboutRecord, Error, CreateAboutPayload>(
    ABOUT_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("About Us created successfully!");
          void queryClient.invalidateQueries({ queryKey: aboutKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateAboutMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<AboutRecord, Error, UpdateAboutPayload>(
    (variables) => ABOUT_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("About Us updated successfully!");
          void queryClient.invalidateQueries({ queryKey: aboutKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteAboutMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => ABOUT_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("About Us deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: aboutKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
