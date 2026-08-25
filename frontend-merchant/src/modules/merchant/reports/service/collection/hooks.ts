import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { COLLECTION_API_ENDPOINTS } from "./endpoints";
import { CollectionRecord, CreateCollectionPayload, UpdateCollectionPayload } from "./types";

export const collectionKeys = {
  all: ["collection"] as const,
  lists: () => [...collectionKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...collectionKeys.lists(), params] as const,
  details: () => [...collectionKeys.all, "detail"] as const,
  detail: (id: string) => [...collectionKeys.details(), id] as const,
};

export function useCollectionListQuery() {
  return useApiQuery<CollectionRecord[]>(
    collectionKeys.lists(),
    COLLECTION_API_ENDPOINTS.LIST
  );
}

export function useCollectionDetailQuery(id?: string) {
  return useApiQuery<CollectionRecord>(
    collectionKeys.detail(id!),
    COLLECTION_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateCollectionMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<CollectionRecord, Error, CreateCollectionPayload>(
    COLLECTION_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Collection Report created successfully!");
          void queryClient.invalidateQueries({ queryKey: collectionKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateCollectionMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<CollectionRecord, Error, UpdateCollectionPayload>(
    (variables) => COLLECTION_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Collection Report updated successfully!");
          void queryClient.invalidateQueries({ queryKey: collectionKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteCollectionMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => COLLECTION_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Collection Report deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: collectionKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
