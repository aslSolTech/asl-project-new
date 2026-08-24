"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useMerchantApiModalStore } from "../stores/useMerchantApiModalStore";
import { useMerchantApiDetailQuery } from "../hooks";
import { MerchantApiForm } from "./merchant-api-form";
import { Plug } from "lucide-react";

export function MerchantApiModal() {
  const { isOpen, mode, selectedId, selectedData, close } = useMerchantApiModalStore();

  const shouldFetchDetail = mode === "edit" && Boolean(selectedId) && !selectedData;
  const { data: fetchedData, isLoading } = useMerchantApiDetailQuery(
    shouldFetchDetail ? selectedId : undefined
  );

  const activeData = selectedData ?? fetchedData;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <Plug className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">
                {mode === "create" ? "Register Merchant Retailer" : "Edit Retailer KYC & API Profile"}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                {mode === "create"
                  ? "Register a new retailer under an API Partner with KYC details and callback credentials."
                  : "Update retailer KYC documentation, verification status, and webhook configurations."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {isLoading ? (
          <div className="p-8 text-center text-sm text-muted-foreground animate-pulse">
            Loading retailer details...
          </div>
        ) : (
          <MerchantApiForm
            key={selectedId ?? "create-mode"}
            mode={mode}
            initialData={activeData}
            onSuccess={close}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
