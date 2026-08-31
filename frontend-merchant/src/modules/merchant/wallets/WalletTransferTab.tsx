"use client";

import { memo, useMemo, useState } from "react";
import {
  Smartphone,
  History,
  Send,
  Plus,
  Search,
  CheckCircle2,
  ArrowLeftRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useMerchantWalletStore } from "@/stores/useMerchantWalletStore";
import { useMerchantProfileStore } from "@/stores/useMerchantProfileStore";
import { formatISODate } from "@/lib/datefns";

const QUICK_TRANSFER_AMOUNTS = [100, 500, 1000, 2000, 5000];

export const WalletTransferTab = memo(function WalletTransferTab() {
  const walletBalance = useMerchantProfileStore((s) => s.profile.walletBalance ?? 0);
  const transferBalance = useMerchantWalletStore((s) => s.transferBalance);
  const walletTransfers = useMerchantWalletStore((s) => s.walletTransfers);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [remarks, setRemarks] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleTransfer = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    const cleanMobile = mobileNumber.replace(/\D/g, "");
    if (cleanMobile?.length !== 10) {
      newErrors.mobileNumber = "Enter a valid 10-digit mobile number.";
    }

    const numAmount = Number.parseFloat(transferAmount);
    if (Number.isNaN(numAmount) || numAmount <= 0) {
      newErrors.transferAmount = "Enter a valid transfer amount (min ₹10)";
    } else if (numAmount > walletBalance) {
      newErrors.transferAmount = `Insufficient balance. Available: ₹${walletBalance.toFixed(2)}`;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please correct the errors in the form");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const res = transferBalance({
        targetMobile: cleanMobile,
        amount: numAmount,
        note: remarks || "Wallet Balance Transfer",
      });

      setIsSubmitting(false);

      if (res.success && res.transfer) {
        toast.success(`₹${numAmount.toFixed(2)} transferred successfully!`, {
          description: `Sent to user +91 ${cleanMobile}`,
        });
        setMobileNumber("");
        setTransferAmount("");
        setRemarks("");
        setErrors({});
        setIsModalOpen(false);
      } else {
        toast.error(res.error || "Failed to transfer balance");
      }
    }, 800);
  };

  // Sort newest transfers first and filter
  const filteredTransfers = useMemo(() => {
    const sorted = [...walletTransfers].sort((a, b) => {
      const timeA = new Date(a.timestamp).getTime();
      const timeB = new Date(b.timestamp).getTime();
      return timeB - timeA;
    });

    if (!searchQuery.trim()) return sorted;
    return sorted.filter(
      (t) =>
        t.targetMobile.includes(searchQuery) ||
        t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.note || "").toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [walletTransfers, searchQuery]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner with + Transfer Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-primary text-primary-foreground">
              <ArrowLeftRight className="w-5 h-5" />
            </div>
            <h2 className="text-base sm:text-lg font-black tracking-tight text-foreground">
              Wallet to Wallet Transfer
            </h2>
            <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px]">
              Instant
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            Transfer balance to another registered user or merchant.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-card border border-border/80 text-xs shadow-xs">
            <span className="text-muted-foreground text-[11px]">Balance:</span>
            <span className="font-mono font-bold text-foreground">
              ₹{(walletBalance || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </span>
          </div>

          <Button
            onClick={() => setIsModalOpen(true)}
            className="h-11 px-5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            New Transfer
          </Button>
        </div>
      </div>

      {/* Main Content: Transfer List Table with Search (Recent on Top) */}
      <div className="rounded-3xl bg-card border border-border p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
          <div>
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <History className="w-4 h-4 text-primary" />
              Transfer History
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Recent balance transfers
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search mobile, Txn ID, note..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-xs rounded-xl"
            />
          </div>
        </div>

        {/* Transfer Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border/60 text-muted-foreground text-[11px] uppercase tracking-wider font-semibold">
                <th className="py-3 px-3">Transfer ID</th>
                <th className="py-3 px-3">Recipient Mobile</th>
                <th className="py-3 px-3">Remarks / Note</th>
                <th className="py-3 px-3 text-right">Amount (₹)</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-3 text-right">Date &amp; Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {filteredTransfers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-muted-foreground">
                    {searchQuery
                      ? `No transfers matching "${searchQuery}"`
                      : "No transfers found."}
                  </td>
                </tr>
              ) : (
                filteredTransfers.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3.5 px-3 font-mono font-bold text-foreground">
                      {item.id}
                    </td>
                    <td className="py-3.5 px-3 font-mono font-semibold text-foreground">
                      <div className="flex items-center gap-1.5">
                        <Smartphone className="w-3.5 h-3.5 text-primary" />
                        +91 {item.targetMobile}
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-muted-foreground">
                      {item.note || "Wallet Balance Transfer"}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      ₹{item.amount.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-[10px] font-semibold">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        {item.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-3 text-right text-muted-foreground text-[11px] font-mono">
                      {formatISODate({ date: item.timestamp, formatType: "short" })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transfer Form Modal Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader className="border-b border-border pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                <ArrowLeftRight className="w-5 h-5" />
              </div>
              <div>
                <DialogTitle className="text-lg font-bold">
                  Wallet Transfer
                </DialogTitle>
                <DialogDescription className="sr-only">
                  Wallet Balance Transfer Form
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <form onSubmit={handleTransfer} className="space-y-4 pt-1">
            {/* Mobile Number */}
            <div className="space-y-1.5">
              <Label htmlFor="modalMobileNumber" className="text-xs font-bold text-foreground flex items-center gap-1">
                Recipient Mobile Number <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground font-mono">
                  +91
                </span>
                <Input
                  id="modalMobileNumber"
                  type="tel"
                  maxLength={10}
                  placeholder="Enter 10-digit registered number"
                  value={mobileNumber}
                  onChange={(e) => {
                    setMobileNumber(e.target.value.replace(/\D/g, ""));
                    if (errors.mobileNumber) setErrors((prev) => ({ ...prev, mobileNumber: "" }));
                  }}
                  className="pl-12 text-xs font-mono font-bold rounded-xl h-11"
                  required
                />
              </div>
              {errors.mobileNumber && (
                <p className="text-[11px] text-destructive">{errors.mobileNumber}</p>
              )}
            </div>

            {/* Transfer Amount */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="modalTransferAmount" className="text-xs font-bold text-foreground flex items-center gap-1">
                  Transfer Amount (₹) <span className="text-destructive">*</span>
                </Label>
                <span className="text-[11px] text-muted-foreground">Available: ₹{walletBalance.toFixed(2)}</span>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base font-black text-muted-foreground">
                  ₹
                </span>
                <Input
                  id="modalTransferAmount"
                  type="number"
                  min="1"
                  step="0.01"
                  placeholder="Enter transfer amount"
                  value={transferAmount}
                  onChange={(e) => {
                    setTransferAmount(e.target.value);
                    if (errors.transferAmount)
                      setErrors((prev) => ({ ...prev, transferAmount: "" }));
                  }}
                  className="pl-9 text-base font-mono font-bold rounded-xl h-11"
                  required
                />
              </div>
              {errors.transferAmount && (
                <p className="text-[11px] text-destructive">{errors.transferAmount}</p>
              )}

              {/* Quick Amount Chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] text-muted-foreground font-medium mr-1">Quick:</span>
                {QUICK_TRANSFER_AMOUNTS.map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setTransferAmount(val.toString())}
                    className={`text-xs font-semibold px-2.5 py-1 rounded-xl border transition-all cursor-pointer ${
                      transferAmount === val.toString()
                        ? "bg-primary text-primary-foreground border-primary shadow-xs"
                        : "bg-background hover:bg-muted text-foreground border-border"
                    }`}
                  >
                    ₹{val}
                  </button>
                ))}
              </div>
            </div>

            {/* Remarks */}
            <div className="space-y-1.5">
              <Label htmlFor="modalTransferRemarks" className="text-xs font-medium text-muted-foreground">
                Transfer Remarks (Optional)
              </Label>
              <Input
                id="modalTransferRemarks"
                placeholder="e.g. Retailer float balance / Wallet topup"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="text-xs rounded-xl h-11"
              />
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-border/60">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="h-11 rounded-xl text-xs font-semibold"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-11 px-6 rounded-xl text-xs font-bold uppercase tracking-wider bg-primary hover:bg-primary/90 shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? "Transferring..." : "Transfer Now"}</span>
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
});

