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
  useResponseTypeModalStore,
  useResponseParamModalStore,
} from "../stores/useResponseTypeModalStore";
import {
  useResponseTypeDetailQuery,
  useDeleteResponseTypeMutation,
  useResponseParamDetailQuery,
  useDeleteResponseParamMutation,
} from "../hooks";
import { ResponseTypeForm } from "./response-type-form";
import { ResponseParamForm } from "./response-param-form";
import { FileCode2, Sliders, AlertTriangle, Trash2 } from "lucide-react";

// 1. Response Type Modal & Delete Dialog
export function ResponseTypeModal() {
  const { isOpen, mode, selectedId, selectedData, close } = useResponseTypeModalStore();
  const shouldFetch = mode === "edit" && Boolean(selectedId) && !selectedData;
  const { data: fetchedData, isLoading } = useResponseTypeDetailQuery(shouldFetch ? selectedId : undefined);
  const activeData = selectedData ?? fetchedData;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="max-w-md">
        <DialogHeader className="border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <FileCode2 className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">
                {mode === "create" ? "Add Response Type" : "Edit Response Type"}
              </DialogTitle>
              <DialogDescription className="text-xs">
                {mode === "create" ? "Configure supported API response formats." : "Update response format details."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {isLoading ? (
          <div className="p-8 text-center text-sm text-muted-foreground animate-pulse">Loading...</div>
        ) : (
          <ResponseTypeForm key={selectedId ?? "create-mode"} mode={mode} initialData={activeData} onSuccess={close} />
        )}
      </DialogContent>
    </Dialog>
  );
}

export function ResponseTypeDeleteDialog() {
  const { isDeleteOpen, deletingId, deletingName, closeDelete } = useResponseTypeModalStore();
  const deleteMutation = useDeleteResponseTypeMutation();

  return (
    <Dialog open={isDeleteOpen} onOpenChange={(open) => !open && closeDelete()}>
      <DialogContent className="max-w-md">
        <DialogHeader className="border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-destructive/10 text-destructive">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">Delete Response Type</DialogTitle>
              <DialogDescription className="text-xs">This action cannot be undone.</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-foreground">
            Are you sure you want to delete <span className="font-semibold text-destructive">{deletingName ?? "this response type"}</span>?
          </p>
        </div>

        <DialogFooter className="border-t border-border pt-4 flex items-center justify-end gap-3">
          <Button variant="outline" size="sm" onClick={closeDelete} disabled={deleteMutation.isPending}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={async () => {
              if (deletingId) {
                await deleteMutation.mutateAsync(deletingId);
                closeDelete();
              }
            }}
            disabled={deleteMutation.isPending}
            className="flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// 2. Response Parameter Modal & Delete Dialog
export function ResponseParamModal() {
  const { isOpen, mode, selectedId, selectedData, close } = useResponseParamModalStore();
  const shouldFetch = mode === "edit" && Boolean(selectedId) && !selectedData;
  const { data: fetchedData, isLoading } = useResponseParamDetailQuery(shouldFetch ? selectedId : undefined);
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
                {mode === "create" ? "Add Response Parameter(s)" : "Edit Response Parameter"}
              </DialogTitle>
              <DialogDescription className="text-xs">
                {mode === "create" ? "Add single or multiple response parameters." : "Update parameter configuration."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {isLoading ? (
          <div className="p-8 text-center text-sm text-muted-foreground animate-pulse">Loading...</div>
        ) : (
          <ResponseParamForm key={selectedId ?? "create-mode"} mode={mode} initialData={activeData} onSuccess={close} />
        )}
      </DialogContent>
    </Dialog>
  );
}

export function ResponseParamDeleteDialog() {
  const { isDeleteOpen, deletingId, deletingName, closeDelete } = useResponseParamModalStore();
  const deleteMutation = useDeleteResponseParamMutation();

  return (
    <Dialog open={isDeleteOpen} onOpenChange={(open) => !open && closeDelete()}>
      <DialogContent className="max-w-md">
        <DialogHeader className="border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-destructive/10 text-destructive">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">Delete Response Parameter</DialogTitle>
              <DialogDescription className="text-xs">This action cannot be undone.</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-foreground">
            Are you sure you want to delete parameter <span className="font-semibold text-destructive">{deletingName ?? "this item"}</span>?
          </p>
        </div>

        <DialogFooter className="border-t border-border pt-4 flex items-center justify-end gap-3">
          <Button variant="outline" size="sm" onClick={closeDelete} disabled={deleteMutation.isPending}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={async () => {
              if (deletingId) {
                await deleteMutation.mutateAsync(deletingId);
                closeDelete();
              }
            }}
            disabled={deleteMutation.isPending}
            className="flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
