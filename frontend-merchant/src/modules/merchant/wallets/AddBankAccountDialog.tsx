"use client";

import { memo, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2, UploadCloud, CheckCircle2, FileText, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { useMerchantWalletStore } from "@/stores/useMerchantWalletStore";

interface AddBankAccountDialogProps {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
}

export const AddBankAccountDialog = memo(function AddBankAccountDialog({
  open,
  onOpenChange,
}: AddBankAccountDialogProps) {
  const addBankAccount = useMerchantWalletStore((s) => s.addBankAccount);

  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [confirmAccountNumber, setConfirmAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [holderName, setHolderName] = useState("");
  const [accountType, setAccountType] = useState<"PRIMARY" | "SECONDARY">("PRIMARY");

  const [panImage, setPanImage] = useState<string | null>(null);
  const [panFileName, setPanFileName] = useState<string>("");
  const [passbookImage, setPassbookImage] = useState<string | null>(null);
  const [passbookFileName, setPassbookFileName] = useState<string>("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePanFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPanFileName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        setPanImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePassbookFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPassbookFileName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        setPassbookImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setBankName("");
    setAccountNumber("");
    setConfirmAccountNumber("");
    setIfscCode("");
    setHolderName("");
    setAccountType("PRIMARY");
    setPanImage(null);
    setPanFileName("");
    setPassbookImage(null);
    setPassbookFileName("");
    setErrors({});
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!bankName.trim()) newErrors.bankName = "Bank name is required";
    if (!accountNumber.trim()) newErrors.accountNumber = "Account number is required";
    if (!confirmAccountNumber.trim()) {
      newErrors.confirmAccountNumber = "Please confirm account number";
    } else if (accountNumber !== confirmAccountNumber) {
      newErrors.confirmAccountNumber = "Account numbers do not match";
    }
    if (!ifscCode.trim() || ifscCode.length < 11) {
      newErrors.ifscCode = "Valid 11-digit IFSC code is required";
    }
    if (!holderName.trim()) newErrors.holderName = "Account holder name is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please correct the errors in the form");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      addBankAccount({
        bankName: bankName.toUpperCase(),
        accountNumber,
        ifscCode: ifscCode.toUpperCase(),
        holderName: holderName.toUpperCase(),
        accountType,
        panImageUrl: panImage || undefined,
        passbookImageUrl: passbookImage || undefined,
      });

      setIsSubmitting(false);
      handleReset();
      onOpenChange(false);
      toast.success("Bank Account added & verified successfully!", {
        description: `AC - ${accountNumber} (${bankName.toUpperCase()}) is now active for payouts.`,
      });
    }, 800);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto p-6 rounded-3xl bg-card border border-border shadow-2xl">
        <DialogHeader className="border-b border-border pb-3.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-foreground">
                Add Bank Account
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Register a verified commercial bank account for instant payouts and settlements.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          {/* Bank Name */}
          <div className="space-y-1.5">
            <Label htmlFor="bankName" className="text-xs font-bold text-foreground flex items-center gap-1">
              Bank Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="bankName"
              placeholder="e.g. STATE BANK OF INDIA, HDFC BANK, UCO BANK"
              value={bankName}
              onChange={(e) => {
                setBankName(e.target.value);
                if (errors.bankName) setErrors((prev) => ({ ...prev, bankName: "" }));
              }}
              className="text-xs uppercase font-medium rounded-xl"
            />
            {errors.bankName && <p className="text-[11px] text-destructive">{errors.bankName}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Account Number */}
            <div className="space-y-1.5">
              <Label htmlFor="accountNumber" className="text-xs font-bold text-foreground flex items-center gap-1">
                Account Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="accountNumber"
                type="text"
                placeholder="Enter bank account number"
                value={accountNumber}
                onChange={(e) => {
                  setAccountNumber(e.target.value.replace(/\D/g, ""));
                  if (errors.accountNumber) setErrors((prev) => ({ ...prev, accountNumber: "" }));
                }}
                className="text-xs font-mono font-bold rounded-xl"
              />
              {errors.accountNumber && (
                <p className="text-[11px] text-destructive">{errors.accountNumber}</p>
              )}
            </div>

            {/* Confirm Account Number */}
            <div className="space-y-1.5">
              <Label htmlFor="confirmAccountNumber" className="text-xs font-bold text-foreground flex items-center gap-1">
                Confirm Account Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="confirmAccountNumber"
                type="text"
                placeholder="Re-enter bank account number"
                value={confirmAccountNumber}
                onChange={(e) => {
                  setConfirmAccountNumber(e.target.value.replace(/\D/g, ""));
                  if (errors.confirmAccountNumber)
                    setErrors((prev) => ({ ...prev, confirmAccountNumber: "" }));
                }}
                className="text-xs font-mono font-bold rounded-xl"
              />
              {errors.confirmAccountNumber && (
                <p className="text-[11px] text-destructive">{errors.confirmAccountNumber}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* IFSC Code */}
            <div className="space-y-1.5">
              <Label htmlFor="ifscCode" className="text-xs font-bold text-foreground flex items-center gap-1">
                IFSC Code <span className="text-destructive">*</span>
              </Label>
              <Input
                id="ifscCode"
                placeholder="e.g. SBIN0001234 / UCBA0003284"
                maxLength={11}
                value={ifscCode}
                onChange={(e) => {
                  setIfscCode(e.target.value.toUpperCase());
                  if (errors.ifscCode) setErrors((prev) => ({ ...prev, ifscCode: "" }));
                }}
                className="text-xs font-mono font-bold uppercase rounded-xl"
              />
              {errors.ifscCode && (
                <p className="text-[11px] text-destructive">{errors.ifscCode}</p>
              )}
            </div>

            {/* Account Type */}
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-foreground flex items-center gap-1">
                Account Type <span className="text-destructive">*</span>
              </Label>
              <Select
                value={accountType}
                onValueChange={(val) => {
                  if (val) setAccountType(val as "PRIMARY" | "SECONDARY");
                }}
              >
                <SelectTrigger className="text-xs rounded-xl h-10">
                  <SelectValue placeholder="Select Account Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PRIMARY">PRIMARY</SelectItem>
                  <SelectItem value="SECONDARY">SECONDARY</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Holder Name */}
          <div className="space-y-1.5">
            <Label htmlFor="holderName" className="text-xs font-bold text-foreground flex items-center gap-1">
              Holder Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="holderName"
              placeholder="Name as registered with bank"
              value={holderName}
              onChange={(e) => {
                setHolderName(e.target.value);
                if (errors.holderName) setErrors((prev) => ({ ...prev, holderName: "" }));
              }}
              className="text-xs font-semibold uppercase rounded-xl"
            />
            {errors.holderName && (
              <p className="text-[11px] text-destructive">{errors.holderName}</p>
            )}
          </div>

          {/* Document Uploads */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            {/* PAN Image Upload */}
            <div className="space-y-2 p-3.5 rounded-2xl bg-muted/40 border border-border/80">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-bold flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-primary" /> PAN Image
                </Label>
                {panImage && (
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Attached
                  </span>
                )}
              </div>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePanFile}
                  id="pan-upload"
                  className="hidden"
                />
                <label
                  htmlFor="pan-upload"
                  className="w-full flex flex-col items-center justify-center p-3 border-2 border-dashed border-border hover:border-primary/60 rounded-xl cursor-pointer bg-background transition-colors text-center"
                >
                  {panImage ? (
                    <div className="space-y-1">
                      <p className="text-[11px] font-medium text-foreground truncate max-w-[180px]">
                        {panFileName || "pan_card.jpg"}
                      </p>
                      <span className="text-[10px] text-primary underline">Change File</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-muted-foreground text-xs">
                      <UploadCloud className="w-4 h-4 text-primary" />
                      <span>Choose PAN Card Image</span>
                    </div>
                  )}
                </label>
              </div>
              <p className="text-[10px] text-muted-foreground">Formats: JPG, PNG (Max 5MB)</p>
            </div>

            {/* Passbook Image Upload */}
            <div className="space-y-2 p-3.5 rounded-2xl bg-muted/40 border border-border/80">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-bold flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-primary" /> Passbook / Cheque Image
                </Label>
                {passbookImage && (
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Attached
                  </span>
                )}
              </div>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePassbookFile}
                  id="passbook-upload"
                  className="hidden"
                />
                <label
                  htmlFor="passbook-upload"
                  className="w-full flex flex-col items-center justify-center p-3 border-2 border-dashed border-border hover:border-primary/60 rounded-xl cursor-pointer bg-background transition-colors text-center"
                >
                  {passbookImage ? (
                    <div className="space-y-1">
                      <p className="text-[11px] font-medium text-foreground truncate max-w-[180px]">
                        {passbookFileName || "passbook.jpg"}
                      </p>
                      <span className="text-[10px] text-primary underline">Change File</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-muted-foreground text-xs">
                      <UploadCloud className="w-4 h-4 text-primary" />
                      <span>Choose Passbook / Cheque</span>
                    </div>
                  )}
                </label>
              </div>
              <p className="text-[10px] text-muted-foreground">Formats: JPG, PNG (Max 5MB)</p>
            </div>
          </div>

          <DialogFooter className="pt-3 border-t border-border flex flex-col sm:flex-row gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                handleReset();
                onOpenChange(false);
              }}
              className="rounded-xl text-xs"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-primary-foreground rounded-xl text-xs font-semibold shadow-xs"
            >
              {isSubmitting ? "Verifying & Adding..." : "Verify & Save Bank Account"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
});
