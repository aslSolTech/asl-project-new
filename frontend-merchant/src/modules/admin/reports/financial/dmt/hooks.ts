import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { DMT_API_ENDPOINTS } from "./endpoints";
import { DmtRecord, CreateDmtPayload, UpdateDmtPayload } from "./types";

export const dmtKeys = {
  all: ["dmt"] as const,
  lists: () => [...dmtKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...dmtKeys.lists(), params] as const,
  details: () => [...dmtKeys.all, "detail"] as const,
  detail: (id: string) => [...dmtKeys.details(), id] as const,
};

export function useDmtListQuery() {
  return useApiQuery<DmtRecord[]>(
    dmtKeys.lists(),
    DMT_API_ENDPOINTS.LIST
  );
}

export function useDmtDetailQuery(id?: string) {
  return useApiQuery<DmtRecord>(
    dmtKeys.detail(id!),
    DMT_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateDmtMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<DmtRecord, Error, CreateDmtPayload>(
    DMT_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("DMT Report created successfully!");
          void queryClient.invalidateQueries({ queryKey: dmtKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateDmtMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<DmtRecord, Error, UpdateDmtPayload>(
    (variables) => DMT_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("DMT Report updated successfully!");
          void queryClient.invalidateQueries({ queryKey: dmtKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteDmtMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => DMT_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("DMT Report deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: dmtKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
