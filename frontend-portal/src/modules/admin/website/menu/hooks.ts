import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { MENU_API_ENDPOINTS } from "./endpoints";
import { MenuRecord, CreateMenuPayload, UpdateMenuPayload } from "./types";

export const menuKeys = {
  all: ["menu"] as const,
  lists: () => [...menuKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...menuKeys.lists(), params] as const,
  details: () => [...menuKeys.all, "detail"] as const,
  detail: (id: string) => [...menuKeys.details(), id] as const,
};

export function useMenuListQuery() {
  return useApiQuery<MenuRecord[]>(
    menuKeys.lists(),
    MENU_API_ENDPOINTS.LIST
  );
}

export function useMenuDetailQuery(id?: string) {
  return useApiQuery<MenuRecord>(
    menuKeys.detail(id!),
    MENU_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateMenuMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<MenuRecord, Error, CreateMenuPayload>(
    MENU_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Menu created successfully!");
          void queryClient.invalidateQueries({ queryKey: menuKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateMenuMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<MenuRecord, Error, UpdateMenuPayload>(
    (variables) => MENU_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Menu updated successfully!");
          void queryClient.invalidateQueries({ queryKey: menuKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteMenuMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => MENU_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Menu deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: menuKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
