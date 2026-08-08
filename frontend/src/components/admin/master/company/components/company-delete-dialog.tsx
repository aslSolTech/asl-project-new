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
import { useCompanyModalStore } from "@/stores/useCompanyModalStore";
import { useDeleteCompanyMutation } from "@/hooks/tanstackapi/company/useCompanyQueries";
import { AlertTriangle, Trash2 } from "lucide-react";

export function CompanyDeleteDialog() {
  const {
    isDeleteDialogOpen,
    deletingCompanyId,
    deletingCompanyName,
    closeDeleteDialog,
  } = useCompanyModalStore();

  const deleteMutation = useDeleteCompanyMutation();

  const handleDelete = async () => {
    if (!deletingCompanyId) return;
    await deleteMutation.mutateAsync(deletingCompanyId);
    closeDeleteDialog();
  };

  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={(open) => !open && closeDeleteDialog()}>
      <DialogContent className="max-w-md">
        <DialogHeader className="space-y-2">
          <div className="w-10 h-10 rounded-full bg-destructive/10 text-destructive flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <DialogTitle className="text-lg font-bold">Delete Company</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-semibold text-foreground">
              {deletingCompanyName ?? "this company"}
            </span>{" "}
            ? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2 sm:gap-0 mt-4">
          <Button
            variant="outline"
            onClick={closeDeleteDialog}
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
            <Trash2 className="w-4 h-4" />
            {deleteMutation.isPending ? "Deleting..." : "Delete Company"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
