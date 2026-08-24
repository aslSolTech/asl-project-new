"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { usePrivilegeModalStore } from "../stores/usePrivilageModalStore";
import { usePrivilegeDetailQuery } from "../hooks";
import { PrivilegeForm } from "./privilege-form";
import { ShieldCheck } from "lucide-react";

export function PrivilegeModal() {
  const { isOpen, mode, selectedId, selectedData, close } = usePrivilegeModalStore();

  const shouldFetchDetail = mode === "edit" && Boolean(selectedId) && !selectedData;
  const { data: fetchedData, isLoading } = usePrivilegeDetailQuery(
    shouldFetchDetail ? selectedId : undefined
  );

  const activeData = selectedData ?? fetchedData;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">
                Configure User API Privileges
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Enable or disable specific API type features (Recharge, DMT, AEPS, etc.) for this user account.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {isLoading ? (
          <div className="p-8 text-center text-sm text-muted-foreground animate-pulse">
            Loading privilege details...
          </div>
        ) : (
          <PrivilegeForm
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
