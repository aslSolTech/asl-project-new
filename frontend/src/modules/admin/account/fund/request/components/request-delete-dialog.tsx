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
import { useRequestModalStore } from "../stores/useRequestModalStore";
import { useDeleteRequestMutation } from "../hooks";
import { AlertTriangle, Trash2, Loader2 } from "lucide-react";

export function RequestDeleteDialog() {
  const { isDeleteOpen, deletingRecord, closeDelete } = useRequestModalStore();
  const deleteMutation = useDeleteRequestMutation();

  const handleDelete = async () => {
    if (!deletingRecord) return;
    try {
      await deleteMutation.mutateAsync(deletingRecord.id);
      closeDelete();
    } catch {
      // Handled in onError
    }
  };

  return (
    <Dialog open={isDeleteOpen} onOpenChange={(open) => !open && closeDelete()}>
      <DialogContent className="max-w-md">
        <DialogHeader className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <DialogTitle className="text-lg font-bold">Delete Fund Request</DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-foreground">
              {deletingName ?? "this record"}
            </span>{""}? <br /> This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-3 mt-1">
          <Button
            variant="outline"
            onClick={closeDelete}
            disabled={deleteMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="flex items-center gap-2"
          >
            {deleteMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                Delete
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
