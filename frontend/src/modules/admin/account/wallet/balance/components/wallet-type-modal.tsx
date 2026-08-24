"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useWalletTypeModalStore } from "../stores/useWalletTypeModalStore";
import { WalletTypeForm } from "./wallet-type-form";
import { Settings } from "lucide-react";

export function WalletTypeModal() {
  const { isOpen, mode, selectedId, selectedData, close } = useWalletTypeModalStore();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader className="border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">
                {mode === "create" ? "Add Wallet Type" : "Edit Wallet Type"}
              </DialogTitle>
              <DialogDescription className="text-xs">
                {mode === "create" ? "Enter details to create a new wallet type." : "Update the details for the selected wallet type."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <WalletTypeForm
          key={selectedId ?? "create-mode"}
          mode={mode}
          initialData={selectedData}
          onSuccess={close}
        />
      </DialogContent>
    </Dialog>
  );
}
