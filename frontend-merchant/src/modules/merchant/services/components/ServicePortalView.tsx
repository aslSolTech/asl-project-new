"use client";

import React, { memo, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Gift,
  Gamepad2,
  Fingerprint,
  Smartphone,
  Tv,
  Receipt,
  Zap,
  Send,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  Loader2,
  FileText,
  History,
  Plus,
  Search,
  CheckCircle
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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
import { toast } from "sonner";
import { useMerchantProfileStore } from "@/stores/useMerchantProfileStore";

interface ServiceViewProps {
  serviceId: string;
}

const SERVICE_META: Record<
  string,
  {
    title: string;
    category: string;
    icon: React.ElementType;
    badge?: string;
    description: string;
    reportRoute: string;
  }
> = {
  "gift-card": {
    title: "Brand Gift Cards & Vouchers",
    category: "Cards & Vouchers",
    icon: Gift,
    badge: "INSTANT CODE",
    description: "Purchase digital vouchers for Amazon, Flipkart, Myntra, Swiggy, Zomato, BookMyShow and 150+ brands.",
    reportRoute: "/dashboard/reports/gift-report",
  },
  "google-play": {
    title: "Google Play Recharge",
    category: "Recharge & Bill Pay",
    icon: Gamepad2,
    badge: "FAST DELIVER",
    description: "Instant Google Play Store redemption codes for apps, games, movies and in-app purchases.",
    reportRoute: "/dashboard/reports/mobile-recharge",
  },
  "aeps-yes-bank": {
    title: "AEPS - Yes Bank",
    category: "Banking & AEPS",
    icon: Fingerprint,
    badge: "YES BANK GATEWAY",
    description: "Aadhaar Enabled Payment System for Cash Withdrawal (CW), Balance Enquiry (BE), Mini Statement (MS), and Aadhaar Pay.",
    reportRoute: "/dashboard/reports/aeps",
  },
  "aeps-kotak-bank": {
    title: "AEPS - Kotak Bank",
    category: "Banking & AEPS",
    icon: Fingerprint,
    badge: "KOTAK 2-FACTOR",
    description: "Biometric Aadhaar ATM banking powered by Kotak Mahindra Bank high-speed processing.",
    reportRoute: "/dashboard/reports/aeps",
  },
  "mobile-prepaid": {
    title: "Mobile Prepaid & Postpaid",
    category: "Recharge & Bill Pay",
    icon: Smartphone,
    badge: "INSTANT COMMISSION",
    description: "Top-up prepaid numbers and clear postpaid bills for Jio, Airtel, VI, and BSNL with automatic best offers.",
    reportRoute: "/dashboard/reports/mobile-recharge",
  },
  "dth-recharge": {
    title: "DTH Connection Recharge",
    category: "Recharge & Bill Pay",
    icon: Tv,
    badge: "HEAVY REBATE",
    description: "Instant TV package top-ups and customer info fetch for Tata Play, Airtel Digital TV, Dish TV, Sun Direct, and D2H.",
    reportRoute: "/dashboard/reports/mobile-recharge",
  },
  bbps: {
    title: "Bharat BillPay (BBPS)",
    category: "Utility Bill Payment",
    icon: Receipt,
    badge: "NPCI CERTIFIED",
    description: "Official BBPS outlet: Electricity, Piped Gas, Water, Broadband, Municipal Taxes, FASTag and Loan Repayments.",
    reportRoute: "/dashboard/reports/bbps",
  },
  "upi-transfer": {
    title: "UPI Transfer & Collections",
    category: "Money Transfer",
    icon: Zap,
    badge: "24x7 REALTIME",
    description: "Direct Virtual Payment Address (VPA) / QR settlement to any UPI registered handle in seconds.",
    reportRoute: "/dashboard/reports/fund-transfer",
  },
  "money-transfer": {
    title: "Domestic Money Transfer (DMT)",
    category: "Money Transfer",
    icon: Send,
    badge: "IMPS / NEFT",
    description: "Instant cash-to-account remittance to 100+ nationalized, rural, and private banks across India.",
    reportRoute: "/dashboard/reports/money-transfer",
  },
};

export const ServicePortalView = memo(function ServicePortalView({ serviceId }: ServiceViewProps) {
  const pathname = usePathname();
  const profileRole = useMerchantProfileStore((s) => s?.profile?.role);

  const roleSlug = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0 && segments[1] === "dashboard") {
      return segments[0];
    }
    return (profileRole || "distributor").toLowerCase().replace(/\s+/g, "-");
  }, [pathname, profileRole]);

  const getRoleHref = (href?: string) => {
    if (!href) return "";
    if (href.startsWith("/dashboard")) {
      return `/${roleSlug}${href}`;
    }
    if (href.startsWith("/")) {
      return `/${roleSlug}/dashboard${href}`;
    }
    return href;
  };

  const meta = SERVICE_META[serviceId] || {
    title: "Service Portal",
    category: "Merchant Utility",
    icon: Sparkles,
    badge: "ACTIVE",
    description: "Enterprise merchant service portal with instant transaction clearance.",
    reportRoute: "/dashboard/all-services",
  };

  const IconComponent = meta.icon;
  const walletBalance = useMerchantProfileStore((s) => s.profile.walletBalance ?? 0);

  // Modal state for Initiate Transaction
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [submitting, setSubmitting] = useState(false);
  const [lastReceipt, setLastReceipt] = useState<{
    txnId: string;
    amount: number;
    target: string;
    operator: string;
    timestamp: string;
    status: "SUCCESS" | "FAILED" | "PENDING";
  } | null>(null);

  // Mock list of recent transactions / reports for this service
  const [transactions, setTransactions] = useState<
    Array<{
      id: string;
      txnId: string;
      operator: string;
      target: string;
      amount: number;
      commission: number;
      status: "SUCCESS" | "PENDING" | "FAILED";
      date: string;
    }>
  >(() => {
    const getSampleTarget = (defaultVal: string, giftVal: string, upiVal: string) => {
      if (serviceId === "upi-transfer") return upiVal;
      if (serviceId === "gift-card") return giftVal;
      return defaultVal;
    };

    return [
      {
        id: "1",
        txnId: "TXN849302198",
        operator: meta.title,
        target: getSampleTarget("9876543210", "Amazon Pay Voucher", "merchant@okhdfcbank"),
        amount: 1499.0,
        commission: 14.99,
        status: "SUCCESS",
        date: "Today, 02:45 PM",
      },
      {
        id: "2",
        txnId: "TXN593021481",
        operator: meta.title,
        target: getSampleTarget("9812345678", "Flipkart Voucher", "aslpay@icici"),
        amount: 499.0,
        commission: 5.0,
        status: "SUCCESS",
        date: "Today, 11:30 AM",
      },
      {
        id: "3",
        txnId: "TXN104928374",
        operator: meta.title,
        target: getSampleTarget("9723456789", "Myntra Voucher", "retailer@paytm"),
        amount: 2999.0,
        commission: 30.0,
        status: "SUCCESS",
        date: "Yesterday, 06:15 PM",
      },
    ];
  });

  const [searchFilter, setSearchFilter] = useState("");

  // General inputs
  const [field1, setField1] = useState(""); // Operator / Brand / Bank / Bill Category
  const [field2, setField2] = useState(""); // Number / Card / Account / Aadhaar / VPA
  const [amount, setAmount] = useState(""); // Amount
  const [extraField, setExtraField] = useState(""); // Optional Remarks / Circle / Plan

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const numAmount = Number.parseFloat(amount);

    if (!numAmount || numAmount <= 0) {
      toast.error("Please enter a valid transaction amount.");
      return;
    }

    if (numAmount > walletBalance) {
      toast.error(`Insufficient wallet balance. Available balance: ₹${walletBalance.toLocaleString("en-IN")}`);
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      const randomArray = new Uint32Array(1);
      window.crypto.getRandomValues(randomArray);
      const generatedTxnId = `TXN${100000000 + (randomArray[0] % 900000000)}`;
      const newReceipt = {
        txnId: generatedTxnId,
        amount: numAmount,
        target: field2 || "N/A",
        operator: field1 || meta.title,
        timestamp: new Date().toLocaleString("en-IN"),
        status: "SUCCESS" as const,
      };

      setLastReceipt(newReceipt);
      setTransactions((prev) => [
        {
          id: String(Date.now()),
          txnId: generatedTxnId,
          operator: field1 || meta.title,
          target: field2 || "N/A",
          amount: numAmount,
          commission: Number((numAmount * 0.01).toFixed(2)),
          status: "SUCCESS",
          date: "Just now",
        },
        ...prev,
      ]);

      toast.success(`${meta.title} order processed successfully! Txn ID: ${generatedTxnId}`);
      // Reset inputs & close modal
      setField2("");
      setAmount("");
      setExtraField("");
      setIsModalOpen(false);
    }, 1200);
  };

  const filteredTxns = useMemo(() => {
    if (!searchFilter.trim()) return transactions;
    return transactions.filter(
      (t) =>
        t.txnId.toLowerCase().includes(searchFilter.toLowerCase()) ||
        t.target.toLowerCase().includes(searchFilter.toLowerCase()) ||
        t.operator.toLowerCase().includes(searchFilter.toLowerCase())
    );
  }, [transactions, searchFilter]);

  return (
    <div className="mx-auto w-full space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Top Breadcrumb / Back Bar */}
      <div className="flex items-center justify-between">
        <Link
          href={getRoleHref("/dashboard/services")}
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-xl bg-card border border-border"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Services
        </Link>

        <Link
          href={getRoleHref(meta.reportRoute)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
        >
          <History className="w-4 h-4" />
          Full Report History
        </Link>
      </div>

      {/* Hero Header Card with Action Button */}
      <div className="rounded-3xl bg-card border border-border p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 shadow-inner">
              <IconComponent className="w-7 h-7 stroke-[1.8]" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                  {meta.title}
                </h1>
                {meta.badge && (
                  <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px] uppercase font-mono px-2 py-0.5">
                    {meta.badge}
                  </Badge>
                )}
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl">
                {meta.description}
              </p>
            </div>
          </div>

          {/* Right Header Actions: Wallet + Initiate Button */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center justify-between gap-3 px-4 py-2 rounded-2xl bg-muted/40 border border-border/80 shrink-0">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground block leading-tight">
                  Wallet Balance
                </span>
                <p className="text-base sm:text-lg font-extrabold font-mono text-foreground tracking-tight leading-tight">
                  ₹{(walletBalance || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="flex items-center text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold pl-2.5 border-l border-border/60">
                <ShieldCheck className="w-4 h-4 mr-1" />
                <span>Instant</span>
              </div>
            </div>

            {/* + Initiate Service Transaction Button */}
            <Button
              onClick={() => setIsModalOpen(true)}
              className="h-11 px-5 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              New Transaction
            </Button>
          </div>
        </div>
      </div>

      {/* Last Receipt Notification Card if just processed */}
      {lastReceipt && (
        <div className="p-5 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5" />
              <span>Last Transaction Successful</span>
            </div>
            <Badge className="bg-emerald-600 text-white text-[10px] font-mono">
              {lastReceipt.txnId}
            </Badge>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
            <div className="p-2.5 rounded-xl bg-background/60 border border-emerald-500/20">
              <span className="text-[10px] text-muted-foreground block">Amount</span>
              <span className="font-bold text-foreground font-mono">
                ₹{lastReceipt.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-background/60 border border-emerald-500/20">
              <span className="text-[10px] text-muted-foreground block">Target / Acc</span>
              <span className="font-bold text-foreground truncate block">
                {lastReceipt.target}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-background/60 border border-emerald-500/20">
              <span className="text-[10px] text-muted-foreground block">Operator</span>
              <span className="font-bold text-foreground truncate block">
                {lastReceipt.operator}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-background/60 border border-emerald-500/20">
              <span className="text-[10px] text-muted-foreground block">Date & Time</span>
              <span className="font-bold text-foreground text-[10px] block">
                {lastReceipt.timestamp}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Transaction History & Report Section */}
      <div className="rounded-3xl bg-card border border-border p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
          <div>
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              Recent Service Transactions
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Live status, instant clearance log and ledger tracking
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search Txn ID, mobile, account..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="pl-9 h-9 text-xs rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Transactions Table / List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border/60 text-muted-foreground text-[11px] uppercase tracking-wider font-semibold">
                <th className="py-3 px-3">Transaction ID</th>
                <th className="py-3 px-3">Details / Operator</th>
                <th className="py-3 px-3">Target / Number</th>
                <th className="py-3 px-3 text-right">Amount (₹)</th>
                <th className="py-3 px-3 text-right">Margin / Comm</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-3 text-right">Date &amp; Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {filteredTxns.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-muted-foreground">
                    No transactions found. Click &quot;New Transaction&quot; to initiate one.
                  </td>
                </tr>
              ) : (
                filteredTxns.map((t) => (
                  <tr key={t.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3.5 px-3 font-mono font-bold text-foreground">
                      {t.txnId}
                    </td>
                    <td className="py-3.5 px-3 font-medium text-foreground">
                      {t.operator}
                    </td>
                    <td className="py-3.5 px-3 font-mono text-muted-foreground">
                      {t.target}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-bold text-foreground">
                      ₹{t.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                      +₹{t.commission.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-[10px] font-semibold">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        SUCCESS
                      </Badge>
                    </td>
                    <td className="py-3.5 px-3 text-right text-muted-foreground text-[11px]">
                      {t.date}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Modal Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader className="border-b border-border pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                <IconComponent className="w-6 h-6 stroke-[1.8]" />
              </div>
              <div>
                <DialogTitle className="text-lg font-bold">
                  {meta.title}
                </DialogTitle>
                <DialogDescription className="sr-only">
                  {meta.title} Form
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 pt-1">
            {/* Dynamic Service Inputs */}
            {serviceId === "gift-card" && (
              <>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Select Brand Voucher</Label>
                  <Select value={field1} onValueChange={(val) => setField1(val || "")}>
                    <SelectTrigger className="rounded-xl h-11">
                      <SelectValue placeholder="Choose brand (e.g. Amazon, Flipkart...)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Amazon Pay Gift Card">Amazon Pay Gift Card (2.5% Margin)</SelectItem>
                      <SelectItem value="Flipkart Shopping Voucher">Flipkart Shopping Voucher (3.0% Margin)</SelectItem>
                      <SelectItem value="Myntra Fashion Voucher">Myntra Fashion Voucher (4.0% Margin)</SelectItem>
                      <SelectItem value="Swiggy Money Voucher">Swiggy Money Voucher (2.0% Margin)</SelectItem>
                      <SelectItem value="Zomato Dining Card">Zomato Dining Card (2.2% Margin)</SelectItem>
                      <SelectItem value="BookMyShow Entertainment">BookMyShow Entertainment (3.5% Margin)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Recipient Mobile / Email</Label>
                  <Input
                    required
                    placeholder="e.g. 9876543210 or user@example.com"
                    value={field2}
                    onChange={(e) => setField2(e.target.value)}
                    className="rounded-xl h-11 text-xs"
                  />
                </div>
              </>
            )}

            {serviceId === "google-play" && (
              <>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Registered Google Email ID</Label>
                  <Input
                    required
                    type="email"
                    placeholder="e.g. gamer@gmail.com"
                    value={field2}
                    onChange={(e) => setField2(e.target.value)}
                    className="rounded-xl h-11 text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Denomination Preset (₹)</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {["50", "100", "250", "500"].map((preset) => (
                      <Button
                        key={preset}
                        type="button"
                        variant={amount === preset ? "default" : "outline"}
                        size="sm"
                        className="rounded-xl text-xs"
                        onClick={() => setAmount(preset)}
                      >
                        ₹{preset}
                      </Button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {(serviceId === "aeps-yes-bank" || serviceId === "aeps-kotak-bank") && (
              <>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Select Transaction Type</Label>
                  <Select value={field1} onValueChange={(val) => setField1(val || "")}>
                    <SelectTrigger className="rounded-xl h-11">
                      <SelectValue placeholder="Select Operation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cash Withdrawal">Cash Withdrawal (CW)</SelectItem>
                      <SelectItem value="Balance Enquiry">Balance Enquiry (BE)</SelectItem>
                      <SelectItem value="Mini Statement">Mini Statement (MS)</SelectItem>
                      <SelectItem value="Aadhaar Pay">Aadhaar Pay (Higher limits)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Customer Aadhaar Number (UIDAI)</Label>
                  <Input
                    required
                    maxLength={12}
                    placeholder="12-digit Aadhaar Number (XXXX XXXX XXXX)"
                    value={field2}
                    onChange={(e) => setField2(e.target.value)}
                    className="rounded-xl h-11 text-xs font-mono"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Select Customer Bank</Label>
                  <Input
                    placeholder="e.g. State Bank of India, HDFC Bank, PNB..."
                    value={extraField}
                    onChange={(e) => setExtraField(e.target.value)}
                    className="rounded-xl h-11 text-xs"
                  />
                </div>
              </>
            )}

            {serviceId === "mobile-prepaid" && (
              <>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Select Telecom Operator &amp; Circle</Label>
                  <Select value={field1} onValueChange={(val) => setField1(val || "")}>
                    <SelectTrigger className="rounded-xl h-11">
                      <SelectValue placeholder="Choose Operator" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Jio Prepaid">Reliance Jio 4G/5G</SelectItem>
                      <SelectItem value="Airtel Prepaid">Bharti Airtel 4G/5G</SelectItem>
                      <SelectItem value="Vodafone Idea (VI)">Vodafone Idea (VI)</SelectItem>
                      <SelectItem value="BSNL Special/Topup">BSNL GSM (Special / STV)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">10-Digit Mobile Number</Label>
                  <Input
                    required
                    maxLength={10}
                    placeholder="Enter 10-digit mobile number"
                    value={field2}
                    onChange={(e) => setField2(e.target.value)}
                    className="rounded-xl h-11 text-xs font-mono"
                  />
                </div>
              </>
            )}

            {serviceId === "dth-recharge" && (
              <>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Select DTH Provider</Label>
                  <Select value={field1} onValueChange={(val) => setField1(val || "")}>
                    <SelectTrigger className="rounded-xl h-11">
                      <SelectValue placeholder="Choose DTH Operator" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tata Play">Tata Play (Tata Sky)</SelectItem>
                      <SelectItem value="Airtel Digital TV">Airtel Digital TV</SelectItem>
                      <SelectItem value="Dish TV">Dish TV</SelectItem>
                      <SelectItem value="Sun Direct">Sun Direct DTH</SelectItem>
                      <SelectItem value="D2H Videocon">D2H (Videocon)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Subscriber ID / Smartcard No.</Label>
                  <Input
                    required
                    placeholder="Enter Subscriber ID or Registered Mobile"
                    value={field2}
                    onChange={(e) => setField2(e.target.value)}
                    className="rounded-xl h-11 text-xs font-mono"
                  />
                </div>
              </>
            )}

            {serviceId === "bbps" && (
              <>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">BBPS Biller Category</Label>
                  <Select value={field1} onValueChange={(val) => setField1(val || "")}>
                    <SelectTrigger className="rounded-xl h-11">
                      <SelectValue placeholder="Select Utility Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Electricity Bill">Electricity (All state boards)</SelectItem>
                      <SelectItem value="Piped Gas">Piped Gas / LPG Cylinder</SelectItem>
                      <SelectItem value="Water Bill">Water Supply Boards</SelectItem>
                      <SelectItem value="Broadband &amp; Landline">Broadband &amp; Fiber</SelectItem>
                      <SelectItem value="FASTag Recharge">FASTag Toll Recharge</SelectItem>
                      <SelectItem value="Credit Card Bill">Credit Card Repayment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Consumer Number / Account ID</Label>
                  <Input
                    required
                    placeholder="Enter Consumer ID / CA Number / K-Number"
                    value={field2}
                    onChange={(e) => setField2(e.target.value)}
                    className="rounded-xl h-11 text-xs font-mono"
                  />
                </div>
              </>
            )}

            {serviceId === "upi-transfer" && (
              <>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Recipient UPI Virtual Address (VPA)</Label>
                  <Input
                    required
                    placeholder="e.g. merchant@okhdfcbank or 9876543210@paytm"
                    value={field2}
                    onChange={(e) => setField2(e.target.value)}
                    className="rounded-xl h-11 text-xs font-mono"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Beneficiary Name (Optional)</Label>
                  <Input
                    placeholder="e.g. John Doe / ASL Enterprises"
                    value={field1}
                    onChange={(e) => setField1(e.target.value)}
                    className="rounded-xl h-11 text-xs"
                  />
                </div>
              </>
            )}

            {serviceId === "money-transfer" && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Account Number</Label>
                    <Input
                      required
                      placeholder="Beneficiary Account Number"
                      value={field2}
                      onChange={(e) => setField2(e.target.value)}
                      className="rounded-xl h-11 text-xs font-mono"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Bank IFSC Code</Label>
                    <Input
                      required
                      placeholder="e.g. SBIN0001234"
                      value={extraField}
                      onChange={(e) => setExtraField(e.target.value.toUpperCase())}
                      className="rounded-xl h-11 text-xs font-mono uppercase"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Transfer Channel</Label>
                  <Select value={field1 || "IMPS (Instant)"} onValueChange={(val) => setField1(val || "")}>
                    <SelectTrigger className="rounded-xl h-11">
                      <SelectValue placeholder="Transfer Mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IMPS (Instant)">IMPS (Instant Settlement 24x7)</SelectItem>
                      <SelectItem value="NEFT (Batch)">NEFT (Zero Surcharge)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {/* Amount Input */}
            <div className="space-y-1.5 pt-1">
              <Label className="text-xs font-semibold">Amount (₹)</Label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground font-mono font-bold text-sm">
                  ₹
                </span>
                <Input
                  required
                  type="number"
                  min="1"
                  step="any"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-8 rounded-xl h-11 text-sm font-mono font-semibold"
                />
              </div>
            </div>

            {/* Submit Button */}
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
                disabled={submitting}
                className="h-11 px-6 rounded-xl text-xs font-bold uppercase tracking-wider bg-primary hover:bg-primary/90 shadow-sm"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Confirm &amp; Pay Now
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
});
