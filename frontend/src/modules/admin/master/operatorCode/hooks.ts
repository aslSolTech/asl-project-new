import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { OPERATOR_CODE_API_ENDPOINTS } from "./endpoints";
import { OperatorCodeRecord, CreateOperatorCodePayload, UpdateOperatorCodePayload } from "./types";

export const operatorCodeKeys = {
  all: ["operator-code"] as const,
  lists: () => [...operatorCodeKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...operatorCodeKeys.lists(), params] as const,
  details: () => [...operatorCodeKeys.all, "detail"] as const,
  detail: (id: string) => [...operatorCodeKeys.details(), id] as const,
};

export function useOperatorCodeListQuery() {
  return useApiQuery<OperatorCodeRecord[]>(
    operatorCodeKeys.lists(),
    OPERATOR_CODE_API_ENDPOINTS.LIST
  );
}

export function useOperatorCodeDetailQuery(id?: string) {
  return useApiQuery<OperatorCodeRecord>(
    operatorCodeKeys.detail(id!),
    OPERATOR_CODE_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateOperatorCodeMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<OperatorCodeRecord, Error, CreateOperatorCodePayload>(
    OPERATOR_CODE_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Operator Code created successfully!");
          void queryClient.invalidateQueries({ queryKey: operatorCodeKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateOperatorCodeMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<OperatorCodeRecord, Error, UpdateOperatorCodePayload>(
    (variables) => OPERATOR_CODE_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Operator Code updated successfully!");
          void queryClient.invalidateQueries({ queryKey: operatorCodeKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteOperatorCodeMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => OPERATOR_CODE_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Operator Code deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: operatorCodeKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
