"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useApiTypeModalStore } from "../stores/useApiTypeModalStore";
import { useApiTypeDetailQuery } from "../hooks";
import { ApiTypeForm } from "./api-type-form";
import { Server } from "lucide-react";

export function ApiTypeModal() {
  const { isOpen, mode, selectedId, selectedData, close } = useApiTypeModalStore();

  const shouldFetchDetail = mode === "edit" && Boolean(selectedId) && !selectedData;
  const { data: fetchedData, isLoading } = useApiTypeDetailQuery(
    shouldFetchDetail ? selectedId : undefined
  );

  const activeData = selectedData ?? fetchedData;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="max-w-xl">
        <DialogHeader className="border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">
                {mode === "create" ? "Add API Type" : "Edit API Type"}
              </DialogTitle>
              <DialogDescription className="text-xs">
                {mode === "create"
                  ? "Configure API Type parameters, wallet mapping, and PDF settings."
                  : "Update API Type configurations."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {isLoading ? (
          <div className="p-8 text-center text-sm text-muted-foreground animate-pulse">
            Loading...
          </div>
        ) : (
          <ApiTypeForm
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
