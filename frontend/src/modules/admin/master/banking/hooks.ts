import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { AEPS_BANK_API_ENDPOINTS } from "./endpoints";
import { AepsBankRecord, CreateAepsBankPayload, UpdateAepsBankPayload } from "./types";

export const aepsBankKeys = {
  all: ["aeps-bank"] as const,
  lists: () => [...aepsBankKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...aepsBankKeys.lists(), params] as const,
  details: () => [...aepsBankKeys.all, "detail"] as const,
  detail: (id: string) => [...aepsBankKeys.details(), id] as const,
};

export function useAepsBankListQuery() {
  return useApiQuery<AepsBankRecord[]>(
    aepsBankKeys.lists(),
    AEPS_BANK_API_ENDPOINTS.LIST
  );
}

export function useAepsBankDetailQuery(id?: string) {
  return useApiQuery<AepsBankRecord>(
    aepsBankKeys.detail(id!),
    AEPS_BANK_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateAepsBankMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<AepsBankRecord, Error, CreateAepsBankPayload>(
    AEPS_BANK_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("AEPS Bank created successfully!");
          void queryClient.invalidateQueries({ queryKey: aepsBankKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateAepsBankMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<AepsBankRecord, Error, UpdateAepsBankPayload>(
    (variables) => AEPS_BANK_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("AEPS Bank updated successfully!");
          void queryClient.invalidateQueries({ queryKey: aepsBankKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteAepsBankMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => AEPS_BANK_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("AEPS Bank deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: aepsBankKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
