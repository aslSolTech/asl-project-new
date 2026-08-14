"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useCompanyModalStore } from "@/modules/admin/master/company/stores/useCompanyModalStore";
import { useCompanyDetailQuery } from "../hooks";
import { CompanyForm } from "./company-form";
import { Building2 } from "lucide-react";

export function CompanyModal() {
  const {
    isOpen,
    mode,
    selectedId,
    selectedData,
    close,
  } = useCompanyModalStore();

  // If in edit mode and selectedData isn't in store, fetch details via query
  const shouldFetchDetail =
    mode === "edit" && Boolean(selectedId) && !selectedData;

  const { data: fetchedCompany, isLoading: isDetailLoading } = useCompanyDetailQuery(
    shouldFetchDetail ? selectedId : undefined
  );

  const activeCompanyData = selectedData ?? fetchedCompany;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="max-w-7xl max-h-[90vh] flex flex-col p-0 overflow-hidden">
        <DialogHeader className="border-b border-border px-6 py-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">
                {mode === "create" ? "Add New Company" : "Edit Company Profile"}
              </DialogTitle>
              <DialogDescription className="text-xs">
                {mode === "create"
                  ? "Enter the details to set up a new company."
                  : "Update the details for the selected company."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {isDetailLoading ? (
            <div className="p-12 text-center text-sm text-muted-foreground animate-pulse">
              Loading company details...
            </div>
          ) : (
            <CompanyForm
              key={selectedId ?? "create-mode"}
              mode={mode}
              initialData={activeCompanyData}
              onSuccess={close}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
