"use client";

import { memo, useMemo, useState } from "react";
import {
  HelpCircle,
  Building2,
  Clock,
  ShieldCheck,
  Phone,
  Mail,
  Headphones,
  CheckCircle2,
  Plus,
  Search,
  MessageSquare,
  AlertCircle,
  FileQuestion,
  Calendar,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { toast } from "sonner";
import { useCreateMessagesMutation, useMessagesListQuery } from "@/modules/merchant/contact/messages/hooks";
import { TRANSACTION_TYPE_OPTIONS } from "@/modules/merchant/contact/messages/constants";
import { messagesSchema } from "@/modules/merchant/contact/messages/validations";

export const ContactSupportView = memo(function ContactSupportView() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [errors, setErrors] = useState<{ transactionType?: string; message?: string }>({});
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>("ALL");

  const createMutation = useCreateMessagesMutation();
  const { data: messagesHistory, isLoading: isLoadingHistory } = useMessagesListQuery();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const validation = messagesSchema.safeParse({
      transactionType,
      message,
    });

    if (!validation.success) {
      const fieldErrors: { transactionType?: string; message?: string } = {};
      for (const issue of validation.error.issues) {
        if (issue.path[0] === "transactionType") {
          fieldErrors.transactionType = issue.message;
        } else if (issue.path[0] === "message") {
          fieldErrors.message = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    try {
      await createMutation.mutateAsync({
        transactionType,
        message,
      });
      toast.success("Support ticket submitted to Admin successfully!");
      setTransactionType("");
      setMessage("");
      setIsModalOpen(false);
    } catch {
      // Error handled by mutation hook
    }
  };

  // Sort newest queries on top and apply search/filter
  const filteredMessages = useMemo(() => {
    if (!messagesHistory) return [];

    // Clone and sort descending by timestamp/id (newest first)
    const sorted = [...messagesHistory].sort((a, b) => {
      const rawA = a.created_at || a.createdAt;
      const rawB = b.created_at || b.createdAt;
      const timeA = rawA ? new Date(rawA).getTime() : 0;
      const timeB = rawB ? new Date(rawB).getTime() : 0;
      return timeB - timeA;
    });

    return sorted.filter((item) => {
      const matchesSearch =
        (item.message?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (item.transactionType?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (item.name?.toLowerCase() || "").includes(searchQuery.toLowerCase());

      const matchesType =
        selectedTypeFilter === "ALL" || item.transactionType === selectedTypeFilter;

      return matchesSearch && matchesType;
    });
  }, [messagesHistory, searchQuery, selectedTypeFilter]);

  const renderHistoryContent = () => {
    if (isLoadingHistory) {
      return (
        <div className="p-12 text-center text-xs text-muted-foreground animate-pulse space-y-2">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto" />
          <p>Loading recent support queries...</p>
        </div>
      );
    }

    if (!filteredMessages || filteredMessages.length === 0) {
      return (
        <div className="p-12 text-center rounded-3xl bg-muted/20 border border-border/60 text-xs text-muted-foreground space-y-3">
          <MessageSquare className="w-10 h-10 text-muted-foreground/40 mx-auto" />
          <div>
            <h4 className="font-bold text-foreground text-sm">No support queries found</h4>
            <p className="text-muted-foreground mt-1">
              {searchQuery
                ? `No query matching "${searchQuery}" found.`
                : "You have not raised any support query yet. Click \"New Support Ticket\" to raise one."}
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {filteredMessages.map((item) => {
          const rawDate = item.created_at || item.createdAt;
          const formattedDate = rawDate
            ? new Date(rawDate).toLocaleString("en-IN", {
                dateStyle: "medium",
                timeStyle: "short",
              })
            : "Recent";

          return (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-card border border-border/80 hover:border-primary/40 hover:shadow-xs transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 bg-muted/40">
                    {item.transactionType || "General Query"}
                  </Badge>
                  <span className="text-xs font-semibold text-foreground truncate">
                    {item.name || "Merchant Ticket"}
                  </span>
                  <span className="text-[11px] text-muted-foreground flex items-center gap-1 ml-auto md:ml-0 font-mono">
                    <Calendar className="w-3 h-3 text-muted-foreground" />
                    {formattedDate}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground/90 whitespace-pre-line break-words leading-relaxed pt-1">
                  {item.message}
                </p>
              </div>

              <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-[10px] font-semibold flex items-center gap-1 px-2.5 py-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {item.status || "Submitted to Admin"}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="mx-auto w-full space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="rounded-3xl bg-card border border-border p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 shadow-inner">
              <Headphones className="w-7 h-7 stroke-[1.8]" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                  Help &amp; Contact Support
                </h1>
                <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px] px-2 py-0.5 uppercase font-mono">
                  Admin Desk
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl">
                View your raised support queries, track resolution status, or raise a new ticket directly with Admin.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-muted/40 border border-border/80">
              <Clock className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-semibold text-foreground">SLA: 15-30 mins</span>
            </div>

            {/* + New Support Ticket Button */}
            <Button
              onClick={() => setIsModalOpen(true)}
              className="h-11 px-5 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              New Support Ticket
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Layout: Left Queries List (Recent First) & Right Contacts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Recent Support Queries List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-3xl bg-card border border-border p-6 shadow-xs space-y-5">
            {/* Header with Search and Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
              <div>
                <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-primary" />
                  Your Raised Queries &amp; Tickets
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Showing all tickets with newest queries placed on top
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <div className="relative w-full sm:w-56">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search queries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 h-9 text-xs rounded-xl"
                  />
                </div>

                <Select value={selectedTypeFilter} onValueChange={(val) => setSelectedTypeFilter(val || "ALL")}>
                  <SelectTrigger className="h-9 text-xs rounded-xl w-32">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL" className="text-xs">All Types</SelectItem>
                    {TRANSACTION_TYPE_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value} className="text-xs">
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Render Queries List */}
            {renderHistoryContent()}
          </div>
        </div>

        {/* Right 1 Col: Quick Support Info & Emergency Desk */}
        <div className="space-y-6">
          {/* Quick Guidance Card */}
          <div className="rounded-3xl bg-card border border-border p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">Admin Helpdesk</h3>
                <p className="text-[11px] text-muted-foreground">Direct merchant escalation</p>
              </div>
            </div>

            <div className="space-y-3 pt-1 text-xs text-muted-foreground">
              <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-muted/40 border border-border/80">
                <FileQuestion className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-foreground block">Include Txn ID / Reference</span>
                  <p>Mention your Transaction Reference No. (Txn ID / RRN) in the message for quick refunds or dispute handling.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-muted/40 border border-border/80">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-foreground block">Direct Admin Queue</span>
                  <p>Your ticket goes straight to the supervisor/admin console for priority tracking.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Hotlines */}
          <div className="rounded-3xl bg-card border border-border p-6 shadow-xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Emergency Hotlines
            </h4>
            <div className="space-y-2.5 text-xs">
              <a
                href="tel:+919997669866"
                className="flex items-center justify-between p-3 rounded-2xl bg-muted/30 hover:bg-muted/60 border border-border/80 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-primary" />
                  <span className="font-medium text-foreground">Call Support</span>
                </div>
                <span className="font-mono text-muted-foreground">+91 99976 69866</span>
              </a>

              <a
                href="mailto:info@aslwallets.co.in"
                className="flex items-center justify-between p-3 rounded-2xl bg-muted/30 hover:bg-muted/60 border border-border/80 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-primary" />
                  <span className="font-medium text-foreground">Email Desk</span>
                </div>
                <span className="font-mono text-muted-foreground text-[11px]">info@aslwallets.co.in</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Support Ticket Modal Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader className="border-b border-border pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <DialogTitle className="text-lg font-bold">
                  New Support Ticket
                </DialogTitle>
                <DialogDescription className="sr-only">Support Ticket Form</DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 pt-1">
            {/* Transaction Type Select */}
            <div className="space-y-1.5">
              <Label htmlFor="modalTransactionType" className="text-xs font-semibold">
                Transaction Type / Department <span className="text-destructive">*</span>
              </Label>
              <Select
                value={transactionType}
                onValueChange={(val) => {
                  setTransactionType(val || "");
                  if (errors.transactionType) {
                    setErrors((prev) => ({ ...prev, transactionType: undefined }));
                  }
                }}
              >
                <SelectTrigger
                  id="modalTransactionType"
                  className={`w-full h-11 rounded-xl bg-background text-xs ${
                    errors.transactionType ? "border-destructive focus-visible:ring-destructive" : ""
                  }`}
                >
                  <SelectValue placeholder="Select type (Service, Fund, Website, Others)..." />
                </SelectTrigger>
                <SelectContent>
                  {TRANSACTION_TYPE_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value} className="text-xs">
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.transactionType && (
                <p className="text-xs text-destructive flex items-center gap-1 font-medium mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.transactionType}
                </p>
              )}
            </div>

            {/* Message Textarea */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="modalMessage" className="text-xs font-semibold">
                  Query / Message <span className="text-destructive">*</span>
                </Label>
                <span className="text-[10px] text-muted-foreground">{message.length}/1000</span>
              </div>
              <Textarea
                id="modalMessage"
                placeholder="Describe your issue or query in detail (Txn ID, error details, request)..."
                rows={5}
                value={message}
                maxLength={1000}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (errors.message) {
                    setErrors((prev) => ({ ...prev, message: undefined }));
                  }
                }}
                className={`rounded-xl bg-background resize-none text-xs ${
                  errors.message ? "border-destructive focus-visible:ring-destructive" : ""
                }`}
              />
              {errors.message && (
                <p className="text-xs text-destructive flex items-center gap-1 font-medium mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.message}
                </p>
              )}
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
                disabled={createMutation.isPending}
                className="h-11 px-6 rounded-xl text-xs font-bold uppercase tracking-wider bg-primary hover:bg-primary/90 shadow-sm flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                {createMutation.isPending ? "Submitting..." : "Submit Ticket"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
});

