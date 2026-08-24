import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { OPERATOR_TYPE_API_ENDPOINTS } from "./endpoints";
import { OperatorTypeRecord, CreateOperatorTypePayload, UpdateOperatorTypePayload } from "./types";

export const operatorTypeKeys = {
  all: ["operator-type"] as const,
  lists: () => [...operatorTypeKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...operatorTypeKeys.lists(), params] as const,
  details: () => [...operatorTypeKeys.all, "detail"] as const,
  detail: (id: string) => [...operatorTypeKeys.details(), id] as const,
};

export function useOperatorTypeListQuery() {
  return useApiQuery<OperatorTypeRecord[]>(
    operatorTypeKeys.lists(),
    OPERATOR_TYPE_API_ENDPOINTS.LIST
  );
}

export function useOperatorTypeDetailQuery(id?: string) {
  return useApiQuery<OperatorTypeRecord>(
    operatorTypeKeys.detail(id!),
    OPERATOR_TYPE_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateOperatorTypeMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<OperatorTypeRecord, Error, CreateOperatorTypePayload>(
    OPERATOR_TYPE_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Operator Type created successfully!");
          void queryClient.invalidateQueries({ queryKey: operatorTypeKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateOperatorTypeMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<OperatorTypeRecord, Error, UpdateOperatorTypePayload>(
    (variables) => OPERATOR_TYPE_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Operator Type updated successfully!");
          void queryClient.invalidateQueries({ queryKey: operatorTypeKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteOperatorTypeMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => OPERATOR_TYPE_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Operator Type deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: operatorTypeKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
