"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useTdsModalStore } from "../stores/useTdsModalStore";
import { useTdsDetailQuery } from "../hooks";
import { TdsForm } from "./tds-form";
import { FileText } from "lucide-react";

export function TdsModal() {
  const { isOpen, mode, selectedId, selectedData, close } = useTdsModalStore();

  const shouldFetchDetail = mode === "edit" && Boolean(selectedId) && !selectedData;
  const { data: fetchedData, isLoading } = useTdsDetailQuery(
    shouldFetchDetail ? selectedId : undefined
  );

  const activeData = selectedData ?? fetchedData;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="max-w-xl">
        <DialogHeader className="border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">
                {mode === "create" ? "Add New TDS Statement" : "Edit TDS Statement"}
              </DialogTitle>
              <DialogDescription className="text-xs">
                {mode === "create" ? "Enter details to create a new tds statement." : "Update details for the selected tds statement."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {isLoading ? (
          <div className="p-8 text-center text-sm text-muted-foreground animate-pulse">
            Loading...
          </div>
        ) : (
          <TdsForm
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
