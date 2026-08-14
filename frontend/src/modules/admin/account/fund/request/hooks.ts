import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { REQUEST_API_ENDPOINTS } from "./endpoints";
import {
  RequestRecord,
  CreateRequestPayload,
  UpdateRequestPayload,
  ApproveRequestPayload,
  DeclineRequestPayload,
} from "./types";

export const requestKeys = {
  all: ["account-fund-request"] as const,
  lists: () => [...requestKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...requestKeys.lists(), params] as const,
  details: () => [...requestKeys.all, "detail"] as const,
  detail: (id: string) => [...requestKeys.details(), id] as const,
};

export function useRequestListQuery() {
  return useApiQuery<RequestRecord[]>(
    requestKeys.lists(),
    REQUEST_API_ENDPOINTS.LIST
  );
}

export function useRequestDetailQuery(id?: string) {
  return useApiQuery<RequestRecord>(
    requestKeys.detail(id!),
    REQUEST_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateRequestMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<RequestRecord, Error, CreateRequestPayload>(
    REQUEST_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Fund Request created successfully!");
          void queryClient.invalidateQueries({ queryKey: requestKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateRequestMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<RequestRecord, Error, UpdateRequestPayload>(
    (variables) => REQUEST_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Fund Request updated successfully!");
          void queryClient.invalidateQueries({ queryKey: requestKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useApproveRequestMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, ApproveRequestPayload>(
    (payload) => REQUEST_API_ENDPOINTS.APPROVE(payload.id),
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Fund Request approved successfully!");
          void queryClient.invalidateQueries({ queryKey: requestKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to approve fund request");
        },
      },
    }
  );
}

export function useDeclineRequestMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, DeclineRequestPayload>(
    (payload) => REQUEST_API_ENDPOINTS.DECLINE(payload.id),
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Fund Request declined successfully!");
          void queryClient.invalidateQueries({ queryKey: requestKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to decline fund request");
        },
      },
    }
  );
}

export function useDeleteRequestMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => REQUEST_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Fund Request deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: requestKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
