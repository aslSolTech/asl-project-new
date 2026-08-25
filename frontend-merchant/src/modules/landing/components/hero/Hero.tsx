'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, ArrowUpRight, Smartphone, Building, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-20 md:pt-16 md:pb-28">
      {/* Background Fintech Illustration Matrix Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.05] dark:opacity-[0.03] bg-repeat bg-center pointer-events-none -z-10 select-none"
        style={{ backgroundImage: `url('/images/fintech-pattern.jpg')`, backgroundSize: '750px' }}
      />
      {/* Radiant ambient aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[450px] bg-gradient-to-b from-primary/10 via-amber-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* ── LEFT: Value Proposition & CTAs (7 Cols) ── */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Top Verified Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold text-foreground mb-6 shadow-xs backdrop-blur-md"
            >
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-primary">ASL WALLETS</span>
              <span className="text-muted-foreground">•</span>
              <span>NPCI & BBPS Certified Platform</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.08] mb-6"
            >
              India&apos;s Fastest Banking & AEPS Suite for{' '}
              <span className="bg-gradient-to-r from-primary via-amber-500 to-secondary bg-clip-text text-transparent">
                Retail CSP Leaders
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-8 font-normal leading-relaxed"
            >
              Supercharge your shop with AEPS cash withdrawal, Instant DMT, Bharat BillPay (BBPS), Micro ATM, and PAN Card APIs from a single high-speed wallet with guaranteed maximum commission.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10"
            >
              <Link
                href="/login"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-primary/95 text-primary-foreground font-bold text-sm shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Launch CSP Terminal</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="#services"
                className="w-full sm:w-auto px-7 py-4 rounded-xl border border-border bg-card text-foreground font-bold text-sm hover:border-primary/40 hover:bg-muted transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>View All 25+ Services</span>
                <ArrowUpRight className="w-4 h-4 text-primary" />
              </Link>
            </motion.div>

            {/* Guarantee / Key Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-border"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Instant Wallet Settlement</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                <span>99.98% Gateway Uptime</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-foreground col-span-2 sm:col-span-1">
                <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Highest Commission Slabs</span>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: Professional Live Merchant Hub Card (5 Cols) with Floating Badges ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Floating Top-Left Micro-Badge */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-5 -left-4 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-card shadow-lg shadow-emerald-500/10 text-xs font-bold text-foreground backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>AEPS Live: 100% Success</span>
            </motion.div>

            {/* Floating Bottom-Right Profit Badge */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -bottom-4 -right-3 z-20 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl border border-primary/30 bg-card shadow-xl shadow-primary/10 text-xs font-bold text-foreground backdrop-blur-md"
            >
              <div className="w-5 h-5 rounded-md bg-primary/10 text-primary flex items-center justify-center font-black">
                ₹
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground block leading-none">Instant Commission</span>
                <span className="text-xs font-black text-primary">+₹ 14.50 / Txn</span>
              </div>
            </motion.div>

            <div className="rounded-2xl border border-border bg-card shadow-2xl overflow-hidden relative">
              
              {/* Card Top Header */}
              <div className="p-5 border-b border-border bg-muted/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary text-primary-foreground font-black text-sm flex items-center justify-center shadow-xs">
                    ASL
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-foreground">Merchant Live Terminal</h2>
                    <p className="text-[11px] text-muted-foreground font-mono">ID: ASL-IND-88419</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> {" "}
                  Live Sync
                </div>
              </div>

              {/* Wallet Live Balance Box */}
              <div className="p-6 space-y-5">
                <div className="p-4 rounded-xl border border-border bg-muted/20 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider block mb-1">
                      Available Balance
                    </span>
                    <div className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
                      ₹ 1,48,250<span className="text-sm font-semibold text-muted-foreground">.00</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                      +₹3,820 Today
                    </span>
                    <span className="block text-[10px] text-muted-foreground mt-1">Real-time Payout</span>
                  </div>
                </div>

                {/* Quick Service Grid with Framer Motion hovers */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-foreground mb-3">
                    <span>Instant Services</span>
                    <span className="text-[11px] text-primary font-medium">All Active</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2.5">
                    <motion.div whileHover={{ y: -3 }} className="p-2.5 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors text-center cursor-pointer">
                      <Smartphone className="w-4 h-4 text-primary mx-auto mb-1" />
                      <span className="text-[11px] font-bold text-foreground block">Mobile / DTH</span>
                      <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold">Instant</span>
                    </motion.div>
                    <motion.div whileHover={{ y: -3 }} className="p-2.5 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors text-center cursor-pointer">
                      <Building className="w-4 h-4 text-secondary mx-auto mb-1" />
                      <span className="text-[11px] font-bold text-foreground block">AEPS Cash</span>
                      <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold">Zero Fee</span>
                    </motion.div>
                    <motion.div whileHover={{ y: -3 }} className="p-2.5 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors text-center cursor-pointer">
                      <RefreshCw className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                      <span className="text-[11px] font-bold text-foreground block">DMT Transfer</span>
                      <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold">IMPS / NEFT</span>
                    </motion.div>
                  </div>
                </div>

                {/* Recent Live Feed Transactions */}
                <div>
                  <span className="text-xs font-bold text-foreground block mb-2.5">
                    Recent Transactions (Live Stream)
                  </span>
                  <div className="space-y-2">
                    <motion.div whileHover={{ x: 3 }} className="flex items-center justify-between p-2.5 rounded-lg border border-border bg-muted/10 text-xs transition-colors">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <div>
                          <span className="font-semibold text-foreground block leading-tight">AEPS Cash Withdrawal</span>
                          <span className="text-[10px] text-muted-foreground">State Bank of India • 10:42 AM</span>
                        </div>
                      </div>
                      <span className="font-bold text-foreground">+₹ 10,000.00</span>
                    </motion.div>
                    <motion.div whileHover={{ x: 3 }} className="flex items-center justify-between p-2.5 rounded-lg border border-border bg-muted/10 text-xs transition-colors">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <div>
                          <span className="font-semibold text-foreground block leading-tight">BBPS Electricity Bill</span>
                          <span className="text-[10px] text-muted-foreground">UPPCL Rural • 10:39 AM</span>
                        </div>
                      </div>
                      <span className="font-bold text-foreground">+₹ 2,450.00</span>
                    </motion.div>
                  </div>
                </div>

                {/* Bottom Trust CTA inside card */}
                <div className="pt-2">
                  <Link
                    href="/signup"
                    className="w-full py-2.5 rounded-lg bg-muted border border-border hover:bg-primary/10 hover:border-primary/40 hover:text-primary transition-all text-xs font-bold text-center block text-foreground cursor-pointer"
                  >
                    Open Merchant CSP Account in 2 Minutes →
                  </Link>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
