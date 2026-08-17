"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  useRequestTypeModalStore,
  useRequestParamModalStore,
  useParamStatusModalStore,
} from "../stores/useRequestTypeModalStores";
import {
  useRequestTypeDetailQuery,
  useDeleteRequestTypeMutation,
  useRequestParamDetailQuery,
  useDeleteRequestParamMutation,
  useParamStatusDetailQuery,
  useDeleteParamStatusMutation,
} from "../hooks";
import { RequestTypeForm } from "./request-type-form";
import { RequestParamForm } from "./request-param-form";
import { ParamStatusForm } from "./param-status-form";
import { GitPullRequest, Sliders, CheckCircle, AlertTriangle, Trash2 } from "lucide-react";

// 1. Request Type Modal & Delete Dialog
export function RequestTypeModal() {
  const { isOpen, mode, selectedId, selectedData, close } = useRequestTypeModalStore();
  const shouldFetch = mode === "edit" && Boolean(selectedId) && !selectedData;
  const { data: fetchedData, isLoading } = useRequestTypeDetailQuery(shouldFetch ? selectedId : undefined);
  const activeData = selectedData ?? fetchedData;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader className="border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <GitPullRequest className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">
                {mode === "create" ? "Add Request Type(s)" : "Edit Request Type"}
              </DialogTitle>
              <DialogDescription className="text-xs">
                {mode === "create" ? "Add single or multiple API request types." : "Update request type details."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {isLoading ? (
          <div className="p-8 text-center text-sm text-muted-foreground animate-pulse">Loading...</div>
        ) : (
          <RequestTypeForm key={selectedId ?? "create-mode"} mode={mode} initialData={activeData} onSuccess={close} />
        )}
      </DialogContent>
    </Dialog>
  );
}

export function RequestTypeDeleteDialog() {
  const { isDeleteOpen, deletingId, deletingName, closeDelete } = useRequestTypeModalStore();
  const deleteMutation = useDeleteRequestTypeMutation();

  const handleDelete = async () => {
    if (!deletingId) return;
    await deleteMutation.mutateAsync(deletingId);
    closeDelete();
  };

  return (
    <Dialog open={isDeleteOpen} onOpenChange={(open) => !open && closeDelete()}>
      <DialogContent className="max-w-md">
        <DialogHeader className="space-y-2">
          <div className="w-10 h-10 rounded-full bg-destructive/10 text-destructive flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <DialogTitle className="text-lg font-bold">Delete Request Type</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <span className="font-semibold text-foreground">&quot;{deletingName ?? "this item"}&quot;</span>? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-3 mt-4">
          <Button variant="outline" onClick={closeDelete} disabled={deleteMutation.isPending}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={deleteMutation.isPending} className="flex items-center gap-2">
            <Trash2 className="w-4 h-4" />
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// 2. Request Parameter Modal & Delete Dialog
export function RequestParamModal() {
  const { isOpen, mode, selectedId, selectedData, close } = useRequestParamModalStore();
  const shouldFetch = mode === "edit" && Boolean(selectedId) && !selectedData;
  const { data: fetchedData, isLoading } = useRequestParamDetailQuery(shouldFetch ? selectedId : undefined);
  const activeData = selectedData ?? fetchedData;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader className="border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">
                {mode === "create" ? "Add Request Parameter(s)" : "Edit Request Parameter"}
              </DialogTitle>
              <DialogDescription className="text-xs">
                {mode === "create" ? "Add single or multiple request parameters." : "Update request parameter details."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {isLoading ? (
          <div className="p-8 text-center text-sm text-muted-foreground animate-pulse">Loading...</div>
        ) : (
          <RequestParamForm key={selectedId ?? "create-mode"} mode={mode} initialData={activeData} onSuccess={close} />
        )}
      </DialogContent>
    </Dialog>
  );
}

export function RequestParamDeleteDialog() {
  const { isDeleteOpen, deletingId, deletingName, closeDelete } = useRequestParamModalStore();
  const deleteMutation = useDeleteRequestParamMutation();

  const handleDelete = async () => {
    if (!deletingId) return;
    await deleteMutation.mutateAsync(deletingId);
    closeDelete();
  };

  return (
    <Dialog open={isDeleteOpen} onOpenChange={(open) => !open && closeDelete()}>
      <DialogContent className="max-w-md">
        <DialogHeader className="space-y-2">
          <div className="w-10 h-10 rounded-full bg-destructive/10 text-destructive flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <DialogTitle className="text-lg font-bold">Delete Parameter</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete parameter <span className="font-semibold text-foreground">&quot;{deletingName ?? "this parameter"}&quot;</span>? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-3 mt-4">
          <Button variant="outline" onClick={closeDelete} disabled={deleteMutation.isPending}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={deleteMutation.isPending} className="flex items-center gap-2">
            <Trash2 className="w-4 h-4" />
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// 3. Parameter Status Modal & Delete Dialog
export function ParamStatusModal() {
  const { isOpen, mode, selectedId, selectedData, close } = useParamStatusModalStore();
  const shouldFetch = mode === "edit" && Boolean(selectedId) && !selectedData;
  const { data: fetchedData, isLoading } = useParamStatusDetailQuery(shouldFetch ? selectedId : undefined);
  const activeData = selectedData ?? fetchedData;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader className="border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">
                {mode === "create" ? "Add Parameter Status(es)" : "Edit Parameter Status"}
              </DialogTitle>
              <DialogDescription className="text-xs">
                {mode === "create" ? "Add single or multiple parameter statuses." : "Update parameter status details."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {isLoading ? (
          <div className="p-8 text-center text-sm text-muted-foreground animate-pulse">Loading...</div>
        ) : (
          <ParamStatusForm key={selectedId ?? "create-mode"} mode={mode} initialData={activeData} onSuccess={close} />
        )}
      </DialogContent>
    </Dialog>
  );
}

export function ParamStatusDeleteDialog() {
  const { isDeleteOpen, deletingId, deletingName, closeDelete } = useParamStatusModalStore();
  const deleteMutation = useDeleteParamStatusMutation();

  const handleDelete = async () => {
    if (!deletingId) return;
    await deleteMutation.mutateAsync(deletingId);
    closeDelete();
  };

  return (
    <Dialog open={isDeleteOpen} onOpenChange={(open) => !open && closeDelete()}>
      <DialogContent className="max-w-md">
        <DialogHeader className="space-y-2">
          <div className="w-10 h-10 rounded-full bg-destructive/10 text-destructive flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <DialogTitle className="text-lg font-bold">Delete Status Option</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <span className="font-semibold text-foreground">&quot;{deletingName ?? "this status"}&quot;</span>? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-3 mt-4">
          <Button variant="outline" onClick={closeDelete} disabled={deleteMutation.isPending}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={deleteMutation.isPending} className="flex items-center gap-2">
            <Trash2 className="w-4 h-4" />
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
