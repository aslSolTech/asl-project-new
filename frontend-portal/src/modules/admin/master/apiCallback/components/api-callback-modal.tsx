"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useApiCallbackModalStore } from "../stores/useApiCallbackModalStore";
import { useApiCallbackDetailQuery } from "../hooks";
import { ApiCallbackForm } from "./api-callback-form";
import { Webhook } from "lucide-react";

export function ApiCallbackModal() {
  const { isOpen, mode, selectedId, selectedData, close } = useApiCallbackModalStore();

  const shouldFetchDetail = mode === "edit" && Boolean(selectedId) && !selectedData;
  const { data: fetchedData, isLoading } = useApiCallbackDetailQuery(
    shouldFetchDetail ? selectedId : undefined
  );

  const activeData = selectedData ?? fetchedData;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="max-w-3xl">
        <DialogHeader className="border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <Webhook className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">
                {mode === "create" ? "Add" : "Edit"} Callback URL APIs
              </DialogTitle>
              <DialogDescription className="text-xs">
                {mode === "create" ? "Enter details to configure a new callback URL API." : "Update details for the selected callback URL API."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {isLoading ? (
          <div className="p-8 text-center text-sm text-muted-foreground animate-pulse">
            Loading...
          </div>
        ) : (
          <ApiCallbackForm
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

