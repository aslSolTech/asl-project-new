"use client";

import { memo, useState } from "react";
import {
  Building2,
  Plus,
  CheckCircle2,
  BadgeCheck,
  Copy,
  Check,
  Trash2,
  Star,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useMerchantWalletStore } from "@/stores/useMerchantWalletStore";
import { AddBankAccountDialog } from "./AddBankAccountDialog";

export const BankAccountsTab = memo(function BankAccountsTab() {
  const bankAccounts = useMerchantWalletStore((s) => s.bankAccounts);
  const removeBankAccount = useMerchantWalletStore((s) => s.removeBankAccount);
  const setPrimaryAccount = useMerchantWalletStore((s) => s.setPrimaryAccount);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    toast.success(`${label} copied!`, { description: text });
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleDelete = (id: string, bankName: string) => {
    removeBankAccount(id);
    toast.success("Bank account removed", {
      description: `${bankName} was removed from your settlement accounts.`,
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner for Bank Accounts */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-primary text-primary-foreground">
              <Building2 className="w-5 h-5" />
            </div>
            <h2 className="text-base sm:text-lg font-black tracking-tight text-foreground">
              Connected Bank Accounts
            </h2>
            <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px]">
              {bankAccounts.length} Verified
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            Registered commercial settlement accounts for daily payouts and IMPS/NEFT transfers.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            onClick={() => setDialogOpen(true)}
            className="h-11 px-5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            Add Bank Account
          </Button>
        </div>
      </div>

      {/* Grid of Bank Account Cards */}
      {bankAccounts.length === 0 ? (
        <div className="text-center py-12 p-6 rounded-3xl bg-card border border-dashed border-border space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-muted text-muted-foreground mx-auto flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-foreground text-base">No Bank Accounts Added Yet</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Click &quot;Add Bank Account&quot; to link your commercial account for merchant payouts.
          </p>
          <Button onClick={() => setDialogOpen(true)} size="sm" className="rounded-xl">
            <Plus className="w-3.5 h-3.5 mr-1" /> Add Account Now
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {bankAccounts.map((account) => {
            const isPrimary = account.accountType === "PRIMARY";

            return (
              <div
                key={account.id}
                className={`relative group rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between border shadow-xs hover:shadow-md ${
                  isPrimary
                    ? "bg-gradient-to-br from-emerald-500/10 via-card to-card border-emerald-500/30"
                    : "bg-card border-border hover:border-primary/40"
                }`}
              >
                {/* Top Row: Bank Badge & Verified Status */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-2 border-b border-border/70 pb-3.5">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border ${
                          isPrimary
                            ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                            : "bg-primary/10 border-primary/20 text-primary"
                        }`}
                      >
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-extrabold text-foreground tracking-tight line-clamp-1">
                            {account.bankName}
                          </h3>
                        </div>
                        <Badge
                          className={`text-[9px] px-2 py-0.5 font-bold uppercase tracking-wider ${
                            isPrimary
                              ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/40"
                              : "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20"
                          }`}
                        >
                          {account.accountType}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {account.isVerified && (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          <BadgeCheck className="w-3.5 h-3.5" />
                          VERIFIED !
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Account Details Box */}
                  <div className="space-y-2.5 bg-muted/40 p-3.5 rounded-2xl border border-border/60">
                    {/* Account Number */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground text-[11px] font-medium">Account No:</span>
                      <div className="flex items-center gap-1.5 font-mono font-bold text-foreground">
                        <span>AC - {account.accountNumber}</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(account.accountNumber, `AC-${account.id}`)}
                          className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                          title="Copy Account Number"
                        >
                          {copiedField === `AC-${account.id}` ? (
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* IFSC Code */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground text-[11px] font-medium">IFSC:</span>
                      <div className="flex items-center gap-1.5 font-mono font-bold text-foreground">
                        <span>IFSC - {account.ifscCode}</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(account.ifscCode, `IFSC-${account.id}`)}
                          className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                          title="Copy IFSC"
                        >
                          {copiedField === `IFSC-${account.id}` ? (
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Holder Name */}
                    <div className="flex items-center justify-between text-xs border-t border-border/40 pt-1.5">
                      <span className="text-muted-foreground text-[11px] font-medium">Holder Name:</span>
                      <span className="font-bold text-foreground uppercase tracking-tight">
                        {account.holderName}
                      </span>
                    </div>
                  </div>

                  {/* Verification Timestamp */}
                  {account.verifiedAt && (
                    <div className="text-[10px] text-muted-foreground flex items-center justify-between font-mono pt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-primary" /> Success on {account.verifiedAt}
                      </span>
                    </div>
                  )}
                </div>

                {/* Bottom Actions Row */}
                <div className="flex items-center justify-between gap-2 pt-4 mt-3 border-t border-border/60">
                  {!isPrimary ? (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setPrimaryAccount(account.id)}
                      className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 cursor-pointer"
                    >
                      <Star className="w-3.5 h-3.5" /> Set as Primary
                    </Button>
                  ) : (
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Primary Account
                    </span>
                  )}

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(account.id, account.bankName)}
                    className="text-xs text-destructive hover:bg-destructive/10 hover:text-destructive flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Bank Account Modal */}
      <AddBankAccountDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
});
