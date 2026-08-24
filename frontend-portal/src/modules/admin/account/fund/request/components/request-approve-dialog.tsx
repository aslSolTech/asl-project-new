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
import { useApproveRequestMutation } from "../hooks";
import { CheckCircle2, Loader2 } from "lucide-react";

export function RequestApproveDialog() {
  const { isApproveOpen, approvingRecord, closeApprove } = useRequestModalStore();
  const approveMutation = useApproveRequestMutation();

  const handleApprove = async () => {
    if (!approvingRecord) return;
    try {
      await approveMutation.mutateAsync({ id: approvingRecord.id });
      closeApprove();
    } catch {
      // Handled in mutation onError
    }
  };

  return (
    <Dialog open={isApproveOpen} onOpenChange={(open) => !open && closeApprove()}>
      <DialogContent className="max-w-md">
        <DialogHeader className="flex flex-col items-center space-y-1">
          <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <DialogTitle className="text-lg font-bold">Confirm Fund Transfer Approval</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
            Are you sure you want to approve and confirm transfer of fund to{" "}
            <span className="font-semibold text-foreground">
              {approvingRecord?.userName ?? "this user"}
            </span>
            ?
            {approvingRecord?.requestAmount && (
              <span className="block mt-2 font-medium text-foreground bg-muted/60 p-2 rounded-lg border border-border/60">
                Amount: <span className="text-emerald-600 font-bold">₹{approvingRecord.requestAmount}</span>
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2  mt-4">
          <Button
            variant="outline"
            onClick={closeApprove}
            disabled={approveMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            onClick={handleApprove}
            disabled={approveMutation.isPending}
            className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
          >
            {approveMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Approving...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Approve & Transfer
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
