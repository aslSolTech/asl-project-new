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
import { useCompanyModalStore } from "@/modules/admin/master/company/stores/useCompanyModalStore";
import { useDeleteCompanyMutation } from "../hooks";
import { AlertTriangle, Trash2 } from "lucide-react";

export function CompanyDeleteDialog() {
  const {
    isDeleteOpen,
    deletingId,
    deletingName,
    closeDelete: closeDeleteDialog,
  } = useCompanyModalStore();

  const deleteMutation = useDeleteCompanyMutation();

  const handleDelete = async () => {
    if (!deletingId) return;
    await deleteMutation.mutateAsync(deletingId);
    closeDeleteDialog();
  };

  return (
    <Dialog open={isDeleteOpen} onOpenChange={(open) => !open && closeDeleteDialog()}>
      <DialogContent className="max-w-md">
        <DialogHeader className="flex flex-col items-center space-y-3">
          <div className="w-10 h-10 rounded-full bg-destructive/10 text-destructive flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <DialogTitle className="text-lg font-bold">Delete Company</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-semibold text-foreground">
              {deletingName ?? "this company"}
            </span>{" "}
            ? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={closeDeleteDialog}
            disabled={deleteMutation.isPending}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="flex items-center gap-2">
            <Trash2 className="w-4 h-4" />
            {deleteMutation.isPending ? "Deleting..." : "Delete Company"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
