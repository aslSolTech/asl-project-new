"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useNotificationTypeModalStore } from "../stores/useNotificationTypeModalStore";
import { useNotificationTypeDetailQuery } from "../hooks";
import { NotificationTypeForm } from "./notification-type-form";
import { Tag } from "lucide-react";

export function NotificationTypeModal() {
  const { isOpen, mode, selectedId, selectedData, close } = useNotificationTypeModalStore();

  const shouldFetchDetail = mode === "edit" && Boolean(selectedId) && !selectedData;
  const { data: fetchedData, isLoading } = useNotificationTypeDetailQuery(
    shouldFetchDetail ? selectedId : undefined
  );

  const activeData = selectedData ?? fetchedData;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="max-w-xl">
        <DialogHeader className="border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">
                {mode === "create" ? "Add Notification Type" : "Edit Notification Type"}
              </DialogTitle>
              <DialogDescription className="text-xs">
                {mode === "create"
                  ? "Define a new category type for broadcasts (e.g. Promotional, System Alert)."
                  : "Update category name, slug code, badge color, and status."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {isLoading ? (
          <div className="p-8 text-center text-sm text-muted-foreground animate-pulse">
            Loading type configuration...
          </div>
        ) : (
          <NotificationTypeForm
            key={selectedId ?? "create-type-mode"}
            mode={mode}
            initialData={activeData}
            onSuccess={close}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
