import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { CALLBACKS_API_ENDPOINTS } from "./endpoints";
import { CallbacksRecord, CreateCallbacksPayload, UpdateCallbacksPayload } from "./types";

export const callbacksKeys = {
  all: ["callbacks"] as const,
  lists: () => [...callbacksKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...callbacksKeys.lists(), params] as const,
  details: () => [...callbacksKeys.all, "detail"] as const,
  detail: (id: string) => [...callbacksKeys.details(), id] as const,
};

export function useCallbacksListQuery() {
  return useApiQuery<CallbacksRecord[]>(
    callbacksKeys.lists(),
    CALLBACKS_API_ENDPOINTS.LIST
  );
}

export function useCallbacksDetailQuery(id?: string) {
  return useApiQuery<CallbacksRecord>(
    callbacksKeys.detail(id!),
    CALLBACKS_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateCallbacksMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<CallbacksRecord, Error, CreateCallbacksPayload>(
    CALLBACKS_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Callback Requests created successfully!");
          void queryClient.invalidateQueries({ queryKey: callbacksKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateCallbacksMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<CallbacksRecord, Error, UpdateCallbacksPayload>(
    (variables) => CALLBACKS_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Callback Requests updated successfully!");
          void queryClient.invalidateQueries({ queryKey: callbacksKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteCallbacksMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => CALLBACKS_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Callback Requests deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: callbacksKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
