import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { OPERATOR_CATEGORY_API_ENDPOINTS } from "./endpoints";
import { OperatorCategoryRecord, CreateOperatorCategoryPayload, UpdateOperatorCategoryPayload } from "./types";

export const operatorCategoryKeys = {
  all: ["operator-category"] as const,
  lists: () => [...operatorCategoryKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...operatorCategoryKeys.lists(), params] as const,
  details: () => [...operatorCategoryKeys.all, "detail"] as const,
  detail: (id: string) => [...operatorCategoryKeys.details(), id] as const,
};

export function useOperatorCategoryListQuery() {
  return useApiQuery<OperatorCategoryRecord[]>(
    operatorCategoryKeys.lists(),
    OPERATOR_CATEGORY_API_ENDPOINTS.LIST
  );
}

export function useOperatorCategoryDetailQuery(id?: string) {
  return useApiQuery<OperatorCategoryRecord>(
    operatorCategoryKeys.detail(id!),
    OPERATOR_CATEGORY_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateOperatorCategoryMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<OperatorCategoryRecord, Error, CreateOperatorCategoryPayload>(
    OPERATOR_CATEGORY_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Category created successfully!");
          void queryClient.invalidateQueries({ queryKey: operatorCategoryKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateOperatorCategoryMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<OperatorCategoryRecord, Error, UpdateOperatorCategoryPayload>(
    (variables) => OPERATOR_CATEGORY_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Category updated successfully!");
          void queryClient.invalidateQueries({ queryKey: operatorCategoryKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteOperatorCategoryMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => OPERATOR_CATEGORY_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Category deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: operatorCategoryKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
