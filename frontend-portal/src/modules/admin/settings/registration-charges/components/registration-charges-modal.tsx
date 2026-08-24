"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useRegistrationChargesModalStore } from "../stores/useRegistrationChargesModalStore";
import { useRegistrationChargesDetailQuery } from "../hooks";
import { RegistrationChargesForm } from "./registration-charges-form";
import { CreditCard } from "lucide-react";

export function RegistrationChargesModal() {
  const { isOpen, mode, selectedId, selectedData, close } = useRegistrationChargesModalStore();

  const shouldFetchDetail = mode === "edit" && Boolean(selectedId) && !selectedData;
  const { data: fetchedData, isLoading } = useRegistrationChargesDetailQuery(
    shouldFetchDetail ? selectedId : undefined
  );

  const activeData = selectedData ?? fetchedData;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="max-w-md">
        <DialogHeader className="border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">
                {mode === "create" ? "Add Registration Charges" : "Edit Registration Charges"}
              </DialogTitle>
              <DialogDescription className="text-xs">
                {mode === "create" ? "Configure registration fee for different user tiers." : "Update registration charge details."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {isLoading ? (
          <div className="p-8 text-center text-sm text-muted-foreground animate-pulse">
            Loading...
          </div>
        ) : (
          <RegistrationChargesForm
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
