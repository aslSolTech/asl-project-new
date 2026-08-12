import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { RANDOM_API_ENDPOINTS } from "./endpoints";
import { RandomRecord, CreateRandomPayload, UpdateRandomPayload } from "./types";

export const randomKeys = {
  all: ["random"] as const,
  lists: () => [...randomKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...randomKeys.lists(), params] as const,
  details: () => [...randomKeys.all, "detail"] as const,
  detail: (id: string) => [...randomKeys.details(), id] as const,
};

export function useRandomListQuery() {
  return useApiQuery<RandomRecord[]>(
    randomKeys.lists(),
    RANDOM_API_ENDPOINTS.LIST
  );
}

export function useRandomDetailQuery(id?: string) {
  return useApiQuery<RandomRecord>(
    randomKeys.detail(id!),
    RANDOM_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateRandomMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<RandomRecord, Error, CreateRandomPayload>(
    RANDOM_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Random API created successfully!");
          void queryClient.invalidateQueries({ queryKey: randomKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateRandomMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<RandomRecord, Error, UpdateRandomPayload>(
    (variables) => RANDOM_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Random API updated successfully!");
          void queryClient.invalidateQueries({ queryKey: randomKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteRandomMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => RANDOM_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Random API deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: randomKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
