"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ServiceApiSharedForm } from "../../shared/components/service-api-form";
import { useBankVerifyModalStore } from "../stores/useBankVerifyModalStore";
import {
  useBankVerifyDetailQuery,
  useCreateBankVerifyMutation,
  useUpdateBankVerifyMutation,
} from "../hooks";
import { Route } from "lucide-react";

export function BankVerifyModal() {
  const { isOpen, mode, selectedId, selectedData, close } = useBankVerifyModalStore();

  const shouldFetchDetail = mode === "edit" && Boolean(selectedId) && !selectedData;
  const { data: fetchedData, isLoading } = useBankVerifyDetailQuery(
    shouldFetchDetail ? selectedId : undefined
  );

  const createMutation = useCreateBankVerifyMutation();
  const updateMutation = useUpdateBankVerifyMutation();
  const isPending = createMutation.isPending || updateMutation.isPending;

  const activeData = selectedData ?? fetchedData;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="max-w-xl">
        <DialogHeader className="border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <Route className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">
                {mode === "create"
                  ? "Add New Bank Account Verify API"
                  : "Edit Bank Account Verify API"}
              </DialogTitle>
              <DialogDescription className="text-xs">
                {mode === "create"
                  ? "Enter details to create a new bank account verify api."
                  : "Update details for the selected bank account verify api."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {isLoading ? (
          <div className="p-8 text-center text-sm text-muted-foreground animate-pulse">
            Loading...
          </div>
        ) : (
          <ServiceApiSharedForm
            key={selectedId ?? "create-mode"}
            mode={mode}
            initialData={activeData}
            defaultApiType="Verification"
            providerLabel="API / Provider Name"
            providerPlaceholder="Enter Provider name (e.g. Karza, Cashfree, Signzy)..."
            isPending={isPending}
            onSubmit={async (data) => {
              if (mode === "create") {
                await createMutation.mutateAsync(data);
              } else if (mode === "edit" && selectedId) {
                await updateMutation.mutateAsync({
                  id: selectedId,
                  ...data,
                });
              }
            }}
            onSuccess={close}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
