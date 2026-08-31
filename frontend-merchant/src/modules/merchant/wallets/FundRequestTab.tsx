"use client";

import { memo, useMemo, useState } from "react";
import {
  HandCoins,
  Building2,
  CreditCard,
  Send,
  Plus,
  Search,
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
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useMerchantWalletStore } from "@/stores/useMerchantWalletStore";
import { formatISODate } from "@/lib/datefns";

const PAYMENT_BY_OPTIONS = [
  { value: "Google Pay", label: "Google Pay (GPay)" },
  { value: "PhonePe", label: "PhonePe" },
  { value: "Paytm", label: "Paytm" },
  { value: "BHIM UPI", label: "BHIM UPI" },
  { value: "Net Banking (IMPS/NEFT)", label: "Net Banking (IMPS/NEFT)" },
  { value: "Cash Deposit / CDM", label: "Cash Deposit / CDM" },
  { value: "Cheque Deposit", label: "Cheque Deposit" },
  { value: "Other UPI App", label: "Other UPI App" },
];

const QUICK_AMOUNTS = [1000, 5000, 10000, 25000, 50000, 100000];

const getStatusBadgeClass = (status: "Pending" | "Approved" | "Rejected") => {
  if (status === "Approved") {
    return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
  }
  if (status === "Rejected") {
    return "bg-destructive/10 text-destructive border-destructive/20";
  }
  return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
};

