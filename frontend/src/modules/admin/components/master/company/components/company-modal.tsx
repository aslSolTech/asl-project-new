"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useCompanyModalStore } from "@/modules/admin/stores/useCompanyModalStore";
import { useCompanyDetailQuery } from "@/hooks/tanstackapi/company/useCompanyQueries";
import { CompanyForm } from "./company-form";
import { Building2 } from "lucide-react";

export function CompanyModal() {
  const {
    isCompanyModalOpen,
    companyModalMode,
    selectedCompanyId,
    selectedCompany,
    closeCompanyModal,
  } = useCompanyModalStore();

  // If in edit mode and selectedCompany isn't in store, fetch details via query
  const shouldFetchDetail =
    companyModalMode === "edit" && Boolean(selectedCompanyId) && !selectedCompany;

  const { data: fetchedCompany, isLoading: isDetailLoading } = useCompanyDetailQuery(
    shouldFetchDetail ? selectedCompanyId : undefined
  );

  const activeCompanyData = selectedCompany ?? fetchedCompany;

  return (
    <Dialog open={isCompanyModalOpen} onOpenChange={(open) => !open && closeCompanyModal()}>
      <DialogContent className="max-w-3xl">
        <DialogHeader className="border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">
                {companyModalMode === "create" ? "Add New Company" : "Edit Company Profile"}
              </DialogTitle>
              <DialogDescription className="text-xs">
                {companyModalMode === "create"
                  ? "Enter master details to set up a new company organization."
                  : "Update master details for the selected company organization."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {isDetailLoading ? (
          <div className="p-8 text-center text-sm text-muted-foreground animate-pulse">
            Loading company details...
          </div>
        ) : (
          <CompanyForm
            key={selectedCompanyId ?? "create-mode"}
            mode={companyModalMode}
            initialData={activeCompanyData}
            onSuccess={closeCompanyModal}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
