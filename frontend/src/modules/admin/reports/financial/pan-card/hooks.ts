import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { PAN_CARD_API_ENDPOINTS } from "./endpoints";
import { PanCardRecord, CreatePanCardPayload, UpdatePanCardPayload } from "./types";

export const panCardKeys = {
  all: ["pan-card"] as const,
  lists: () => [...panCardKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...panCardKeys.lists(), params] as const,
  details: () => [...panCardKeys.all, "detail"] as const,
  detail: (id: string) => [...panCardKeys.details(), id] as const,
};

export function usePanCardListQuery() {
  return useApiQuery<PanCardRecord[]>(
    panCardKeys.lists(),
    PAN_CARD_API_ENDPOINTS.LIST
  );
}

export function usePanCardDetailQuery(id?: string) {
  return useApiQuery<PanCardRecord>(
    panCardKeys.detail(id!),
    PAN_CARD_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreatePanCardMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<PanCardRecord, Error, CreatePanCardPayload>(
    PAN_CARD_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("PAN Card Report created successfully!");
          void queryClient.invalidateQueries({ queryKey: panCardKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdatePanCardMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<PanCardRecord, Error, UpdatePanCardPayload>(
    (variables) => PAN_CARD_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("PAN Card Report updated successfully!");
          void queryClient.invalidateQueries({ queryKey: panCardKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeletePanCardMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => PAN_CARD_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("PAN Card Report deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: panCardKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
