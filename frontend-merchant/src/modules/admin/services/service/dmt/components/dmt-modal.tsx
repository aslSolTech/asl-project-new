"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ServiceApiSharedForm } from "../../shared/components/service-api-form";
import { useDmtModalStore } from "../stores/useDmtModalStore";
import {
  useDmtDetailQuery,
  useCreateDmtMutation,
  useUpdateDmtMutation,
} from "../hooks";
import { Route } from "lucide-react";

export function DmtModal() {
  const { isOpen, mode, selectedId, selectedData, close } = useDmtModalStore();

  const shouldFetchDetail = mode === "edit" && Boolean(selectedId) && !selectedData;
  const { data: fetchedData, isLoading } = useDmtDetailQuery(
    shouldFetchDetail ? selectedId : undefined
  );

  const createMutation = useCreateDmtMutation();
  const updateMutation = useUpdateDmtMutation();
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
                {mode === "create" ? "Add New DMT API" : "Edit DMT API"}
              </DialogTitle>
              <DialogDescription className="text-xs">
                {mode === "create"
                  ? "Enter details to create a new dmt api."
                  : "Update details for the selected dmt api."}
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
            defaultApiType="DMT (Money Transfer)"
            providerLabel="API / Provider / Bank Name"
            providerPlaceholder="Enter Provider or Bank name (e.g. ICICI Bank, Airtel Payments)..."
            isPending={isPending}
            onSubmit={async (data) => {
              if (mode === "create") {
                await createMutation.mutateAsync({
                  ...data,
                  bank: data.providerName,
                });
              } else if (mode === "edit" && selectedId) {
                await updateMutation.mutateAsync({
                  id: selectedId,
                  ...data,
                  bank: data.providerName,
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
