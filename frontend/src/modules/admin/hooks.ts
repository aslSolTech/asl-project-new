import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiQuery, useApiMutation } from "@/hooks/useGenericApi";
import { COMPANY_API_ENDPOINTS } from "./endpoints";
import {
  CompanyRecord,
  CreateCompanyPayload,
  UpdateCompanyPayload,
} from "./types";

export const companyKeys = {
  all: ["companies"] as const,
  lists: () => [...companyKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...companyKeys.lists(), params] as const,
  details: () => [...companyKeys.all, "detail"] as const,
  detail: (id: string) => [...companyKeys.details(), id] as const,
};

export function useCompanyListQuery() {
  return useApiQuery<CompanyRecord[]>(
    companyKeys.lists(),
    COMPANY_API_ENDPOINTS.LIST
  );
}

export function useCompanyDetailQuery(id?: string) {
  return useApiQuery<CompanyRecord>(
    companyKeys.detail(id!),
    COMPANY_API_ENDPOINTS.DETAIL(id!),
    { options: { enabled: Boolean(id) } }
  );
}

export function useCreateCompanyMutation() {
  const queryClient = useQueryClient();

  return useApiMutation<CompanyRecord, Error, CreateCompanyPayload>(
    COMPANY_API_ENDPOINTS.CREATE,
    {
      method: "POST",
      options: {
        onSuccess: () => {
          toast.success("Company created successfully!");
          void queryClient.invalidateQueries({ queryKey: companyKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to create company");
        },
      },
    }
  );
}

export function useUpdateCompanyMutation() {
  const queryClient = useQueryClient();

  return useApiMutation<CompanyRecord, Error, UpdateCompanyPayload>(
    (variables) => COMPANY_API_ENDPOINTS.UPDATE(variables.id),
    {
      method: "PUT",
      options: {
        onSuccess: () => {
          toast.success("Company updated successfully!");
          void queryClient.invalidateQueries({ queryKey: companyKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update company");
        },
      },
    }
  );
}

export function useDeleteCompanyMutation() {
  const queryClient = useQueryClient();

  return useApiMutation<{ success: boolean; message?: string }, Error, string>(
    (id) => COMPANY_API_ENDPOINTS.DELETE(id),
    {
      method: "DELETE",
      options: {
        onSuccess: () => {
          toast.success("Company deleted successfully!");
          void queryClient.invalidateQueries({ queryKey: companyKeys.all });
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete company");
        },
      },
    }
  );
}
