import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { PACKAGE_API_ENDPOINTS } from "./endpoints";
import { PackageRecord, CreatePackagePayload, UpdatePackagePayload } from "./types";

export const packageKeys = {
  all: ["package"] as const,
  lists: () => [...packageKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...packageKeys.lists(), params] as const,
  details: () => [...packageKeys.all, "detail"] as const,
  detail: (id: string) => [...packageKeys.details(), id] as const,
};

export function usePackageListQuery() {
  return useApiQuery<PackageRecord[]>(
    packageKeys.lists(),
    PACKAGE_API_ENDPOINTS.LIST
  );
}

export function usePackageDetailQuery(id?: string) {
  return useApiQuery<PackageRecord>(
    packageKeys.detail(id!),
    PACKAGE_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreatePackageMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<PackageRecord, Error, CreatePackagePayload>(
    PACKAGE_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Package Report created successfully!");
          void queryClient.invalidateQueries({ queryKey: packageKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdatePackageMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<PackageRecord, Error, UpdatePackagePayload>(
    (variables) => PACKAGE_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Package Report updated successfully!");
          void queryClient.invalidateQueries({ queryKey: packageKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeletePackageMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => PACKAGE_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Package Report deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: packageKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
