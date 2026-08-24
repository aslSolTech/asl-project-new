import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { SUB_MENU_API_ENDPOINTS } from "./endpoints";
import { SubMenuRecord, CreateSubMenuPayload, UpdateSubMenuPayload } from "./types";

export const subMenuKeys = {
  all: ["sub-menu"] as const,
  lists: () => [...subMenuKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...subMenuKeys.lists(), params] as const,
  details: () => [...subMenuKeys.all, "detail"] as const,
  detail: (id: string) => [...subMenuKeys.details(), id] as const,
};

export function useSubMenuListQuery() {
  return useApiQuery<SubMenuRecord[]>(
    subMenuKeys.lists(),
    SUB_MENU_API_ENDPOINTS.LIST
  );
}

export function useSubMenuDetailQuery(id?: string) {
  return useApiQuery<SubMenuRecord>(
    subMenuKeys.detail(id!),
    SUB_MENU_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateSubMenuMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<SubMenuRecord, Error, CreateSubMenuPayload>(
    SUB_MENU_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Sub Menu created successfully!");
          void queryClient.invalidateQueries({ queryKey: subMenuKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateSubMenuMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<SubMenuRecord, Error, UpdateSubMenuPayload>(
    (variables) => SUB_MENU_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Sub Menu updated successfully!");
          void queryClient.invalidateQueries({ queryKey: subMenuKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteSubMenuMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => SUB_MENU_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Sub Menu deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: subMenuKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
