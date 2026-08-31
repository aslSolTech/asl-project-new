"use client";

import { memo, useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wallet, Plus, CheckCircle2, Building2, QrCode, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useMerchantProfileStore } from "@/stores/useMerchantProfileStore";

const QUICK_AMOUNTS = [500, 1000, 2000, 5000, 10000];

export const HeaderWalletWidget = memo(function HeaderWalletWidget() {
  const pathname = usePathname();
  const profileRole = useMerchantProfileStore((s) => s?.profile?.role);
  const walletBalance = useMerchantProfileStore((s) => s.profile.walletBalance ?? 45280.50);
  const addMoneyToWallet = useMerchantProfileStore((s) => s.addMoneyToWallet);

  const roleSlug = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0 && segments[1] === "dashboard") {
      return segments[0];
    }
    return (profileRole || "distributor").toLowerCase().replace(/\s+/g, "-");
  }, [pathname, profileRole]);

  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "netbanking" | "qr">("upi");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuickSelect = (val: number) => {
    setAmount(val.toString());
  };

  const handleAddMoney = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const numAmount = Number.parseFloat(amount);

    if (Number.isNaN(numAmount) || numAmount < 10) {
      toast.error("Please enter a valid amount (minimum ₹10)");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      addMoneyToWallet(numAmount);
      setIsSubmitting(false);
      setOpen(false);
      setAmount("");
      toast.success(`₹${numAmount.toLocaleString("en-IN")} added to wallet successfully!`, {
        description: "Your available balance has been updated instantly.",
      });
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex items-center gap-1.5 bg-gradient-to-r from-blue-50/90 via-slate-50/90 to-amber-50/90 dark:from-slate-800/90 dark:via-slate-800/60 dark:to-slate-900/90 border border-blue-200/60 dark:border-slate-700/80 rounded-xl px-2.5 py-1.5 shadow-xs backdrop-blur-md">
        {/* Wallet Balance Display (clickable link to Wallets page) */}
        <Link
          href={`/${roleSlug}/dashboard/wallets`}
          className="flex items-center gap-2 pr-1 hover:opacity-80 transition-opacity cursor-pointer"
          title="Open Wallets & Banking Dashboard"
        >
          <div className="w-7 h-7 rounded-lg bg-blue-600 dark:bg-blue-500 text-white flex items-center justify-center shadow-xs">
            <Wallet className="w-3.5 h-3.5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground leading-none">
              Wallet
            </span>
            <span className="text-xs font-bold font-mono text-slate-800 dark:text-slate-100 leading-tight">
              ₹{(walletBalance || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </Link>

        {/* Add Money Popup Button */}
        <DialogTrigger
          className="h-7 px-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs flex items-center gap-1 cursor-pointer transition-all active:scale-95 outline-none border-none select-none"
          title="Add Money to Wallet"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span className="hidden sm:inline">Add</span>
        </DialogTrigger>
      </div>

      {/* Add Money Form Modal */}
      <DialogContent className="sm:max-w-[425px] rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-white/40 dark:border-slate-800 shadow-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2 text-primary font-bold text-base">
            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
            <span>Add Money to Wallet</span>
          </div>
          <DialogDescription className="text-xs text-muted-foreground">
            Top-up your merchant working balance instantly via UPI, Net Banking, or QR code.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleAddMoney} className="space-y-4 pt-2">
          {/* Current Balance Indicator */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50 border border-border/60">
            <span className="text-xs font-medium text-muted-foreground">Current Balance</span>
            <span className="text-sm font-bold font-mono text-foreground">
              ₹{(walletBalance || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          {/* Amount Input */}
          <div className="space-y-1.5">
            <Label htmlFor="topup-amount" className="text-xs font-semibold">
              Enter Amount (₹)
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground">
                ₹
              </span>
              <Input
                id="topup-amount"
                type="number"
                min="10"
                step="1"
                placeholder="e.g. 2000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-8 font-mono text-base font-semibold rounded-xl h-10"
                required
                autoFocus
              />
            </div>
          </div>

          {/* Quick Select Buttons */}
          <div className="space-y-1.5">
            <Label className="text-[11px] font-medium text-muted-foreground">Quick Add Amount</Label>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_AMOUNTS.map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => handleQuickSelect(val)}
                  className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                    amount === val.toString()
                      ? "bg-primary text-primary-foreground border-primary shadow-xs"
                      : "bg-background hover:bg-muted text-foreground border-border"
                  }`}
                >
                  +₹{val.toLocaleString("en-IN")}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-1.5 pt-1">
            <Label className="text-[11px] font-medium text-muted-foreground">Payment Method</Label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod("upi")}
                className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all cursor-pointer ${
                  paymentMethod === "upi"
                    ? "border-primary bg-primary/10 text-primary font-bold shadow-xs"
                    : "border-border bg-background text-muted-foreground hover:bg-muted"
                }`}
              >
                <Smartphone className="w-4 h-4 mb-1" />
                <span className="text-[11px]">Instant UPI</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("qr")}
                className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all cursor-pointer ${
                  paymentMethod === "qr"
                    ? "border-primary bg-primary/10 text-primary font-bold shadow-xs"
                    : "border-border bg-background text-muted-foreground hover:bg-muted"
                }`}
              >
                <QrCode className="w-4 h-4 mb-1" />
                <span className="text-[11px]">Dynamic QR</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("netbanking")}
                className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all cursor-pointer ${
                  paymentMethod === "netbanking"
                    ? "border-primary bg-primary/10 text-primary font-bold shadow-xs"
                    : "border-border bg-background text-muted-foreground hover:bg-muted"
                }`}
              >
                <Building2 className="w-4 h-4 mb-1" />
                <span className="text-[11px]">Net Banking</span>
              </button>
            </div>
          </div>

          <DialogFooter className="pt-2 sm:space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="rounded-xl h-9 text-xs"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-xl h-9 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center gap-1.5"
              disabled={isSubmitting || !amount || Number.parseFloat(amount) <= 0}
            >
              {isSubmitting ? (
                <span>Processing...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Proceed to Pay {amount ? `₹${Number(amount).toLocaleString("en-IN")}` : ""}</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
});
