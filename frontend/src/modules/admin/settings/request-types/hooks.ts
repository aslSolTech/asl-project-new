import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { REQUEST_TYPES_API_ENDPOINTS } from "./endpoints";
import {
  RequestTypeRecord,
  CreateRequestTypePayload,
  UpdateRequestTypePayload,
  RequestParamRecord,
  CreateRequestParamPayload,
  UpdateRequestParamPayload,
  ParamStatusRecord,
  CreateParamStatusPayload,
  UpdateParamStatusPayload,
} from "./types";

// ==================== 1. Request Type Hooks ====================
export const requestTypeKeys = {
  all: ["settings-request-types"] as const,
  lists: () => [...requestTypeKeys.all, "list"] as const,
  details: () => [...requestTypeKeys.all, "detail"] as const,
  detail: (id: string) => [...requestTypeKeys.details(), id] as const,
};

export function useRequestTypeListQuery() {
  return useApiQuery<RequestTypeRecord[]>(
    requestTypeKeys.lists(),
    REQUEST_TYPES_API_ENDPOINTS.REQUEST_TYPE.LIST
  );
}

export function useRequestTypeDetailQuery(id?: string) {
  return useApiQuery<RequestTypeRecord>(
    requestTypeKeys.detail(id!),
    REQUEST_TYPES_API_ENDPOINTS.REQUEST_TYPE.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateRequestTypeMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<RequestTypeRecord | RequestTypeRecord[], Error, CreateRequestTypePayload | { items: CreateRequestTypePayload[] }>(
    REQUEST_TYPES_API_ENDPOINTS.REQUEST_TYPE.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Request Type(s) saved successfully!");
          void queryClient.invalidateQueries({ queryKey: requestTypeKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to save request type");
        },
      },
    }
  );
}

export function useUpdateRequestTypeMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<RequestTypeRecord, Error, UpdateRequestTypePayload>(
    (variables) => REQUEST_TYPES_API_ENDPOINTS.REQUEST_TYPE.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Request Type updated successfully!");
          void queryClient.invalidateQueries({ queryKey: requestTypeKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update request type");
        },
      },
    }
  );
}

export function useDeleteRequestTypeMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => REQUEST_TYPES_API_ENDPOINTS.REQUEST_TYPE.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Request Type deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: requestTypeKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete request type");
        },
      },
    }
  );
}

// ==================== 2. Request Parameter Hooks ====================
export const requestParamKeys = {
  all: ["settings-request-params"] as const,
  lists: () => [...requestParamKeys.all, "list"] as const,
  details: () => [...requestParamKeys.all, "detail"] as const,
  detail: (id: string) => [...requestParamKeys.details(), id] as const,
};

export function useRequestParamListQuery() {
  return useApiQuery<RequestParamRecord[]>(
    requestParamKeys.lists(),
    REQUEST_TYPES_API_ENDPOINTS.REQUEST_PARAM.LIST
  );
}

export function useRequestParamDetailQuery(id?: string) {
  return useApiQuery<RequestParamRecord>(
    requestParamKeys.detail(id!),
    REQUEST_TYPES_API_ENDPOINTS.REQUEST_PARAM.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateRequestParamMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<RequestParamRecord | RequestParamRecord[], Error, CreateRequestParamPayload | { items: CreateRequestParamPayload[] }>(
    REQUEST_TYPES_API_ENDPOINTS.REQUEST_PARAM.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Request Parameter(s) saved successfully!");
          void queryClient.invalidateQueries({ queryKey: requestParamKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to save request parameter");
        },
      },
    }
  );
}

export function useUpdateRequestParamMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<RequestParamRecord, Error, UpdateRequestParamPayload>(
    (variables) => REQUEST_TYPES_API_ENDPOINTS.REQUEST_PARAM.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Request Parameter updated successfully!");
          void queryClient.invalidateQueries({ queryKey: requestParamKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update request parameter");
        },
      },
    }
  );
}

export function useDeleteRequestParamMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => REQUEST_TYPES_API_ENDPOINTS.REQUEST_PARAM.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Request Parameter deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: requestParamKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete request parameter");
        },
      },
    }
  );
}

// ==================== 3. Parameter Status Hooks ====================
export const paramStatusKeys = {
  all: ["settings-param-status"] as const,
  lists: () => [...paramStatusKeys.all, "list"] as const,
  details: () => [...paramStatusKeys.all, "detail"] as const,
  detail: (id: string) => [...paramStatusKeys.details(), id] as const,
};

export function useParamStatusListQuery() {
  return useApiQuery<ParamStatusRecord[]>(
    paramStatusKeys.lists(),
    REQUEST_TYPES_API_ENDPOINTS.PARAM_STATUS.LIST
  );
}

export function useParamStatusDetailQuery(id?: string) {
  return useApiQuery<ParamStatusRecord>(
    paramStatusKeys.detail(id!),
    REQUEST_TYPES_API_ENDPOINTS.PARAM_STATUS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateParamStatusMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<ParamStatusRecord | ParamStatusRecord[], Error, CreateParamStatusPayload | { items: CreateParamStatusPayload[] }>(
    REQUEST_TYPES_API_ENDPOINTS.PARAM_STATUS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Parameter Status(es) saved successfully!");
          void queryClient.invalidateQueries({ queryKey: paramStatusKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to save parameter status");
        },
      },
    }
  );
}

export function useUpdateParamStatusMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<ParamStatusRecord, Error, UpdateParamStatusPayload>(
    (variables) => REQUEST_TYPES_API_ENDPOINTS.PARAM_STATUS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Parameter Status updated successfully!");
          void queryClient.invalidateQueries({ queryKey: paramStatusKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update parameter status");
        },
      },
    }
  );
}

export function useDeleteParamStatusMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => REQUEST_TYPES_API_ENDPOINTS.PARAM_STATUS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Parameter Status deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: paramStatusKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete parameter status");
        },
      },
    }
  );
}
