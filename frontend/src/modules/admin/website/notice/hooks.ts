import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { NOTICE_API_ENDPOINTS } from "./endpoints";
import { NoticeRecord, CreateNoticePayload, UpdateNoticePayload } from "./types";

export const noticeKeys = {
  all: ["notice"] as const,
  lists: () => [...noticeKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...noticeKeys.lists(), params] as const,
  details: () => [...noticeKeys.all, "detail"] as const,
  detail: (id: string) => [...noticeKeys.details(), id] as const,
};

export function useNoticeListQuery() {
  return useApiQuery<NoticeRecord[]>(
    noticeKeys.lists(),
    NOTICE_API_ENDPOINTS.LIST
  );
}

export function useNoticeDetailQuery(id?: string) {
  return useApiQuery<NoticeRecord>(
    noticeKeys.detail(id!),
    NOTICE_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateNoticeMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<NoticeRecord, Error, CreateNoticePayload>(
    NOTICE_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Notice Board created successfully!");
          void queryClient.invalidateQueries({ queryKey: noticeKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateNoticeMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<NoticeRecord, Error, UpdateNoticePayload>(
    (variables) => NOTICE_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Notice Board updated successfully!");
          void queryClient.invalidateQueries({ queryKey: noticeKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteNoticeMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => NOTICE_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Notice Board deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: noticeKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
