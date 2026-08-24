"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useOperatorRegisterModalStore } from "../stores/useOperatorRegisterModalStore";
import { useOperatorRegisterDetailQuery } from "../hooks";
import { OperatorRegisterForm } from "./operator-register-form";
import { Radio } from "lucide-react";

export function OperatorRegisterModal() {
  const { isOpen, mode, selectedId, selectedData, close } = useOperatorRegisterModalStore();

  const shouldFetchDetail = mode === "edit" && Boolean(selectedId) && !selectedData;
  const { data: fetchedData, isLoading } = useOperatorRegisterDetailQuery(
    shouldFetchDetail ? selectedId : undefined
  );

  const activeData = selectedData ?? fetchedData;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader className="border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">
                {mode === "create" ? "Register Operator" : "Edit Operator"}
              </DialogTitle>
              <DialogDescription className="text-xs">
                {mode === "create"
                  ? "Enter operator details, parameters, and fetch configuration."
                  : "Update details for the selected operator."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {isLoading ? (
          <div className="p-8 text-center text-sm text-muted-foreground animate-pulse">
            Loading operator details...
          </div>
        ) : (
          <OperatorRegisterForm
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
