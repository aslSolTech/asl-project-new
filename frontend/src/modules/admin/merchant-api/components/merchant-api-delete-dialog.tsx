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
import { useMerchantApiModalStore } from "../stores/useMerchantApiModalStore";
import { useDeleteMerchantApiMutation } from "../hooks";
import { AlertTriangle, Trash2 } from "lucide-react";

export function MerchantApiDeleteDialog() {
  const { isDeleteOpen, deletingId, deletingName, closeDelete } = useMerchantApiModalStore();
  const deleteMutation = useDeleteMerchantApiMutation();

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
          <DialogTitle className="text-lg font-bold">Delete Retailer Account</DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-foreground">
              {deletingName ?? "this record"}
            </span>? <br /> This will remove their KYC records and terminal access permanently.
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
            {deleteMutation.isPending ? "Deleting..." : "Delete Retailer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
