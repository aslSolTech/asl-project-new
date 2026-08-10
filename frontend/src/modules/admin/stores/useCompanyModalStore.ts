import { create } from "zustand";
import { CompanyRecord } from "../types";

export type CompanyModalMode = "create" | "edit";

interface CompanyModalState {
  isCompanyModalOpen: boolean;
  companyModalMode: CompanyModalMode;
  selectedCompanyId?: string;
  selectedCompany?: CompanyRecord | null;

  isDeleteDialogOpen: boolean;
  deletingCompanyId?: string;
  deletingCompanyName?: string;

  openCreateCompanyModal: () => void;
  openEditCompanyModal: (company: CompanyRecord) => void;
  closeCompanyModal: () => void;

  openDeleteDialog: (id: string, name: string) => void;
  closeDeleteDialog: () => void;
}

export const useCompanyModalStore = create<CompanyModalState>((set) => ({
  isCompanyModalOpen: false,
  companyModalMode: "create",
  selectedCompanyId: undefined,
  selectedCompany: null,

  isDeleteDialogOpen: false,
  deletingCompanyId: undefined,
  deletingCompanyName: undefined,

  openCreateCompanyModal: () =>
    set({
      isCompanyModalOpen: true,
      companyModalMode: "create",
      selectedCompanyId: undefined,
      selectedCompany: null,
    }),

  openEditCompanyModal: (company: CompanyRecord) =>
    set({
      isCompanyModalOpen: true,
      companyModalMode: "edit",
      selectedCompanyId: company.id,
      selectedCompany: company,
    }),

  closeCompanyModal: () =>
    set({
      isCompanyModalOpen: false,
      selectedCompanyId: undefined,
      selectedCompany: null,
    }),

  openDeleteDialog: (id: string, name: string) =>
    set({
      isDeleteDialogOpen: true,
      deletingCompanyId: id,
      deletingCompanyName: name,
    }),

  closeDeleteDialog: () =>
    set({
      isDeleteDialogOpen: false,
      deletingCompanyId: undefined,
      deletingCompanyName: undefined,
    }),
}));
