import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { UPI_VERIFY_API_ENDPOINTS } from "./endpoints";
import { UpiVerifyRecord, CreateUpiVerifyPayload, UpdateUpiVerifyPayload } from "./types";

export const upiVerifyKeys = {
  all: ["upi-verify"] as const,
  lists: () => [...upiVerifyKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...upiVerifyKeys.lists(), params] as const,
  details: () => [...upiVerifyKeys.all, "detail"] as const,
  detail: (id: string) => [...upiVerifyKeys.details(), id] as const,
};

export function useUpiVerifyListQuery() {
  return useApiQuery<UpiVerifyRecord[]>(
    upiVerifyKeys.lists(),
    UPI_VERIFY_API_ENDPOINTS.LIST
  );
}

export function useUpiVerifyDetailQuery(id?: string) {
  return useApiQuery<UpiVerifyRecord>(
    upiVerifyKeys.detail(id!),
    UPI_VERIFY_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateUpiVerifyMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<UpiVerifyRecord, Error, CreateUpiVerifyPayload>(
    UPI_VERIFY_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("UPI Verify API created successfully!");
          void queryClient.invalidateQueries({ queryKey: upiVerifyKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateUpiVerifyMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<UpiVerifyRecord, Error, UpdateUpiVerifyPayload>(
    (variables) => UPI_VERIFY_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("UPI Verify API updated successfully!");
          void queryClient.invalidateQueries({ queryKey: upiVerifyKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteUpiVerifyMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => UPI_VERIFY_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("UPI Verify API deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: upiVerifyKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
