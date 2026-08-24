import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { HEADER_API_ENDPOINTS } from "./endpoints";
import { HeaderRecord, CreateHeaderPayload, UpdateHeaderPayload } from "./types";

export const headerKeys = {
  all: ["header"] as const,
  lists: () => [...headerKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...headerKeys.lists(), params] as const,
  details: () => [...headerKeys.all, "detail"] as const,
  detail: (id: string) => [...headerKeys.details(), id] as const,
};

export function useHeaderListQuery() {
  return useApiQuery<HeaderRecord[]>(
    headerKeys.lists(),
    HEADER_API_ENDPOINTS.LIST
  );
}

export function useHeaderDetailQuery(id?: string) {
  return useApiQuery<HeaderRecord>(
    headerKeys.detail(id!),
    HEADER_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateHeaderMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<HeaderRecord, Error, CreateHeaderPayload>(
    HEADER_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Header created successfully!");
          void queryClient.invalidateQueries({ queryKey: headerKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateHeaderMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<HeaderRecord, Error, UpdateHeaderPayload>(
    (variables) => HEADER_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Header updated successfully!");
          void queryClient.invalidateQueries({ queryKey: headerKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteHeaderMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => HEADER_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Header deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: headerKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
