import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { ARTICLES_API_ENDPOINTS } from "./endpoints";
import { ArticlesRecord, CreateArticlesPayload, UpdateArticlesPayload } from "./types";

export const articlesKeys = {
  all: ["articles"] as const,
  lists: () => [...articlesKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...articlesKeys.lists(), params] as const,
  details: () => [...articlesKeys.all, "detail"] as const,
  detail: (id: string) => [...articlesKeys.details(), id] as const,
};

export function useArticlesListQuery() {
  return useApiQuery<ArticlesRecord[]>(
    articlesKeys.lists(),
    ARTICLES_API_ENDPOINTS.LIST
  );
}

export function useArticlesDetailQuery(id?: string) {
  return useApiQuery<ArticlesRecord>(
    articlesKeys.detail(id!),
    ARTICLES_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateArticlesMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<ArticlesRecord, Error, CreateArticlesPayload>(
    ARTICLES_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Help Articles created successfully!");
          void queryClient.invalidateQueries({ queryKey: articlesKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateArticlesMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<ArticlesRecord, Error, UpdateArticlesPayload>(
    (variables) => ARTICLES_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Help Articles updated successfully!");
          void queryClient.invalidateQueries({ queryKey: articlesKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteArticlesMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => ARTICLES_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Help Articles deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: articlesKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
