import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { CATEGORIES_API_ENDPOINTS } from "./endpoints";
import { CategoriesRecord, CreateCategoriesPayload, UpdateCategoriesPayload } from "./types";

export const categoriesKeys = {
  all: ["categories"] as const,
  lists: () => [...categoriesKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...categoriesKeys.lists(), params] as const,
  details: () => [...categoriesKeys.all, "detail"] as const,
  detail: (id: string) => [...categoriesKeys.details(), id] as const,
};

export function useCategoriesListQuery() {
  return useApiQuery<CategoriesRecord[]>(
    categoriesKeys.lists(),
    CATEGORIES_API_ENDPOINTS.LIST
  );
}

export function useCategoriesDetailQuery(id?: string) {
  return useApiQuery<CategoriesRecord>(
    categoriesKeys.detail(id!),
    CATEGORIES_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateCategoriesMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<CategoriesRecord, Error, CreateCategoriesPayload>(
    CATEGORIES_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Service Categories created successfully!");
          void queryClient.invalidateQueries({ queryKey: categoriesKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateCategoriesMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<CategoriesRecord, Error, UpdateCategoriesPayload>(
    (variables) => CATEGORIES_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Service Categories updated successfully!");
          void queryClient.invalidateQueries({ queryKey: categoriesKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteCategoriesMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => CATEGORIES_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Service Categories deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: categoriesKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
