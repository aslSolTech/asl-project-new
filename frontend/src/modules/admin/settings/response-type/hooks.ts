import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { RESPONSE_TYPE_API_ENDPOINTS, RESPONSE_PARAM_API_ENDPOINTS } from "./endpoints";
import {
  ResponseTypeRecord,
  CreateResponseTypePayload,
  UpdateResponseTypePayload,
  ResponseParamRecord,
  CreateResponseParamPayload,
  UpdateResponseParamPayload,
} from "./types";

export const responseTypeKeys = {
  all: ["settings-response-types"] as const,
  lists: () => [...responseTypeKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...responseTypeKeys.lists(), params] as const,
  details: () => [...responseTypeKeys.all, "detail"] as const,
  detail: (id: string) => [...responseTypeKeys.details(), id] as const,
};

export function useResponseTypeListQuery() {
  return useApiQuery<ResponseTypeRecord[]>(
    responseTypeKeys.lists(),
    RESPONSE_TYPE_API_ENDPOINTS.LIST
  );
}

export function useResponseTypeDetailQuery(id?: string) {
  return useApiQuery<ResponseTypeRecord>(
    responseTypeKeys.detail(id!),
    RESPONSE_TYPE_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateResponseTypeMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<ResponseTypeRecord, Error, CreateResponseTypePayload>(
    RESPONSE_TYPE_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Response Type created successfully!");
          void queryClient.invalidateQueries({ queryKey: responseTypeKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create response type");
        },
      },
    }
  );
}

export function useUpdateResponseTypeMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<ResponseTypeRecord, Error, UpdateResponseTypePayload>(
    (variables) => RESPONSE_TYPE_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Response Type updated successfully!");
          void queryClient.invalidateQueries({ queryKey: responseTypeKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update response type");
        },
      },
    }
  );
}

export function useDeleteResponseTypeMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => RESPONSE_TYPE_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Response Type deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: responseTypeKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete response type");
        },
      },
    }
  );
}

// -------------------------------------------------------------
// Response Parameter Hooks
// -------------------------------------------------------------
export const responseParamKeys = {
  all: ["settings-response-parameters"] as const,
  lists: () => [...responseParamKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...responseParamKeys.lists(), params] as const,
  details: () => [...responseParamKeys.all, "detail"] as const,
  detail: (id: string) => [...responseParamKeys.details(), id] as const,
};

export function useResponseParamListQuery() {
  return useApiQuery<ResponseParamRecord[]>(
    responseParamKeys.lists(),
    RESPONSE_PARAM_API_ENDPOINTS.LIST
  );
}

export function useResponseParamDetailQuery(id?: string) {
  return useApiQuery<ResponseParamRecord>(
    responseParamKeys.detail(id!),
    RESPONSE_PARAM_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateResponseParamMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<ResponseParamRecord[], Error, { items: CreateResponseParamPayload[] } | CreateResponseParamPayload>(
    RESPONSE_PARAM_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Response Parameter(s) saved successfully!");
          void queryClient.invalidateQueries({ queryKey: responseParamKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create response parameter");
        },
      },
    }
  );
}

export function useUpdateResponseParamMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<ResponseParamRecord, Error, UpdateResponseParamPayload>(
    (variables) => RESPONSE_PARAM_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Response Parameter updated successfully!");
          void queryClient.invalidateQueries({ queryKey: responseParamKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update response parameter");
        },
      },
    }
  );
}

export function useDeleteResponseParamMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => RESPONSE_PARAM_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Response Parameter deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: responseParamKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete response parameter");
        },
      },
    }
  );
}
