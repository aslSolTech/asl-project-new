import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { BANNER_API_ENDPOINTS } from "./endpoints";
import { BannerRecord, CreateBannerPayload, UpdateBannerPayload } from "./types";

export const bannerKeys = {
  all: ["banner"] as const,
  lists: () => [...bannerKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...bannerKeys.lists(), params] as const,
  details: () => [...bannerKeys.all, "detail"] as const,
  detail: (id: string) => [...bannerKeys.details(), id] as const,
};

export function useBannerListQuery() {
  return useApiQuery<BannerRecord[]>(
    bannerKeys.lists(),
    BANNER_API_ENDPOINTS.LIST
  );
}

export function useBannerDetailQuery(id?: string) {
  return useApiQuery<BannerRecord>(
    bannerKeys.detail(id!),
    BANNER_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateBannerMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<BannerRecord, Error, CreateBannerPayload>(
    BANNER_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Banner created successfully!");
          void queryClient.invalidateQueries({ queryKey: bannerKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateBannerMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<BannerRecord, Error, UpdateBannerPayload>(
    (variables) => BANNER_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Banner updated successfully!");
          void queryClient.invalidateQueries({ queryKey: bannerKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteBannerMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => BANNER_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Banner deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: bannerKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
