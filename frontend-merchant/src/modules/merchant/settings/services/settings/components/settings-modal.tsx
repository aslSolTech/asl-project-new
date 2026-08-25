"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useSettingsModalStore } from "../stores/useSettingsModalStore";
import { useSettingsDetailQuery } from "../hooks";
import { SettingsForm } from "./settings-form";
import { Sliders } from "lucide-react";

export function SettingsModal() {
  const { isOpen, mode, selectedId, selectedData, close } = useSettingsModalStore();

  const shouldFetchDetail = mode === "edit" && Boolean(selectedId) && !selectedData;
  const { data: fetchedData, isLoading } = useSettingsDetailQuery(
    shouldFetchDetail ? selectedId : undefined
  );

  const activeData = selectedData ?? fetchedData;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">
                {mode === "create" ? "Add Service Setting" : "Edit Service Setting"}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                {mode === "create"
                  ? "Configure and register a new service with custom icon, category type, link, and order."
                  : "Update service configuration, category assignment, order, and status."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {isLoading ? (
          <div className="p-8 text-center text-sm text-muted-foreground animate-pulse">
            Loading service details...
          </div>
        ) : (
          <SettingsForm
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
