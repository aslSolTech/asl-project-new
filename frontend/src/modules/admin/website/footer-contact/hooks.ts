import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { FOOTER_CONTACT_API_ENDPOINTS } from "./endpoints";
import { FooterContactRecord, CreateFooterContactPayload, UpdateFooterContactPayload } from "./types";

export const footerContactKeys = {
  all: ["footer-contact"] as const,
  lists: () => [...footerContactKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...footerContactKeys.lists(), params] as const,
  details: () => [...footerContactKeys.all, "detail"] as const,
  detail: (id: string) => [...footerContactKeys.details(), id] as const,
};

export function useFooterContactListQuery() {
  return useApiQuery<FooterContactRecord[]>(
    footerContactKeys.lists(),
    FOOTER_CONTACT_API_ENDPOINTS.LIST
  );
}

export function useFooterContactDetailQuery(id?: string) {
  return useApiQuery<FooterContactRecord>(
    footerContactKeys.detail(id!),
    FOOTER_CONTACT_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateFooterContactMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<FooterContactRecord, Error, CreateFooterContactPayload>(
    FOOTER_CONTACT_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Footer Contact created successfully!");
          void queryClient.invalidateQueries({ queryKey: footerContactKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateFooterContactMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<FooterContactRecord, Error, UpdateFooterContactPayload>(
    (variables) => FOOTER_CONTACT_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Footer Contact updated successfully!");
          void queryClient.invalidateQueries({ queryKey: footerContactKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteFooterContactMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => FOOTER_CONTACT_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Footer Contact deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: footerContactKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
