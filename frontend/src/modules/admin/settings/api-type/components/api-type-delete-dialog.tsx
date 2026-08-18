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
import { useApiTypeModalStore } from "../stores/useApiTypeModalStore";
import { useDeleteApiTypeMutation } from "../hooks";
import { AlertTriangle, Trash2 } from "lucide-react";

export function ApiTypeDeleteDialog() {
  const { isDeleteOpen, deletingId, deletingName, closeDelete } = useApiTypeModalStore();
  const deleteMutation = useDeleteApiTypeMutation();

  return (
    <Dialog open={isDeleteOpen} onOpenChange={(open) => !open && closeDelete()}>
      <DialogContent className="max-w-md">
        <DialogHeader className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-destructive/10 text-destructive">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">Delete API Type</DialogTitle>
              <DialogDescription className="text-center">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-foreground">
              {deletingName ?? "this record"}
            </span>{""}? <br /> This action cannot be undone.
          </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-foreground">
            Are you sure you want to delete API Type <span className="font-semibold text-destructive">{deletingName ?? "this item"}</span>?
          </p>
        </div>

        <DialogFooter className="gap-3 mt-1">
          <Button
            variant="outline"
            size="sm"
            onClick={closeDelete}
            disabled={deleteMutation.isPending}
          >
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
