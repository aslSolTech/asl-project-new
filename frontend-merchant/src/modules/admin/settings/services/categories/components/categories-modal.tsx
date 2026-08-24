"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useCategoriesModalStore } from "../stores/useCategoriesModalStore";
import { useCategoriesDetailQuery } from "../hooks";
import { CategoriesForm } from "./categories-form";
import { Layers } from "lucide-react";

export function CategoriesModal() {
  const { isOpen, mode, selectedId, selectedData, close } = useCategoriesModalStore();

  const shouldFetchDetail = mode === "edit" && Boolean(selectedId) && !selectedData;
  const { data: fetchedData, isLoading } = useCategoriesDetailQuery(
    shouldFetchDetail ? selectedId : undefined
  );

  const activeData = selectedData ?? fetchedData;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="max-w-lg">
        <DialogHeader className="border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">
                {mode === "create" ? "Add Service Type / Category" : "Edit Service Type"}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                {mode === "create"
                  ? "Create a new service type/category that can be assigned to individual services."
                  : "Update service category name and active status."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {isLoading ? (
          <div className="p-8 text-center text-sm text-muted-foreground animate-pulse">
            Loading...
          </div>
        ) : (
          <CategoriesForm
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
