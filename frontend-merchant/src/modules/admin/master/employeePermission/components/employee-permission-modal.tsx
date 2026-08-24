"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useEmployeePermissionModalStore } from "../stores/useEmployeePermissionModalStore";
import { useEmployeePermissionDetailQuery } from "../hooks";
import { EmployeePermissionForm } from "./employee-permission-form";
import { Key } from "lucide-react";

export function EmployeePermissionModal() {
  const { isOpen, mode, selectedId, selectedData, close } = useEmployeePermissionModalStore();

  const shouldFetchDetail = mode === "edit" && Boolean(selectedId) && !selectedData;
  const { data: fetchedData, isLoading } = useEmployeePermissionDetailQuery(
    shouldFetchDetail ? selectedId : undefined
  );

  const activeData = selectedData ?? fetchedData;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="max-w-4xl">
        <DialogHeader className="border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">
                {mode === "create" ? "Assign Employee Permissions & Route Access" : "Edit Employee Permissions & Route Access"}
              </DialogTitle>
              <DialogDescription className="text-xs">
                {mode === "create"
                  ? "Select an active employee, grant specific module/route access, and configure write & delete privileges."
                  : "Update allowed routes, module privileges, and action permissions for this employee."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {isLoading ? (
          <div className="p-8 text-center text-sm text-muted-foreground animate-pulse">
            Loading employee permission configuration...
          </div>
        ) : (
          <EmployeePermissionForm
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
