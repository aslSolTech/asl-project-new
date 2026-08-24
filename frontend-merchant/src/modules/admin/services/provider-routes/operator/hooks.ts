import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { OPERATOR_API_ENDPOINTS } from "./endpoints";
import { OperatorRecord, CreateOperatorPayload, UpdateOperatorPayload } from "./types";

export const operatorKeys = {
  all: ["operator"] as const,
  lists: () => [...operatorKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...operatorKeys.lists(), params] as const,
  details: () => [...operatorKeys.all, "detail"] as const,
  detail: (id: string) => [...operatorKeys.details(), id] as const,
};

export function useOperatorListQuery() {
  return useApiQuery<OperatorRecord[]>(
    operatorKeys.lists(),
    OPERATOR_API_ENDPOINTS.LIST
  );
}

export function useOperatorDetailQuery(id?: string) {
  return useApiQuery<OperatorRecord>(
    operatorKeys.detail(id!),
    OPERATOR_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateOperatorMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<OperatorRecord, Error, CreateOperatorPayload>(
    OPERATOR_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Operator Wise API created successfully!");
          void queryClient.invalidateQueries({ queryKey: operatorKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateOperatorMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<OperatorRecord, Error, UpdateOperatorPayload>(
    (variables) => OPERATOR_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Operator Wise API updated successfully!");
          void queryClient.invalidateQueries({ queryKey: operatorKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteOperatorMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => OPERATOR_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Operator Wise API deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: operatorKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
