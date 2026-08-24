import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { FOOTER_LINKS_API_ENDPOINTS } from "./endpoints";
import { FooterLinksRecord, CreateFooterLinksPayload, UpdateFooterLinksPayload } from "./types";

export const footerLinksKeys = {
  all: ["footer-links"] as const,
  lists: () => [...footerLinksKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...footerLinksKeys.lists(), params] as const,
  details: () => [...footerLinksKeys.all, "detail"] as const,
  detail: (id: string) => [...footerLinksKeys.details(), id] as const,
};

export function useFooterLinksListQuery() {
  return useApiQuery<FooterLinksRecord[]>(
    footerLinksKeys.lists(),
    FOOTER_LINKS_API_ENDPOINTS.LIST
  );
}

export function useFooterLinksDetailQuery(id?: string) {
  return useApiQuery<FooterLinksRecord>(
    footerLinksKeys.detail(id!),
    FOOTER_LINKS_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateFooterLinksMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<FooterLinksRecord, Error, CreateFooterLinksPayload>(
    FOOTER_LINKS_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Footer Links created successfully!");
          void queryClient.invalidateQueries({ queryKey: footerLinksKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateFooterLinksMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<FooterLinksRecord, Error, UpdateFooterLinksPayload>(
    (variables) => FOOTER_LINKS_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Footer Links updated successfully!");
          void queryClient.invalidateQueries({ queryKey: footerLinksKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteFooterLinksMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => FOOTER_LINKS_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Footer Links deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: footerLinksKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
