import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { REQUEST_BANK_LIST_API_ENDPOINTS } from "./endpoints";
import { RequestBankListRecord, CreateRequestBankListPayload, UpdateRequestBankListPayload } from "./types";

export const requestBankListKeys = {
  all: ["request-bank-list"] as const,
  lists: () => [...requestBankListKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...requestBankListKeys.lists(), params] as const,
  details: () => [...requestBankListKeys.all, "detail"] as const,
  detail: (id: string) => [...requestBankListKeys.details(), id] as const,
};

export function useRequestBankListListQuery() {
  return useApiQuery<RequestBankListRecord[]>(
    requestBankListKeys.lists(),
    REQUEST_BANK_LIST_API_ENDPOINTS.LIST
  );
}

export function useRequestBankListDetailQuery(id?: string) {
  return useApiQuery<RequestBankListRecord>(
    requestBankListKeys.detail(id!),
    REQUEST_BANK_LIST_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateRequestBankListMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<RequestBankListRecord, Error, CreateRequestBankListPayload>(
    REQUEST_BANK_LIST_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Fund Request Bank List created successfully!");
          void queryClient.invalidateQueries({ queryKey: requestBankListKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateRequestBankListMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<RequestBankListRecord, Error, UpdateRequestBankListPayload>(
    (variables) => REQUEST_BANK_LIST_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Fund Request Bank List updated successfully!");
          void queryClient.invalidateQueries({ queryKey: requestBankListKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteRequestBankListMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => REQUEST_BANK_LIST_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Fund Request Bank List deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: requestBankListKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
