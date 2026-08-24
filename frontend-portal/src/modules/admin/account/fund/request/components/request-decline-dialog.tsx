"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useRequestModalStore } from "../stores/useRequestModalStore";
import { useDeclineRequestMutation } from "../hooks";
import { XCircle, Loader2 } from "lucide-react";

export function RequestDeclineDialog() {
  const { isDeclineOpen, decliningRecord, closeDecline } = useRequestModalStore();
  const declineMutation = useDeclineRequestMutation();
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  const handleDecline = async () => {
    if (!decliningRecord) return;
    if (!reason.trim()) {
      setError("Please provide a reason for declining this request.");
      return;
    }
    setError("");
    try {
      await declineMutation.mutateAsync({
        id: decliningRecord.id,
        reason: reason.trim(),
      });
      setReason("");
      closeDecline();
    } catch {
      // Handled in onError
    }
  };

  const handleClose = () => {
    setReason("");
    setError("");
    closeDecline();
  };

  return (
    <Dialog open={isDeclineOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader className="flex flex-col items-center space-y-1">
          <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-600 flex items-center justify-center">
            <XCircle className="w-6 h-6" />
          </div>
          <DialogTitle className="text-lg font-bold">Decline Fund Request</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
            Please enter the reason for declining the fund request for{" "}
            <span className="font-semibold text-foreground">
              {decliningRecord?.userName ?? "this user"}
            </span>{" "}
            (Amount: ₹{decliningRecord?.requestAmount ?? "-"}).
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 py-2">
          <Label htmlFor="decline-reason" className="text-xs font-semibold">
            Decline Reason / Remark <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="decline-reason"
            placeholder="Enter the reason why this fund request is being declined..."
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              if (error) setError("");
            }}
            rows={3}
            className="resize-none text-sm"
          />
          {error && <p className="text-xs text-destructive font-medium">{error}</p>}
        </div>

        <DialogFooter className="gap-2 mt-2">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={declineMutation.isPending}
          >
            Close
          </Button>
          <Button
            variant="destructive"
            onClick={handleDecline}
            disabled={declineMutation.isPending}
            className="flex items-center gap-2"
          >
            {declineMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Declining...
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4" />
                 Decline
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
