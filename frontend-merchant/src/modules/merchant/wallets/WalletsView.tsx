"use client";

import { memo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Wallet,
  Building2,
  Send,
  ArrowLeftRight,
  History,
  ShieldCheck,
  HandCoins,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMerchantProfileStore } from "@/stores/useMerchantProfileStore";
import { useMerchantWalletStore } from "@/stores/useMerchantWalletStore";
import { BankAccountsTab } from "./BankAccountsTab";
import { SendMoneyPayoutTab } from "./SendMoneyPayoutTab";
import { WalletTransferTab } from "./WalletTransferTab";
import { FundRequestTab } from "./FundRequestTab";
import { formatISODate } from "@/lib/datefns";

export const WalletsView = memo(function WalletsView() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "banks";
  
  const [activeTab, setActiveTab] = useState<"banks" | "payout" | "transfer" | "fund-request" | "history">(
    (initialTab as "banks" | "payout" | "transfer" | "fund-request" | "history") || "banks"
  );

  const walletBalance = useMerchantProfileStore((s) => s.profile.walletBalance ?? 0);
  const bankAccounts = useMerchantWalletStore((s) => s.bankAccounts);
  const payoutTransactions = useMerchantWalletStore((s) => s.payoutTransactions);

  return (
    <div className="mx-auto w-full space-y-6 pb-12">
      {/* Top Compact Banner Card */}
      <div className="rounded-2xl bg-card border border-border p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Left: Wallet Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
              <Wallet className="w-5 h-5 stroke-[2]" />
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
                  Wallets & Settlement
                </h1>
                <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-[10px] px-1.5 py-0">
                  Active
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-1">
                Settlement accounts, instant IMPS/NEFT payouts & balance transfers.
              </p>
            </div>
          </div>

          {/* Right: Working Balance Widget */}
          <div className="flex items-center justify-between sm:justify-end gap-3 px-4 py-2 rounded-xl bg-muted/40 border border-border/80 shrink-0">
            <div className="text-left sm:text-right">
              <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground block leading-tight">
                Wallet Balance
              </span>
              <p className="text-lg sm:text-xl font-extrabold font-mono text-foreground tracking-tight leading-tight">
                ₹{(walletBalance || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="hidden md:flex items-center text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold pl-2 border-l border-border/60">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" />
              <span>Instant</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-border/80 pb-3 overflow-x-auto">
        <Button
          variant={activeTab === "banks" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("banks")}
          className={`flex items-center gap-2 rounded-2xl font-semibold cursor-pointer ${
            activeTab === "banks"
              ? "shadow-sm shadow-primary/20"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Building2 className="w-4 h-4" />
          Bank Accounts
          <Badge className="bg-primary/20 text-primary-foreground border-primary/30 text-[10px] px-1.5 py-0">
            {bankAccounts.length}
          </Badge>
        </Button>

        <Button
          variant={activeTab === "payout" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("payout")}
          className={`flex items-center gap-2 rounded-2xl font-semibold cursor-pointer ${
            activeTab === "payout"
              ? "shadow-sm shadow-primary/20"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Send className="w-4 h-4" />
          Send Money (Payout)
        </Button>

        <Button
          variant={activeTab === "transfer" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("transfer")}
          className={`flex items-center gap-2 rounded-2xl font-semibold cursor-pointer ${
            activeTab === "transfer"
              ? "shadow-sm shadow-primary/20"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <ArrowLeftRight className="w-4 h-4" />
          Wallet to Wallet Transfer
        </Button>

        <Button
          variant={activeTab === "fund-request" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("fund-request")}
          className={`flex items-center gap-2 rounded-2xl font-semibold cursor-pointer ${
            activeTab === "fund-request"
              ? "shadow-sm shadow-primary/20"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <HandCoins className="w-4 h-4" />
          Fund Request
        </Button>

        <Button
          variant={activeTab === "history" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("history")}
          className={`flex items-center gap-2 rounded-2xl font-semibold cursor-pointer ${
            activeTab === "history"
              ? "shadow-sm shadow-primary/20"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <History className="w-4 h-4" />
          Transaction Logs
        </Button>
      </div>

      {/* Tab Content Display */}
      <div>
        {activeTab === "banks" && <BankAccountsTab />}
        {activeTab === "payout" && <SendMoneyPayoutTab />}
        {activeTab === "transfer" && <WalletTransferTab />}
        {activeTab === "fund-request" && <FundRequestTab />}
        {activeTab === "history" && (
          <div className="space-y-6">
            {/* Payout Settlements Log */}
            <div className="p-6 sm:p-7 rounded-3xl bg-card border border-border shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-primary/10 text-primary">
                    <Send className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-sm">Payout Settlement History</h3>
                    <p className="text-[11px] text-muted-foreground">Recent bank payout dispatches</p>
                  </div>
                </div>
                <Badge variant="outline" className="font-mono text-xs">
                  {payoutTransactions.length} Payouts
                </Badge>
              </div>

              {payoutTransactions.length === 0 ? (
                <div className="text-center py-8 text-xs text-muted-foreground">
                  No payout transactions yet.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-border/80 text-muted-foreground font-semibold">
                        <th className="py-2.5 px-3">Tx ID / UTR</th>
                        <th className="py-2.5 px-3">Beneficiary</th>
                        <th className="py-2.5 px-3">Bank & AC</th>
                        <th className="py-2.5 px-3">Mode</th>
                        <th className="py-2.5 px-3">Amount</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {payoutTransactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-muted/40 transition-colors">
                          <td className="py-3 px-3 font-mono">
                            <div className="font-bold text-foreground">{tx.id}</div>
                            <div className="text-[10px] text-muted-foreground">{tx.utr}</div>
                          </td>
                          <td className="py-3 px-3 font-semibold uppercase">{tx.recipientName}</td>
                          <td className="py-3 px-3">
                            <div className="font-medium text-foreground">{tx.bankName}</div>
                            <div className="text-[11px] font-mono text-muted-foreground">{tx.accountNumber}</div>
                          </td>
                          <td className="py-3 px-3">
                            <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px]">
                              {tx.mode}
                            </Badge>
                          </td>
                          <td className="py-3 px-3 font-mono font-black text-foreground">
                            ₹{tx.amount.toFixed(2)}
                          </td>
                          <td className="py-3 px-3">
                            <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-[10px]">
                              {tx.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-3 font-mono text-muted-foreground text-[11px]">
                            {formatISODate({ date: tx.timestamp, formatType: "short" })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
