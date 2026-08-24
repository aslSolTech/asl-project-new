import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { PACKAGE_UPGRADE_API_ENDPOINTS } from "./endpoints";
import { PackageUpgradeRecord, CreatePackageUpgradePayload, UpdatePackageUpgradePayload } from "./types";

export const packageUpgradeKeys = {
  all: ["package-upgrade"] as const,
  lists: () => [...packageUpgradeKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...packageUpgradeKeys.lists(), params] as const,
  details: () => [...packageUpgradeKeys.all, "detail"] as const,
  detail: (id: string) => [...packageUpgradeKeys.details(), id] as const,
};

export function usePackageUpgradeListQuery() {
  return useApiQuery<PackageUpgradeRecord[]>(
    packageUpgradeKeys.lists(),
    PACKAGE_UPGRADE_API_ENDPOINTS.LIST
  );
}

export function usePackageUpgradeDetailQuery(id?: string) {
  return useApiQuery<PackageUpgradeRecord>(
    packageUpgradeKeys.detail(id!),
    PACKAGE_UPGRADE_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreatePackageUpgradeMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<PackageUpgradeRecord, Error, CreatePackageUpgradePayload>(
    PACKAGE_UPGRADE_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Package Upgrade Requests created successfully!");
          void queryClient.invalidateQueries({ queryKey: packageUpgradeKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdatePackageUpgradeMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<PackageUpgradeRecord, Error, UpdatePackageUpgradePayload>(
    (variables) => PACKAGE_UPGRADE_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Package Upgrade Requests updated successfully!");
          void queryClient.invalidateQueries({ queryKey: packageUpgradeKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeletePackageUpgradeMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => PACKAGE_UPGRADE_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Package Upgrade Requests deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: packageUpgradeKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
