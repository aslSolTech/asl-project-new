"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useOperatorChargesCodeModalStore } from "../stores/useOperatorChargesCodeModalStore";
import { useOperatorCodeDetailQuery } from "../hooks";
import { OperatorCodeRecord } from "../types";
import { OperatorCodeForm } from "./operator-charges-code-form";
import { QrCode } from "lucide-react";

export function OperatorCodeModal() {
  const { isOpen, mode, selectedId, selectedData, initialDefaults, close } = useOperatorChargesCodeModalStore();

  const shouldFetchDetail = mode === "edit" && Boolean(selectedId) && !selectedData;
  const { data: fetchedData, isLoading } = useOperatorCodeDetailQuery(
    shouldFetchDetail ? selectedId : undefined
  );

  const activeData = (selectedData ?? fetchedData) || (mode === "create" ? (initialDefaults as OperatorCodeRecord) : null);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="max-w-3xl">
        <DialogHeader className="border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">
                {mode === "create" ? "Add Operator Commission & Code" : "Edit Operator Commission & Code"}
              </DialogTitle>
              <DialogDescription className="text-xs">
                {mode === "create"
                  ? "Configure operator code, connection type, commission rate, and GST for the selected API."
                  : "Update operator charges code and commission parameters."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {isLoading ? (
          <div className="p-8 text-center text-sm text-muted-foreground animate-pulse">
            Loading configuration...
          </div>
        ) : (
          <OperatorCodeForm
            key={selectedId ?? (initialDefaults?.apiId ? `create-${initialDefaults.apiId}-${initialDefaults.operatorTypeId}` : "create-mode")}
            mode={mode}
            initialData={activeData}
            onSuccess={close}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

