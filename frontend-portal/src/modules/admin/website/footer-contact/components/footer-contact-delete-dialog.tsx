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
import { useFooterContactModalStore } from "../stores/useFooterContactModalStore";
import { useDeleteFooterContactMutation } from "../hooks";
import { AlertTriangle, Trash2 } from "lucide-react";

export function FooterContactDeleteDialog() {
  const { isDeleteOpen, deletingId, deletingName, closeDelete } = useFooterContactModalStore();
  const deleteMutation = useDeleteFooterContactMutation();

  const handleDelete = async () => {
    if (!deletingId) return;
    await deleteMutation.mutateAsync(deletingId);
    closeDelete();
  };

  return (
    <Dialog open={isDeleteOpen} onOpenChange={(open) => !open && closeDelete()}>
      <DialogContent className="max-w-md">
        <DialogHeader className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-destructive/10 text-destructive flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <DialogTitle className="text-lg font-bold">Delete Footer Contact</DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-foreground">
              {deletingName ?? "this record"}
            </span>{""}? <br /> This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-3 mt-1">
          <Button variant="outline" onClick={closeDelete} disabled={deleteMutation.isPending}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
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
