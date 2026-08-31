"use client";

import { memo, useMemo, useState, useEffect } from "react";
import {
  Building2,
  ArrowRight,
  CheckCircle2,
  Clock,
  Lock,
  Plus,
  Search,
  Send,
  History,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "sonner";
import { useMerchantWalletStore } from "@/stores/useMerchantWalletStore";
import { useMerchantProfileStore } from "@/stores/useMerchantProfileStore";
import { PayoutMode, PayoutTransaction } from "@/modules/merchant/types";
import { formatISODate } from "@/lib/datefns";

const PAYOUT_MODES: { mode: PayoutMode; label: string; desc: string; speed: string; charge: string }[] = [
  { mode: "IMPS", label: "IMPS", desc: "Instant Real-Time Transfer (24x7)", speed: "Instant", charge: "₹0.00" },
  { mode: "NEFT", label: "NEFT", desc: "National Electronic Funds Transfer", speed: "10-30 Mins", charge: "₹0.00" },
  { mode: "RTGS", label: "RTGS", desc: "Real Time Gross Settlement (>₹2L)", speed: "Instant", charge: "₹0.00" },
  { mode: "IFT", label: "IFT", desc: "Internal Fund Transfer (Same Bank)", speed: "Instant", charge: "₹0.00" },
];

const QUICK_AMOUNTS = [10, 50, 100, 500, 1000, 5000];

export const SendMoneyPayoutTab = memo(function SendMoneyPayoutTab() {
  const bankAccounts = useMerchantWalletStore((s) => s.bankAccounts);
  const payoutTransactions = useMerchantWalletStore((s) => s.payoutTransactions);
  const processPayout = useMerchantWalletStore((s) => s.processPayout);
  const walletBalance = useMerchantProfileStore((s) => s.profile.walletBalance ?? 0);

  // Modal State
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Form State
  const [selectedBankId, setSelectedBankId] = useState<string>(
    bankAccounts[0]?.id || ""
  );
  const [amount, setAmount] = useState<string>("100");
  const [payoutMode, setPayoutMode] = useState<PayoutMode>("IMPS");
  const [remarks, setRemarks] = useState<string>("");

  // OTP Modals state
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [otpTimer, setOtpTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Success popup state
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [completedTx, setCompletedTx] = useState<PayoutTransaction | null>(null);

  // Selected Bank Object
  const selectedBank = bankAccounts.find((b) => b.id === selectedBankId) || bankAccounts[0];

  // OTP Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (confirmModalOpen && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    } else if (otpTimer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [confirmModalOpen, otpTimer]);

  const handleOpenConfirm = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const numAmount = Number.parseFloat(amount);

    if (!selectedBank) {
      toast.error("Please select a valid bank account for payout!");
      return;
    }
    if (Number.isNaN(numAmount) || numAmount <= 0) {
      toast.error("Please enter a valid payout amount (min ₹1)!");
      return;
    }
    if (numAmount > walletBalance) {
      toast.error("Insufficient wallet balance!", {
        description: `Available: ₹${walletBalance.toFixed(2)} | Requested: ₹${numAmount.toFixed(2)}`,
      });
      return;
    }

    setOtpValue("");
    setOtpTimer(60);
    setCanResend(false);
    setIsPayoutModalOpen(false);
    setConfirmModalOpen(true);
  };

  const handleResendOtp = () => {
    if (!canResend) return;
    setOtpValue("");
    setOtpTimer(60);
    setCanResend(false);
    toast.success("New 4-digit OTP sent to your registered mobile number!");
  };

  const handleConfirmAndTransfer = () => {
    if (otpValue.length !== 4) {
      toast.error("Please enter complete 4-digit security OTP!");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const numAmount = Number.parseFloat(amount);
      const res = processPayout({
        bankId: selectedBank.id,
        amount: numAmount,
        mode: payoutMode,
      });

      setIsProcessing(false);

      if (res.success && res.transaction) {
        setCompletedTx(res.transaction);
        setConfirmModalOpen(false);
        setSuccessModalOpen(true);
        toast.success(`Payout of ₹${numAmount.toFixed(2)} processed successfully!`);
      } else {
        toast.error(res.error || "Failed to process payout");
      }
    }, 1200);
  };

  // Sort newest payout transactions on top
  const filteredPayouts = useMemo(() => {
    const sorted = [...payoutTransactions].sort((a, b) => {
      const timeA = new Date(a.timestamp).getTime();
      const timeB = new Date(b.timestamp).getTime();
      return timeB - timeA;
    });

    if (!searchQuery.trim()) return sorted;
    return sorted.filter(
      (tx) =>
        tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.utr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.accountNumber.includes(searchQuery)
    );
  }, [payoutTransactions, searchQuery]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-primary text-primary-foreground">
              <Send className="w-5 h-5" />
            </div>
            <h2 className="text-base sm:text-lg font-black tracking-tight text-foreground">
              Send Money (Payout)
            </h2>
            <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px]">
              24x7
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            Transfer funds to bank account via IMPS, NEFT, or RTGS.
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
            onClick={() => setIsPayoutModalOpen(true)}
            className="h-11 px-5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            Send Money
          </Button>
        </div>
      </div>

      {/* Main Reports Table View (Newest on Top) */}
      <div className="rounded-3xl bg-card border border-border p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
          <div>
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <History className="w-4 h-4 text-primary" />
              Payout History
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Recent payout transactions and status
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search beneficiary, Txn ID, UTR..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-xs rounded-xl"
            />
          </div>
        </div>

        {/* Payout History Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-border/60 text-muted-foreground text-[11px] uppercase tracking-wider font-semibold">
                <th className="py-3 px-3">Tx ID / UTR</th>
                <th className="py-3 px-3">Beneficiary</th>
                <th className="py-3 px-3">Bank &amp; AC</th>
                <th className="py-3 px-3 text-center">Mode</th>
                <th className="py-3 px-3 text-right">Amount (₹)</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-3 text-right">Date &amp; Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {filteredPayouts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-muted-foreground">
                    {searchQuery
                      ? `No payouts matching "${searchQuery}"`
                      : "No payout transactions found."}
                  </td>
                </tr>
              ) : (
                filteredPayouts.map((tx) => (
                  <tr key={tx.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3.5 px-3 font-mono">
                      <div className="font-bold text-foreground">{tx.id}</div>
                      <div className="text-[10px] text-muted-foreground">{tx.utr}</div>
                    </td>
                    <td className="py-3.5 px-3 font-semibold uppercase text-foreground">
                      {tx.recipientName}
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="font-medium text-foreground">{tx.bankName}</div>
                      <div className="text-[11px] font-mono text-muted-foreground">{tx.accountNumber}</div>
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] font-mono">
                        {tx.mode}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-3 font-mono font-bold text-right text-foreground">
                      ₹{tx.amount.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-[10px] font-semibold">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        {tx.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-3 font-mono text-muted-foreground text-right text-[11px]">
                      {formatISODate({ date: tx.timestamp, formatType: "short" })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAYOUT INITIATION MODAL DIALOG */}
      <Dialog open={isPayoutModalOpen} onOpenChange={setIsPayoutModalOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader className="border-b border-border pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <DialogTitle className="text-lg font-bold">Send Money</DialogTitle>
                <DialogDescription className="sr-only">Send Money Payout Form</DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <form onSubmit={handleOpenConfirm} className="space-y-4 pt-1">
            {/* Bank Account Selection */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold flex items-center justify-between">
                <span>
                  Payout Destination Bank <span className="text-destructive">*</span>
                </span>
                <span className="text-[10px] text-muted-foreground font-normal">
                  {bankAccounts.length} Verified accounts
                </span>
              </Label>

              {bankAccounts.length === 0 ? (
                <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs">
                  No verified bank accounts available. Please add a bank account first.
                </div>
              ) : (
                <Select
                  value={selectedBankId}
                  onValueChange={(val) => {
                    if (val) setSelectedBankId(val);
                  }}
                >
                  <SelectTrigger className="w-full h-11 rounded-xl text-xs font-semibold">
                    <SelectValue placeholder="Select Bank Account">
                      {selectedBank
                        ? `${selectedBank.holderName} (${selectedBank.accountNumber}) - ${selectedBank.bankName}`
                        : "Select Bank Account"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {bankAccounts.map((acc) => (
                      <SelectItem key={acc.id} value={acc.id} className="py-2">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-primary shrink-0" />
                          <span className="font-bold">{acc.holderName}</span>
                          <span className="text-muted-foreground font-mono">({acc.accountNumber})</span>
                          <span className="text-muted-foreground text-[11px]">• {acc.bankName}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            {/* Payout Amount */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="modalPayoutAmount" className="text-xs font-semibold">
                  Payout Amount (₹) <span className="text-destructive">*</span>
                </Label>
                <span className="text-[10px] text-muted-foreground">
                  Available: ₹{walletBalance.toFixed(2)}
                </span>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground font-mono">
                  ₹
                </span>
                <Input
                  id="modalPayoutAmount"
                  type="number"
                  min="1"
                  step="0.01"
                  placeholder="Enter amount e.g. 100"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-8 text-sm font-mono font-bold rounded-xl h-11"
                  required
                />
              </div>

              {/* Quick Amount Pills */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] text-muted-foreground mr-1">Quick:</span>
                {QUICK_AMOUNTS.map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setAmount(val.toString())}
                    className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-lg border transition-all cursor-pointer ${
                      amount === val.toString()
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background hover:bg-muted text-foreground border-border"
                    }`}
                  >
                    ₹{val}
                  </button>
                ))}
              </div>
            </div>

            {/* Transfer Modes Grid */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Transfer Channel</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PAYOUT_MODES.map((modeItem) => {
                  const isSelected = payoutMode === modeItem.mode;
                  return (
                    <button
                      key={modeItem.mode}
                      type="button"
                      onClick={() => setPayoutMode(modeItem.mode)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer space-y-1 ${
                        isSelected
                          ? "bg-primary/10 border-primary shadow-xs ring-1 ring-primary"
                          : "bg-card border-border hover:bg-muted/40"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-foreground">{modeItem.label}</span>
                        <Badge className={`text-[8px] px-1 py-0 ${isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                          {modeItem.speed}
                        </Badge>
                      </div>
                      <p className="text-[9px] text-muted-foreground leading-tight">{modeItem.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Remarks */}
            <div className="space-y-1.5">
              <Label htmlFor="modalPayoutRemarks" className="text-xs font-medium text-muted-foreground">
                Remarks (Optional)
              </Label>
              <Input
                id="modalPayoutRemarks"
                placeholder="e.g. Daily CSP Settlement / Vendor Payout"
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
                onClick={() => setIsPayoutModalOpen(false)}
                className="h-11 rounded-xl text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={bankAccounts.length === 0}
                className="h-11 px-6 rounded-xl text-xs font-bold uppercase tracking-wider bg-primary hover:bg-primary/90 shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <span>Proceed</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* CONFIRM PAYOUT MODAL WITH 4-DIGIT OTP */}
      <Dialog open={confirmModalOpen} onOpenChange={setConfirmModalOpen}>
        <DialogContent className="max-w-md p-6 rounded-3xl bg-card border border-border shadow-2xl space-y-4">
          <DialogHeader className="border-b border-border pb-3">
            <div className="flex items-center gap-2.5 text-foreground">
              <div className="w-9 h-9 rounded-2xl bg-amber-500/15 text-amber-600 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <DialogTitle className="text-lg font-bold">Confirm Payout</DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground">
                  Verify transaction details and enter security OTP to proceed.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {/* Details Table */}
          <div className="p-4 rounded-2xl bg-muted/40 border border-border/80 space-y-2.5 text-xs">
            <div className="flex items-center justify-between border-b border-border/50 pb-2">
              <span className="text-muted-foreground font-medium">Payout Amount:</span>
              <span className="font-mono text-base font-black text-primary">
                ₹{Number(amount || 0).toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-border/50 pb-2">
              <span className="text-muted-foreground font-medium">Sending To:</span>
              <span className="font-bold text-foreground uppercase">{selectedBank?.holderName}</span>
            </div>
            <div className="flex items-center justify-between border-b border-border/50 pb-2">
              <span className="text-muted-foreground font-medium">Account Number:</span>
              <span className="font-mono font-bold text-foreground">{selectedBank?.accountNumber}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground font-medium">Mode:</span>
              <Badge className="bg-primary/10 text-primary border-primary/20 font-bold">
                {payoutMode}
              </Badge>
            </div>
          </div>

          {/* 4-DIGIT OTP INPUT */}
          <div className="space-y-3 pt-1 text-center">
            <div className="space-y-1">
              <Label className="text-xs font-bold text-foreground">
                Enter OTP (4 Digit) <span className="text-destructive">*</span>
              </Label>
              <p className="text-[11px] text-muted-foreground">
                Enter the 4-digit code sent to your registered phone
              </p>
            </div>

            <div className="flex justify-center py-2">
              <InputOTP maxLength={4} value={otpValue} onChange={setOtpValue}>
                <InputOTPGroup className="gap-2">
                  <InputOTPSlot index={0} className="w-12 h-12 rounded-xl text-lg font-bold" />
                  <InputOTPSlot index={1} className="w-12 h-12 rounded-xl text-lg font-bold" />
                  <InputOTPSlot index={2} className="w-12 h-12 rounded-xl text-lg font-bold" />
                  <InputOTPSlot index={3} className="w-12 h-12 rounded-xl text-lg font-bold" />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-muted-foreground text-[11px]">Didn&apos;t get the OTP?</span>
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-xs text-primary font-bold hover:underline cursor-pointer"
                >
                  Resend OTP
                </button>
              ) : (
                <span className="text-xs text-muted-foreground font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Resend in {otpTimer}s
                </span>
              )}
            </div>
          </div>

          {/* Buttons: Send Back & Confirm */}
          <DialogFooter className="pt-3 border-t border-border flex flex-col sm:flex-row gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setConfirmModalOpen(false)}
              className="rounded-xl text-xs font-semibold"
            >
              Send Back
            </Button>
            <Button
              type="button"
              disabled={otpValue.length !== 4 || isProcessing}
              onClick={handleConfirmAndTransfer}
              className="bg-primary text-primary-foreground rounded-xl text-xs font-bold shadow-xs flex-1"
            >
              {isProcessing ? "Processing Payout..." : "Confirm & Transfer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* SUCCESS CONFIRMATION POPUP */}
      <Dialog open={successModalOpen} onOpenChange={setSuccessModalOpen}>
        <DialogContent className="max-w-md p-6 rounded-3xl bg-card border border-emerald-500/30 shadow-2xl text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center shadow-inner">
            <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
          </div>

          <div className="space-y-1">
            <DialogTitle className="text-xl font-extrabold text-foreground tracking-tight">
              Payout Successful!
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Funds have been transferred to the beneficiary account.
            </DialogDescription>
          </div>

          {completedTx && (
            <div className="p-4 rounded-2xl bg-muted/40 border border-border/80 space-y-2 text-xs text-left">
              <div className="flex justify-between border-b border-border/50 pb-1.5">
                <span className="text-muted-foreground">Amount Transferred:</span>
                <span className="font-mono font-black text-sm text-foreground">
                  ₹{completedTx.amount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-1.5">
                <span className="text-muted-foreground">Beneficiary:</span>
                <span className="font-bold text-foreground uppercase">{completedTx.recipientName}</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-1.5">
                <span className="text-muted-foreground">Bank & AC:</span>
                <span className="font-mono font-semibold">{completedTx.bankName} ({completedTx.accountNumber})</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-1.5">
                <span className="text-muted-foreground">Payout Mode:</span>
                <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px]">
                  {completedTx.mode}
                </Badge>
              </div>
              <div className="flex justify-between items-center pt-0.5">
                <span className="text-muted-foreground">UTR / Ref No:</span>
                <span className="font-mono font-bold text-primary">{completedTx.utr}</span>
              </div>
            </div>
          )}

          <div className="pt-2">
            <Button
              type="button"
              onClick={() => setSuccessModalOpen(false)}
              className="w-full bg-primary text-primary-foreground rounded-2xl font-bold text-xs h-11"
            >
              Done &amp; Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
});
