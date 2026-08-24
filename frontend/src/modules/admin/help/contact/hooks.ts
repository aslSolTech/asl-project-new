import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { CONTACT_API_ENDPOINTS } from "./endpoints";
import { ContactRecord, CreateContactPayload, UpdateContactPayload } from "./types";

export const contactKeys = {
  all: ["contact"] as const,
  lists: () => [...contactKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...contactKeys.lists(), params] as const,
  details: () => [...contactKeys.all, "detail"] as const,
  detail: (id: string) => [...contactKeys.details(), id] as const,
};

export function useContactListQuery() {
  return useApiQuery<ContactRecord[]>(
    contactKeys.lists(),
    CONTACT_API_ENDPOINTS.LIST
  );
}

export function useContactDetailQuery(id?: string) {
  return useApiQuery<ContactRecord>(
    contactKeys.detail(id!),
    CONTACT_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateContactMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<ContactRecord, Error, CreateContactPayload>(
    CONTACT_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Contact Support Info created successfully!");
          void queryClient.invalidateQueries({ queryKey: contactKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateContactMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<ContactRecord, Error, UpdateContactPayload>(
    (variables) => CONTACT_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Contact Support Info updated successfully!");
          void queryClient.invalidateQueries({ queryKey: contactKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteContactMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => CONTACT_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Contact Support Info deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: contactKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
