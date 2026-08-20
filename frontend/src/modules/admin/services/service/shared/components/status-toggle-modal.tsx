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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound, ShieldAlert, CheckCircle, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface SecretKeyModalProps {
  readonly isOpen: boolean;
  readonly title?: string;
  readonly serviceName?: string;
  readonly targetStatus: "active" | "inactive";
  readonly onConfirm: (secretKey: string) => Promise<void> | void;
  readonly onClose: () => void;
  readonly isLoading?: boolean;
}

export function StatusSecretKeyModal({
  isOpen,
  title,
  serviceName,
  targetStatus,
  onConfirm,
  onClose,
  isLoading = false,
}: SecretKeyModalProps) {
  const [secretKey, setSecretKey] = useState("");
  const [error, setError] = useState<string | null>(null);

  const isActivating = targetStatus === "active";

  const handleClose = () => {
    setSecretKey("");
    setError(null);
    onClose();
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!secretKey.trim()) {
      setError("Please enter your secret key");
      return;
    }
    setError(null);
    try {
      await onConfirm(secretKey);
      setSecretKey("");
      toast.success(`Successfully ${isActivating ? "activated" : "deactivated"} ${serviceName || "service"}`);
      handleClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Invalid secret key or authorization failed";
      setError(msg);
    }
  };

  const dialogTitle = title || `${isActivating ? "Activate" : "Deactivate"} API Configuration`;
  const confirmActionLabel = isActivating ? "Activate" : "Deactivate";
  const submitButtonText = isLoading ? "Verifying..." : `Confirm ${confirmActionLabel}`;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader className="flex flex-col items-center gap-2">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isActivating
                ? "bg-emerald-500/10 text-emerald-500"
                : "bg-amber-500/10 text-amber-500"
            }`}
          >
            {isActivating ? (
              <CheckCircle className="w-6 h-6" />
            ) : (
              <ShieldAlert className="w-6 h-6" />
            )}
          </div>
          <DialogTitle className="text-lg font-bold text-center">
            {dialogTitle}
          </DialogTitle>
          <DialogDescription className="text-center text-xs sm:text-sm">
            You are changing status to{" "}
            <span
              className={`font-bold uppercase ${
                isActivating ? "text-emerald-500" : "text-amber-500"
              }`}
            >
              {targetStatus}
            </span>{" "}
            for{" "}
            <span className="font-semibold text-foreground">
              {serviceName || "this API"}
            </span>.
            {" "}Please enter your secret key to authorize this action.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="secretKey" className="text-sm font-medium flex items-center gap-1.5">
              <KeyRound className="w-4 h-4 text-muted-foreground" />
              Admin Secret Key <span className="text-destructive">*</span>
            </Label>
            <Input
              id="secretKey"
              type="password"
              placeholder="Enter secret key / PIN..."
              value={secretKey}
              onChange={(e) => {
                setSecretKey(e.target.value);
                if (error) setError(null);
              }}
              autoFocus
              className={error ? "border-destructive focus-visible:ring-destructive" : ""}
            />
            {error && (
              <p className="text-xs text-destructive flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                {error}
              </p>
            )}
          </div>

          <DialogFooter className="gap-2 sm:gap-0 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant={isActivating ? "default" : "destructive"}
              disabled={isLoading || !secretKey.trim()}
              className="gap-2 font-semibold cursor-pointer"
            >
              <KeyRound className="w-4 h-4" />
              {submitButtonText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
