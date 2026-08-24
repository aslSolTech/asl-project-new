"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useUserTypeModalStore } from "../stores/useUserTypeModalStore";
import { useUserTypeDetailQuery } from "../hooks";
import { UserTypeForm } from "./user-type-form";
import { UserCheck } from "lucide-react";

export function UserTypeModal() {
  const { isOpen, mode, selectedId, selectedData, close } = useUserTypeModalStore();

  const shouldFetchDetail = mode === "edit" && Boolean(selectedId) && !selectedData;
  const { data: fetchedData, isLoading } = useUserTypeDetailQuery(
    shouldFetchDetail ? selectedId : undefined
  );

  const activeData = selectedData ?? fetchedData;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="max-w-md">
        <DialogHeader className="border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">
                {mode === "create" ? "Add User Type" : "Edit User Type"}
              </DialogTitle>
              <DialogDescription className="text-xs">
                {mode === "create" ? "Create a new role/user type with custom slug identifier." : "Update user type configuration."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {isLoading ? (
          <div className="p-8 text-center text-sm text-muted-foreground animate-pulse">
            Loading...
          </div>
        ) : (
          <UserTypeForm
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
