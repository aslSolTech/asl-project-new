import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { RESPONSE_TYPE_API_ENDPOINTS } from "./endpoints";
import { ResponseTypeRecord, CreateResponseTypePayload, UpdateResponseTypePayload } from "./types";

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
