import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { FEEDBACK_API_ENDPOINTS } from "./endpoints";
import { FeedbackRecord, CreateFeedbackPayload, UpdateFeedbackPayload } from "./types";

export const feedbackKeys = {
  all: ["feedback"] as const,
  lists: () => [...feedbackKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...feedbackKeys.lists(), params] as const,
  details: () => [...feedbackKeys.all, "detail"] as const,
  detail: (id: string) => [...feedbackKeys.details(), id] as const,
};

export function useFeedbackListQuery() {
  return useApiQuery<FeedbackRecord[]>(
    feedbackKeys.lists(),
    FEEDBACK_API_ENDPOINTS.LIST
  );
}

export function useFeedbackDetailQuery(id?: string) {
  return useApiQuery<FeedbackRecord>(
    feedbackKeys.detail(id!),
    FEEDBACK_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateFeedbackMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<FeedbackRecord, Error, CreateFeedbackPayload>(
    FEEDBACK_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Feedback List created successfully!");
          void queryClient.invalidateQueries({ queryKey: feedbackKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateFeedbackMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<FeedbackRecord, Error, UpdateFeedbackPayload>(
    (variables) => FEEDBACK_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Feedback List updated successfully!");
          void queryClient.invalidateQueries({ queryKey: feedbackKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteFeedbackMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => FEEDBACK_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Feedback List deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: feedbackKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