export const FundRequestTab = memo(function FundRequestTab() {
  const bankAccounts = useMerchantWalletStore((s) => s.bankAccounts);
  const fundRequests = useMerchantWalletStore((s) => s.fundRequests);
  const submitFundRequest = useMerchantWalletStore((s) => s.submitFundRequest);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Form State
  const [requestAmount, setRequestAmount] = useState<string>("");
  const [selectedBankId, setSelectedBankId] = useState<string>(
    bankAccounts[0]?.id || ""
  );
  const [transactionId, setTransactionId] = useState<string>("");
  const [paymentBy, setPaymentBy] = useState<string>("Google Pay");
  const [depositDate, setDepositDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [remarks, setRemarks] = useState<string>("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedBank = bankAccounts.find((b) => b.id === selectedBankId);

  const handleClear = () => {
    setRequestAmount("");
    setTransactionId("");
    setPaymentBy("Google Pay");
    setDepositDate(new Date().toISOString().split("T")[0]);
    setRemarks("");
    setErrors({});
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    const numAmount = Number.parseFloat(requestAmount);
    if (Number.isNaN(numAmount) || numAmount <= 0) {
      newErrors.requestAmount = "Enter a valid amount (min ₹10)";
    }

    if (!selectedBankId) {
      newErrors.bankId = "Please select a bank account";
    }

    if (!transactionId.trim()) {
      newErrors.transactionId = "Transaction ID / UTR is required";
    }

    if (!paymentBy.trim()) {
      newErrors.paymentBy = "Please select or specify payment method";
    }

    if (!depositDate) {
      newErrors.depositDate = "Deposit date is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill all required fields correctly");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = submitFundRequest({
        requestAmount: numAmount,
        requestFrom: "Admin",
        bankId: selectedBankId,
        transactionId: transactionId.trim(),
        paymentBy,
        depositDate,
        remarks: remarks.trim() || undefined,
      });

      if (res.success && res.fundRequest) {
        toast.success(`Fund request ${res.fundRequest.requestId} submitted to Admin successfully!`);
        handleClear();
        setIsModalOpen(false);
      } else {
        toast.error(res.error || "Failed to submit fund request");
      }
    } catch {
      toast.error("An unexpected error occurred while submitting the fund request");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Sort newest fund requests on top
  const filteredFundRequests = useMemo(() => {
    const sorted = [...fundRequests].sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();
      return timeB - timeA;
    });

    if (!searchQuery.trim()) return sorted;
    return sorted.filter(
      (req) =>
        req.requestId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.bankName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.paymentBy.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [fundRequests, searchQuery]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-primary text-primary-foreground">
              <HandCoins className="w-5 h-5" />
            </div>
            <h2 className="text-base sm:text-lg font-black tracking-tight text-foreground">
              Fund Request
            </h2>
            <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px]">
              Admin Desk
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            Request wallet balance credit after bank deposit.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            onClick={() => setIsModalOpen(true)}
            className="h-11 px-5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            New Fund Request
          </Button>
        </div>
      </div>

      {/* Main Request History Table (Recent on Top) */}
      <div className="p-6 sm:p-7 rounded-3xl bg-card border border-border shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-3">
          <div>
            <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-primary" />
              Fund Request History
            </h3>
            <p className="text-[11px] text-muted-foreground">Requests sent to Admin</p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search Req ID, UTR, Bank..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-xs rounded-xl"
            />
          </div>
        </div>

        {filteredFundRequests.length === 0 ? (
          <div className="text-center py-10 text-xs text-muted-foreground">
            {searchQuery
              ? `No requests matching "${searchQuery}"`
              : "No fund requests found."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-border/80 text-muted-foreground font-semibold">
                  <th className="py-2.5 px-3">Req ID / Created</th>
                  <th className="py-2.5 px-3">Amount (₹)</th>
                  <th className="py-2.5 px-3">Request From</th>
                  <th className="py-2.5 px-3">Beneficiary Bank</th>
                  <th className="py-2.5 px-3">Txn ID / UTR</th>
                  <th className="py-2.5 px-3">Payment By</th>
                  <th className="py-2.5 px-3">Deposit Date</th>
                  <th className="py-2.5 px-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredFundRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-muted/40 transition-colors">
                    <td className="py-3 px-3 font-mono">
                      <div className="font-bold text-foreground">{req.requestId}</div>
                      <div className="text-[10px] text-muted-foreground">
                        {formatISODate({ date: req.createdAt, formatType: "short" })}
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono font-black text-foreground">
                      ₹{req.requestAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-3">
                      <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px]">
                        {req.requestFrom}
                      </Badge>
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-medium text-foreground">{req.bankName}</div>
                      <div className="text-[11px] font-mono text-muted-foreground">{req.accountNumber}</div>
                    </td>
                    <td className="py-3 px-3 font-mono font-semibold text-foreground">
                      {req.transactionId}
                    </td>
                    <td className="py-3 px-3 font-medium text-foreground">
                      {req.paymentBy}
                    </td>
                    <td className="py-3 px-3 font-mono text-muted-foreground text-[11px]">
                      {req.depositDate}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <Badge
                        className={`text-[10px] ${getStatusBadgeClass(req.status)}`}
                      >
                        {req.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* FUND REQUEST MODAL DIALOG */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="border-b border-border pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                <HandCoins className="w-5 h-5" />
              </div>
              <div>
                <DialogTitle className="text-lg font-bold">New Fund Request</DialogTitle>
                <DialogDescription className="sr-only">Fund Request Form</DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 pt-1">
            {/* Amount */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="modalRequestAmount" className="text-xs font-semibold">
                  Request Amount (₹) <span className="text-destructive">*</span>
                </Label>
                <span className="text-[10px] text-muted-foreground">Min ₹10</span>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground font-mono">
                  ₹
                </span>
                <Input
                  id="modalRequestAmount"
                  type="number"
                  min="10"
                  step="0.01"
                  placeholder="Enter amount deposited"
                  value={requestAmount}
                  onChange={(e) => {
                    setRequestAmount(e.target.value);
                    if (errors.requestAmount) setErrors((prev) => ({ ...prev, requestAmount: "" }));
                  }}
                  className="pl-8 text-sm font-mono font-bold rounded-xl h-11"
                  required
                />
              </div>
              {errors.requestAmount && (
                <p className="text-[11px] text-destructive">{errors.requestAmount}</p>
              )}

              {/* Quick Amount Chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] text-muted-foreground mr-1">Quick:</span>
                {QUICK_AMOUNTS.map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setRequestAmount(val.toString())}
                    className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-lg border transition-all cursor-pointer ${
                      requestAmount === val.toString()
                        ? "bg-primary text-primary-foreground border-primary shadow-xs"
                        : "bg-background hover:bg-muted text-foreground border-border"
                    }`}
                  >
                    ₹{val.toLocaleString("en-IN")}
                  </button>
                ))}
              </div>
            </div>

            {/* Bank Account Selection */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">
                Deposited In Bank Account <span className="text-destructive">*</span>
              </Label>
              <Select
                value={selectedBankId}
                onValueChange={(val) => {
                  if (val) setSelectedBankId(val);
                  if (errors.bankId) setErrors((prev) => ({ ...prev, bankId: "" }));
                }}
              >
                <SelectTrigger className="w-full h-11 rounded-xl text-xs font-semibold">
                  <SelectValue placeholder="Select Bank Account">
                    {selectedBank
                      ? `${selectedBank.bankName} - AC: ${selectedBank.accountNumber} (${selectedBank.holderName})`
                      : "Select Bank"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {bankAccounts.map((acc) => (
                    <SelectItem key={acc.id} value={acc.id} className="py-2">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-primary shrink-0" />
                        <span className="font-bold">{acc.bankName}</span>
                        <span className="text-muted-foreground font-mono">({acc.accountNumber})</span>
                        <span className="text-muted-foreground text-[11px]">• {acc.holderName}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.bankId && <p className="text-[11px] text-destructive">{errors.bankId}</p>}
            </div>

            {/* Txn ID and Payment Mode Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Transaction ID / UTR */}
              <div className="space-y-1.5">
                <Label htmlFor="modalTransactionId" className="text-xs font-semibold">
                  Transaction ID / UTR <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="modalTransactionId"
                  placeholder="e.g. 423871928371 / UPI Ref"
                  value={transactionId}
                  onChange={(e) => {
                    setTransactionId(e.target.value);
                    if (errors.transactionId) setErrors((prev) => ({ ...prev, transactionId: "" }));
                  }}
                  className="text-xs font-mono font-bold rounded-xl h-11"
                  required
                />
                {errors.transactionId && (
                  <p className="text-[11px] text-destructive">{errors.transactionId}</p>
                )}
              </div>

              {/* Payment By */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">
                  Payment Method <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={paymentBy}
                  onValueChange={(val) => {
                    if (val) setPaymentBy(val);
                    if (errors.paymentBy) setErrors((prev) => ({ ...prev, paymentBy: "" }));
                  }}
                >
                  <SelectTrigger className="w-full h-11 rounded-xl text-xs font-semibold">
                    <SelectValue placeholder="Select Payment Mode" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {PAYMENT_BY_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value} className="text-xs">
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.paymentBy && <p className="text-[11px] text-destructive">{errors.paymentBy}</p>}
              </div>
            </div>

            {/* Deposit Date */}
            <div className="space-y-1.5">
              <Label htmlFor="modalDepositDate" className="text-xs font-semibold">
                Deposit Date <span className="text-destructive">*</span>
              </Label>
              <Input
                id="modalDepositDate"
                type="date"
                value={depositDate}
                onChange={(e) => {
                  setDepositDate(e.target.value);
                  if (errors.depositDate) setErrors((prev) => ({ ...prev, depositDate: "" }));
                }}
                className="text-xs font-mono rounded-xl h-11"
                required
              />
              {errors.depositDate && <p className="text-[11px] text-destructive">{errors.depositDate}</p>}
            </div>

            {/* Remarks */}
            <div className="space-y-1.5">
              <Label htmlFor="modalRemarks" className="text-xs font-medium text-muted-foreground">
                Remarks / Reference Note (Optional)
              </Label>
              <Textarea
                id="modalRemarks"
                placeholder="Any special reference note or transfer comments..."
                rows={2}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="text-xs rounded-xl resize-none"
              />
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-border/60">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="h-11 rounded-xl text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-11 px-6 rounded-xl text-xs font-bold uppercase tracking-wider bg-primary hover:bg-primary/90 shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? "Submitting..." : "Submit Fund Request"}</span>
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
});
