import { axiosClient } from "@/lib/axios/axios-client";
import { API_ENDPOINTS } from "@/lib/axios/endpoints";
import {
  CompanyRecord,
  CreateCompanyPayload,
  UpdateCompanyPayload,
  CompanyListResponse,
  CompanyDetailResponse,
} from "./types";

export const companyApi = {
  getCompanies: async (): Promise<CompanyRecord[]> => {
    const { data } = await axiosClient.get<CompanyListResponse | CompanyRecord[]>(
      API_ENDPOINTS.COMPANY.LIST
    );
    if (Array.isArray(data)) {
      return data;
    }
    return data.data ?? [];
  },

  getCompany: async (id: string): Promise<CompanyRecord> => {
    const { data } = await axiosClient.get<CompanyDetailResponse | CompanyRecord>(
      API_ENDPOINTS.COMPANY.DETAIL(id)
    );
    if ("data" in data && data.data) {
      return data.data;
    }
    return data as CompanyRecord;
  },

  createCompany: async (payload: CreateCompanyPayload): Promise<CompanyRecord> => {
    const { data } = await axiosClient.post<CompanyDetailResponse | CompanyRecord>(
      API_ENDPOINTS.COMPANY.CREATE,
      payload
    );
    if ("data" in data && data.data) {
      return data.data;
    }
    return data as CompanyRecord;
  },

  updateCompany: async ({ id, ...payload }: UpdateCompanyPayload): Promise<CompanyRecord> => {
    const { data } = await axiosClient.put<CompanyDetailResponse | CompanyRecord>(
      API_ENDPOINTS.COMPANY.UPDATE(id),
      payload
    );
    if ("data" in data && data.data) {
      return data.data;
    }
    return data as CompanyRecord;
  },

  deleteCompany: async (id: string): Promise<{ success: boolean; message?: string }> => {
    const { data } = await axiosClient.delete<{ success: boolean; message?: string }>(
      API_ENDPOINTS.COMPANY.DELETE(id)
    );
    return data;
  },
};
