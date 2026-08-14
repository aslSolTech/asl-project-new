import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useTanstackApiHook";
import { BALANCE_API_ENDPOINTS, WALLET_TYPE_API_ENDPOINTS } from "./endpoints";
import {
  WalletBalanceRecord,
  CreateWalletBalancePayload,
  UpdateWalletBalancePayload,
  WalletTypeRecord,
  CreateWalletTypePayload,
  UpdateWalletTypePayload,
} from "./types";

// ========================================== WALLET BALANCE HOOKS & KEYS ==========================================
export const balanceKeys = {
  all: ["balance"] as const,
  lists: () => [...balanceKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...balanceKeys.lists(), params] as const,
  details: () => [...balanceKeys.all, "detail"] as const,
  detail: (id: string) => [...balanceKeys.details(), id] as const,
};

export function useBalanceListQuery() {
  return useApiQuery<WalletBalanceRecord[]>(
    balanceKeys.lists(),
    BALANCE_API_ENDPOINTS.LIST
  );
}

export function useBalanceDetailQuery(id?: string) {
  return useApiQuery<WalletBalanceRecord>(
    balanceKeys.detail(id!),
    BALANCE_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateBalanceMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<WalletBalanceRecord, Error, CreateWalletBalancePayload>(
    BALANCE_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Wallet Balance created successfully!");
          void queryClient.invalidateQueries({ queryKey: balanceKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateBalanceMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<WalletBalanceRecord, Error, UpdateWalletBalancePayload>(
    (variables) => BALANCE_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Wallet Balance updated successfully!");
          void queryClient.invalidateQueries({ queryKey: balanceKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteBalanceMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => BALANCE_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Wallet Balance deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: balanceKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}

// =========================================== WALLET TYPE HOOKS & KEYS ===========================================

export const walletTypeKeys = {
  all: ["walletType"] as const,
  lists: () => [...walletTypeKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...walletTypeKeys.lists(), params] as const,
  details: () => [...walletTypeKeys.all, "detail"] as const,
  detail: (id: string) => [...walletTypeKeys.details(), id] as const,
};

export function useWalletTypeListQuery() {
  return useApiQuery<WalletTypeRecord[]>(
    walletTypeKeys.lists(),
    WALLET_TYPE_API_ENDPOINTS.LIST
  );
}

export function useWalletTypeDetailQuery(id?: string) {
  return useApiQuery<WalletTypeRecord>(
    walletTypeKeys.detail(id!),
    WALLET_TYPE_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateWalletTypeMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<WalletTypeRecord, Error, CreateWalletTypePayload>(
    WALLET_TYPE_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Wallet Type created successfully!");
          void queryClient.invalidateQueries({ queryKey: walletTypeKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create");
        },
      },
    }
  );
}

export function useUpdateWalletTypeMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<WalletTypeRecord, Error, UpdateWalletTypePayload>(
    (variables) => WALLET_TYPE_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Wallet Type updated successfully!");
          void queryClient.invalidateQueries({ queryKey: walletTypeKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update");
        },
      },
    }
  );
}

export function useDeleteWalletTypeMutation() {
  const queryClient = useQueryClient();
  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => WALLET_TYPE_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Wallet Type deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: walletTypeKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete");
        },
      },
    }
  );
}
