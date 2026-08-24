import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { GENDER_API_ENDPOINTS } from "./endpoints";
import { GenderRecord, CreateGenderPayload, UpdateGenderPayload } from "./types";

export const genderKeys = {
  all: ["settings-gender"] as const,
  lists: () => [...genderKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...genderKeys.lists(), params] as const,
  details: () => [...genderKeys.all, "detail"] as const,
  detail: (id: string) => [...genderKeys.details(), id] as const,
};

export function useGenderListQuery() {
  return useApiQuery<GenderRecord[]>(
    genderKeys.lists(),
    GENDER_API_ENDPOINTS.LIST
  );
}

export function useGenderDetailQuery(id?: string) {
  return useApiQuery<GenderRecord>(
    genderKeys.detail(id!),
    GENDER_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateGenderMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<GenderRecord, Error, CreateGenderPayload>(
    GENDER_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Gender created successfully!");
          void queryClient.invalidateQueries({ queryKey: genderKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create gender");
        },
      },
    }
  );
}

export function useUpdateGenderMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<GenderRecord, Error, UpdateGenderPayload>(
    (variables) => GENDER_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Gender updated successfully!");
          void queryClient.invalidateQueries({ queryKey: genderKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update gender");
        },
      },
    }
  );
}

export function useDeleteGenderMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => GENDER_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Gender deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: genderKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete gender");
        },
      },
    }
  );
}
