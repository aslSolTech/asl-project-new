import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { ADD_MONEY_API_ENDPOINTS } from "./endpoints";
import { AddMoneyRecord, CreateAddMoneyPayload, UpdateAddMoneyPayload } from "./types";

export const addMoneyKeys = {
  all: ["add-money"] as const,
  lists: () => [...addMoneyKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...addMoneyKeys.lists(), params] as const,
  details: () => [...addMoneyKeys.all, "detail"] as const,
  detail: (id: string) => [...addMoneyKeys.details(), id] as const,
};

export function useAddMoneyListQuery() {
  return useApiQuery<AddMoneyRecord[]>(
    addMoneyKeys.lists(),
    ADD_MONEY_API_ENDPOINTS.LIST
  );
}

export function useAddMoneyDetailQuery(id?: string) {
  return useApiQuery<AddMoneyRecord>(
    addMoneyKeys.detail(id!),
    ADD_MONEY_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateAddMoneyMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<AddMoneyRecord, Error, CreateAddMoneyPayload>(
    ADD_MONEY_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Add Money created successfully!");
          void queryClient.invalidateQueries({ queryKey: addMoneyKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateAddMoneyMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<AddMoneyRecord, Error, UpdateAddMoneyPayload>(
    (variables) => ADD_MONEY_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Add Money updated successfully!");
          void queryClient.invalidateQueries({ queryKey: addMoneyKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteAddMoneyMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => ADD_MONEY_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Add Money deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: addMoneyKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
