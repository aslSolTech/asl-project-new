import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { OPERATOR_REGISTER_API_ENDPOINTS } from "./endpoints";
import { OperatorRegisterRecord, CreateOperatorRegisterPayload, UpdateOperatorRegisterPayload } from "./types";

export const operatorRegisterKeys = {
  all: ["operator-register"] as const,
  lists: () => [...operatorRegisterKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...operatorRegisterKeys.lists(), params] as const,
  details: () => [...operatorRegisterKeys.all, "detail"] as const,
  detail: (id: string) => [...operatorRegisterKeys.details(), id] as const,
};

export function useOperatorRegisterListQuery() {
  return useApiQuery<OperatorRegisterRecord[]>(
    operatorRegisterKeys.lists(),
    OPERATOR_REGISTER_API_ENDPOINTS.LIST
  );
}

export function useOperatorRegisterDetailQuery(id?: string) {
  return useApiQuery<OperatorRegisterRecord>(
    operatorRegisterKeys.detail(id!),
    OPERATOR_REGISTER_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateOperatorRegisterMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<OperatorRegisterRecord, Error, CreateOperatorRegisterPayload>(
    OPERATOR_REGISTER_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Operator Register created successfully!");
          void queryClient.invalidateQueries({ queryKey: operatorRegisterKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateOperatorRegisterMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<OperatorRegisterRecord, Error, UpdateOperatorRegisterPayload>(
    (variables) => OPERATOR_REGISTER_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Operator Register updated successfully!");
          void queryClient.invalidateQueries({ queryKey: operatorRegisterKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteOperatorRegisterMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => OPERATOR_REGISTER_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Operator Register deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: operatorRegisterKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
