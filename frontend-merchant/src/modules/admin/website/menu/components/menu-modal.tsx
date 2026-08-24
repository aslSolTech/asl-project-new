"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useMenuModalStore } from "../stores/useMenuModalStore";
import { useMenuDetailQuery } from "../hooks";
import { MenuForm } from "./menu-form";
import { Globe } from "lucide-react";

export function MenuModal() {
  const { isOpen, mode, selectedId, selectedData, close } = useMenuModalStore();

  const shouldFetchDetail = mode === "edit" && Boolean(selectedId) && !selectedData;
  const { data: fetchedData, isLoading } = useMenuDetailQuery(
    shouldFetchDetail ? selectedId : undefined
  );

  const activeData = selectedData ?? fetchedData;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="max-w-xl">
        <DialogHeader className="border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">
                {mode === "create" ? "Add New Menu" : "Edit Menu"}
              </DialogTitle>
              <DialogDescription className="text-xs">
                {mode === "create" ? "Enter details to create a new menu." : "Update details for the selected menu."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {isLoading ? (
          <div className="p-8 text-center text-sm text-muted-foreground animate-pulse">
            Loading...
          </div>
        ) : (
          <MenuForm
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
