import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { FOOTER_API_ENDPOINTS } from "./endpoints";
import { FooterRecord, CreateFooterPayload, UpdateFooterPayload } from "./types";

export const footerKeys = {
  all: ["footer"] as const,
  lists: () => [...footerKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...footerKeys.lists(), params] as const,
  details: () => [...footerKeys.all, "detail"] as const,
  detail: (id: string) => [...footerKeys.details(), id] as const,
};

export function useFooterListQuery() {
  return useApiQuery<FooterRecord[]>(
    footerKeys.lists(),
    FOOTER_API_ENDPOINTS.LIST
  );
}

export function useFooterDetailQuery(id?: string) {
  return useApiQuery<FooterRecord>(
    footerKeys.detail(id!),
    FOOTER_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateFooterMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<FooterRecord, Error, CreateFooterPayload>(
    FOOTER_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Footer created successfully!");
          void queryClient.invalidateQueries({ queryKey: footerKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateFooterMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<FooterRecord, Error, UpdateFooterPayload>(
    (variables) => FOOTER_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Footer updated successfully!");
          void queryClient.invalidateQueries({ queryKey: footerKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteFooterMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => FOOTER_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Footer deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: footerKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
