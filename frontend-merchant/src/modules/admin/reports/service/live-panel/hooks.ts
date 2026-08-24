import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { LIVE_PANEL_API_ENDPOINTS } from "./endpoints";
import { LivePanelRecord, CreateLivePanelPayload, UpdateLivePanelPayload } from "./types";

export const livePanelKeys = {
  all: ["live-panel"] as const,
  lists: () => [...livePanelKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...livePanelKeys.lists(), params] as const,
  details: () => [...livePanelKeys.all, "detail"] as const,
  detail: (id: string) => [...livePanelKeys.details(), id] as const,
};

export function useLivePanelListQuery() {
  return useApiQuery<LivePanelRecord[]>(
    livePanelKeys.lists(),
    LIVE_PANEL_API_ENDPOINTS.LIST
  );
}

export function useLivePanelDetailQuery(id?: string) {
  return useApiQuery<LivePanelRecord>(
    livePanelKeys.detail(id!),
    LIVE_PANEL_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateLivePanelMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<LivePanelRecord, Error, CreateLivePanelPayload>(
    LIVE_PANEL_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Live Panel created successfully!");
          void queryClient.invalidateQueries({ queryKey: livePanelKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateLivePanelMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<LivePanelRecord, Error, UpdateLivePanelPayload>(
    (variables) => LIVE_PANEL_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Live Panel updated successfully!");
          void queryClient.invalidateQueries({ queryKey: livePanelKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteLivePanelMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => LIVE_PANEL_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Live Panel deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: livePanelKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
