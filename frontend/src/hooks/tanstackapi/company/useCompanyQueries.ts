import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { companyApi } from "@/modules/admin/services";
import {
  CreateCompanyPayload,
  UpdateCompanyPayload,
} from "@/modules/admin/types";

export const companyKeys = {
  all: ["companies"] as const,
  lists: () => [...companyKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) => [...companyKeys.lists(), params] as const,
  details: () => [...companyKeys.all, "detail"] as const,
  detail: (id: string) => [...companyKeys.details(), id] as const,
};

export function useCompanyListQuery() {
  return useQuery({
    queryKey: companyKeys.lists(),
    queryFn: () => companyApi.getCompanies(),
  });
}

export function useCompanyDetailQuery(id?: string) {
  return useQuery({
    queryKey: companyKeys.detail(id!),
    queryFn: () => companyApi.getCompany(id!),
    enabled: Boolean(id),
  });
}

export function useCreateCompanyMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateCompanyPayload) => companyApi.createCompany(payload),
    onSuccess: () => {
      toast.success("Company created successfully!");
      void queryClient.invalidateQueries({ queryKey: companyKeys.all });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create company");
    },
  });
}

export function useUpdateCompanyMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateCompanyPayload) => companyApi.updateCompany(payload),
    onSuccess: () => {
      toast.success("Company updated successfully!");
      void queryClient.invalidateQueries({ queryKey: companyKeys.all });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update company");
    },
  });
}

export function useDeleteCompanyMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => companyApi.deleteCompany(id),
    onSuccess: () => {
      toast.success("Company deleted successfully!");
      void queryClient.invalidateQueries({ queryKey: companyKeys.all });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete company");
    },
  });
}
