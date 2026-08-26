'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  ArrowUpRight, 
  Building2, 
  Fingerprint,
  Wifi,
  QrCode,
  Activity,
  Check,
  Send,
  Copy,
  Eye,
  EyeOff,
  Volume2,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';

// Simulated realistic transaction feed
const SIMULATED_TXN_FEED = [
  { id: 1, type: 'AEPS Cash', bank: 'State Bank of India', amount: '₹10,000.00', comm: '+₹14.50', status: 'Success', time: 'Just now' },
  { id: 2, type: 'Instant DMT', bank: 'HDFC Bank IMPS', amount: '₹25,000.00', comm: '+₹12.00', status: 'Success', time: '12s ago' },
  { id: 3, type: 'BBPS Utility', bank: 'UPPCL Electricity', amount: '₹3,420.00', comm: '+₹4.50', status: 'Success', time: '28s ago' },
  { id: 4, type: 'Micro ATM', bank: 'Bank of Baroda', amount: '₹8,000.00', comm: '+₹11.00', status: 'Success', time: '45s ago' },
];

export default function Hero() {
  const [activeTab, setActiveTab] = useState<'aeps' | 'dmt' | 'qr'>('aeps');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState<'idle' | 'scanning' | 'verifying' | 'success'>('idle');
  const [liveTxnCount, setLiveTxnCount] = useState(14829);
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [copied, setCopied] = useState(false);
  const [feedIndex, setFeedIndex] = useState(0);

  // Periodic simulated live scan and transaction feed cycle
  useEffect(() => {
    const scanTimer = setInterval(() => {
      setIsScanning(true);
      setScanStep('scanning');
      
      setTimeout(() => {
        setScanStep('verifying');
      }, 900);

      setTimeout(() => {
        setScanStep('success');
        setLiveTxnCount(prev => prev + 1);
        setFeedIndex(prev => (prev + 1) % SIMULATED_TXN_FEED.length);
      }, 1700);

      setTimeout(() => {
        setIsScanning(false);
        setScanStep('idle');
      }, 3200);
    }, 7000);

    return () => clearInterval(scanTimer);
  }, []);

  const handleCopyCard = () => {
    navigator.clipboard.writeText('6074 8841 9204 8841');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentTxn = SIMULATED_TXN_FEED[feedIndex];

  return (
    <section className="relative overflow-hidden pt-8 pb-20 md:pt-14 md:pb-32">
      {/* Background Architectural Mesh & Subtle Saffron-Emerald Atmosphere */}
      <div 
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.045] bg-[radial-gradient(var(--primary)_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none -z-10" 
      />
      {/* Precision ambient diffusion */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[480px] bg-gradient-to-b from-primary/10 via-amber-500/5 to-transparent blur-[120px] pointer-events-none -z-10" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          
          {/* ── LEFT: Enterprise Value Proposition (6.8 Cols) ── */}
          <div className="lg:col-span-7 text-center lg:text-left">
            
            {/* Live Certified Switch Telemetry Pill */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-primary/25 bg-card/80 dark:bg-card/40 text-xs font-semibold text-foreground mb-6 shadow-xs backdrop-blur-xl"
            >
              <div className="relative flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping absolute opacity-75" />
                <span className="w-2 h-2 rounded-full bg-secondary relative" />
              </div>
              <span className="font-bold text-primary tracking-wide">ASL 2.0 PROTOCOL</span>
              <span className="text-muted-foreground/60">•</span>
              <span className="text-muted-foreground font-medium">NPCI & BBPS Direct Core Switch</span>
              <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-bold">
                12ms P99
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[3.65rem] font-black tracking-tight text-foreground leading-[1.06] mb-6"
            >
              Enterprise Banking & AEPS Infrastructure for{' '}
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
              Empower your CSP retail counter with high-availability AEPS 2.0 cash withdrawal, instant 24x7 multi-pipe DMT, Bharat BillPay (BBPS), and auto-settled virtual RuPay smart wallets with industry-maximum commission yield.
            </motion.p>

            {/* CTA Action Bar */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10"
            >
              <Link
                href="/login"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-primary via-primary to-primary/95 text-primary-foreground font-bold text-sm shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer border border-white/10"
              >
                <span>Launch CSP Terminal</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="#services"
                className="w-full sm:w-auto px-7 py-4 rounded-xl border border-border/90 bg-card/70 backdrop-blur-md text-foreground font-bold text-sm hover:border-primary/50 hover:bg-muted/80 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Explore 25+ APIs & Services</span>
                <ArrowUpRight className="w-4 h-4 text-primary" />
              </Link>
            </motion.div>

            {/* Key Architectural Trust Metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-border/80"
            >
              <div className="flex items-center gap-3 text-xs font-semibold text-foreground">
                <div className="w-8 h-8 rounded-xl bg-secondary/10 border border-secondary/20 text-secondary flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-bold">Instant Settlement</span>
                  <span className="text-[11px] text-muted-foreground">T+0 Direct Bank Credit</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs font-semibold text-foreground">
                <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-bold">99.99% Core Uptime</span>
                  <span className="text-[11px] text-muted-foreground">Multi-Bank Failover Switch</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs font-semibold text-foreground col-span-2 sm:col-span-1">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-bold">Max Slab Commission</span>
                  <span className="text-[11px] text-muted-foreground">Up to ₹14.50 Per Txn</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: Staff-Level SaaS Fintech Terminal & Virtual Card (5.2 Cols) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            
            {/* Floating Top Mini-Badge: Latency & Switch Uptime */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-5 -left-3 z-30 hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-xl border border-secondary/30 bg-card/95 shadow-xl shadow-secondary/10 text-xs font-bold text-foreground backdrop-blur-xl"
            >
              <div className="relative flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping absolute" />
                <span className="w-2 h-2 rounded-full bg-secondary relative" />
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground block leading-none font-medium">NPCI Switch Latency</span>
                <span className="text-xs font-black text-secondary">12ms • 100% Success</span>
              </div>
            </motion.div>

            {/* Floating Bottom Live Commission Credited Toast */}
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              className="absolute -bottom-5 -right-3 z-30 hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-xl border border-primary/30 bg-card/95 shadow-2xl shadow-primary/15 text-xs font-bold text-foreground backdrop-blur-xl"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-amber-600 text-primary-foreground flex items-center justify-center font-black shadow-xs">
                ₹
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold text-foreground">Commission Disbursed</span>
                  <span className="text-[9px] text-secondary font-bold bg-secondary/10 px-1.5 py-0.2 rounded">T+0 Auto</span>
                </div>
                <span className="text-xs font-black text-secondary">{currentTxn.comm} ({currentTxn.type})</span>
              </div>
            </motion.div>

            {/* Main Terminal Container Card */}
            <div className="rounded-2xl border border-border/80 bg-card/95 shadow-2xl shadow-black/10 dark:shadow-black/40 backdrop-blur-2xl overflow-hidden relative">
              
              {/* Terminal Titlebar with Status Beacon */}
              <div className="p-4 sm:p-5 border-b border-border/70 bg-muted/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-amber-600 text-primary-foreground font-black text-xs flex items-center justify-center shadow-md shadow-primary/20 tracking-wider">
                    ASL
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xs font-bold text-foreground">CSP Terminal Core</h2>
                      <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-mono font-bold">L1 SECURE</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground font-mono">Node ID: #ASL-IN-8842</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-[11px] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                    Auto-Settled
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6 space-y-5">
                
                {/* ── Virtual RuPay Platinum Smart Card with Glassmorphism ── */}
                <div className="relative rounded-2xl p-5 overflow-hidden text-white bg-gradient-to-br from-[#0B192C] via-[#102A43] to-[#1E3A5F] border border-white/15 shadow-2xl shadow-slate-950/30 group">
                  
                  {/* Atmospheric Light Rays */}
                  <div className="absolute top-0 right-0 -mt-8 -mr-8 w-44 h-44 bg-amber-500/25 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-44 h-44 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
                  
                  {/* Subtle Geometric Card Grid Overlay */}
                  <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

                  {/* Card Header: Chip, Contactless NFC & RuPay Logo */}
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <div className="flex items-center gap-3">
                      {/* Realistic Gold EMV Chip */}
                      <div className="w-9 h-7 rounded-md bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 border border-amber-200/80 p-1 shadow-sm relative">
                        <div className="w-full h-full border border-amber-800/40 rounded-[2px] grid grid-cols-2 gap-0.5">
                          <div className="border-r border-amber-800/30" />
                          <div />
                        </div>
                      </div>
                      <Wifi className="w-4 h-4 text-white/80 rotate-90" />
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-black tracking-widest bg-gradient-to-r from-orange-400 via-white to-green-400 bg-clip-text text-transparent">
                        RuPay
                      </span>
                      <span className="block text-[8px] font-mono text-white/70 tracking-widest uppercase">PLATINUM CSP</span>
                    </div>
                  </div>

                  {/* Settlement Wallet Balance & Live Sparkline */}
                  <div className="mb-4 relative z-10">
                    <div className="flex items-center justify-between text-[10px] text-amber-200/80 font-medium tracking-wider uppercase mb-1">
                      <span>CSP Settlement Wallet</span>
                      <span className="font-mono text-white/60">LIVE FEED</span>
                    </div>
                    <div className="flex items-baseline justify-between gap-2">
                      <div className="text-2xl sm:text-3xl font-black tracking-tight text-white font-sans">
                        ₹ 2,48,520<span className="text-sm font-normal text-amber-100">.00</span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/20 border border-emerald-400/30 px-2 py-0.5 rounded-full">
                        <TrendingUp className="w-3 h-3" />
                        <span>+₹4,180.00 Today</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Number Mask & Copy Button */}
                  <div className="flex items-center justify-between text-xs text-white/90 font-mono pt-3 border-t border-white/10 relative z-10">
                    <div className="flex items-center gap-2">
                      <span className="tracking-widest text-[11px] sm:text-xs">
                        {showCardNumber ? '6074 8841 9204 8841' : '•••• •••• •••• 8841'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowCardNumber(!showCardNumber)}
                        className="text-white/60 hover:text-white transition-colors cursor-pointer p-0.5"
                        title={showCardNumber ? 'Hide number' : 'Show number'}
                      >
                        {showCardNumber ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      </button>
                      <button
                        type="button"
                        onClick={handleCopyCard}
                        className="text-white/60 hover:text-white transition-colors cursor-pointer p-0.5"
                        title="Copy card number"
                      >
                        {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>

                    <div className="flex items-center gap-3 text-[10px]">
                      <span className="text-white/70">VAL 12/29</span>
                      <span className="font-sans font-bold text-[9px] uppercase px-1.5 py-0.5 rounded bg-primary/30 border border-primary/40 text-primary-foreground">
                        KYC VERIFIED
                      </span>
                    </div>
                  </div>
                </div>

                {/* ── Interactive Live Terminal Switch Tabs ── */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-2.5">
                    <span className="font-bold text-foreground flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-primary" />
                      Live Transaction Engine
                    </span>
                    <span className="text-[11px] text-muted-foreground font-mono">
                      Txn Hash: #{liveTxnCount}
                    </span>
                  </div>

                  {/* Mode Selector Buttons */}
                  <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-muted/60 border border-border">
                    <button
                      type="button"
                      onClick={() => setActiveTab('aeps')}
                      className={`py-1.5 text-[11px] font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer relative ${
                        activeTab === 'aeps'
                          ? 'bg-card text-primary shadow-xs border border-border/80'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Fingerprint className="w-3.5 h-3.5" />
                      <span>AEPS 2.0</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab('dmt')}
                      className={`py-1.5 text-[11px] font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        activeTab === 'dmt'
                          ? 'bg-card text-primary shadow-xs border border-border/80'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Instant DMT</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab('qr')}
                      className={`py-1.5 text-[11px] font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        activeTab === 'qr'
                          ? 'bg-card text-primary shadow-xs border border-border/80'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>BBPS & QR</span>
                    </button>
                  </div>
                </div>

                {/* ── Active Terminal Dynamic View (AEPS / DMT / QR) ── */}
                <div className="p-4 rounded-xl border border-border/80 bg-muted/20">
                  <AnimatePresence mode="wait">
                    
                    {/* AEPS 2.0 Biometric Flow */}
                    {activeTab === 'aeps' && (
                      <motion.div
                        key="aeps"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`relative p-2.5 rounded-xl border ${
                              scanStep === 'scanning' || scanStep === 'verifying'
                                ? 'bg-primary text-primary-foreground border-primary shadow-md shadow-primary/30'
                                : 'bg-secondary/10 text-secondary border-secondary/20'
                            } transition-all`}>
                              <Fingerprint className="w-6 h-6" />
                              {(scanStep === 'scanning' || scanStep === 'verifying') && (
                                <motion.div 
                                  initial={{ y: -8 }}
                                  animate={{ y: 8 }}
                                  transition={{ repeat: Infinity, repeatType: 'reverse', duration: 0.6 }}
                                  className="absolute left-0 right-0 top-1/2 h-0.5 bg-amber-200 shadow-[0_0_10px_#f59e0b]"
                                />
                              )}
                            </div>
                            <div>
                              <span className="text-xs font-bold text-foreground block">
                                {scanStep === 'scanning' && 'Reading Aadhaar Biometric Fingerprint...'}
                                {scanStep === 'verifying' && 'Validating UIDAI RD-L1 Vault Certificate...'}
                                {scanStep === 'success' && 'Biometric Authentication: Approved ✓'}
                                {scanStep === 'idle' && 'Biometric RD-L1 Service: Ready ✓'}
                              </span>
                              <span className="text-[10px] text-muted-foreground">
                                UIDAI 2.0 Auth API • 2-Factor RD Ready
                              </span>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <span className="text-xs font-black text-foreground block">₹ 10,000.00</span>
                            <span className="text-[9px] text-secondary font-bold bg-secondary/10 px-1.5 py-0.5 rounded">
                              +₹14.50 Comm
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2.5 border-t border-border text-[10px] text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                            <span>Bank: <strong className="text-foreground">State Bank of India</strong></span>
                          </div>
                          <span className="text-secondary font-semibold flex items-center gap-1">
                            <Check className="w-3 h-3" /> Auto Cash-Out T+0
                          </span>
                        </div>
                      </motion.div>
                    )}

                    {/* Instant DMT Flow */}
                    {activeTab === 'dmt' && (
                      <motion.div
                        key="dmt"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                              <Building2 className="w-6 h-6" />
                            </div>
                            <div>
                              <span className="text-xs font-bold text-foreground block">
                                Direct IMPS 24x7 Multi-Pipe
                              </span>
                              <span className="text-[10px] text-muted-foreground">
                                ICICI & HDFC Direct Switch Core
                              </span>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <span className="text-xs font-black text-foreground block">₹ 25,000.00</span>
                            <span className="text-[9px] text-primary font-bold bg-primary/10 px-1.5 py-0.5 rounded">
                              IMPS Instant
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2.5 border-t border-border text-[10px] text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                            <span>Routing: <strong className="text-foreground">NPCI Direct 2-Step Pipe</strong></span>
                          </div>
                          <span className="text-secondary font-semibold">Latency: 14ms</span>
                        </div>
                      </motion.div>
                    )}

                    {/* Dynamic QR & BBPS Flow */}
                    {activeTab === 'qr' && (
                      <motion.div
                        key="qr"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400">
                              <QrCode className="w-6 h-6" />
                            </div>
                            <div>
                              <span className="text-xs font-bold text-foreground block">
                                Dynamic Bharat QR & Soundbox
                              </span>
                              <span className="text-[10px] text-muted-foreground">
                                All UPI Apps + 20,000+ Bharat Billers
                              </span>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <span className="text-xs font-black text-foreground block">₹ 1,850.00</span>
                            <span className="text-[9px] text-amber-600 dark:text-amber-400 font-bold bg-amber-500/10 px-1.5 py-0.5 rounded">
                              0% MDR Fee
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2.5 border-t border-border text-[10px] text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Volume2 className="w-3 h-3 text-secondary animate-pulse" />
                            <span>Voice Alert: <strong className="text-foreground">Instant Confirmation</strong></span>
                          </div>
                          <span className="text-secondary font-semibold">Auto-Settled</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Card Bottom Direct Terminal Activation Link */}
                <div>
                  <Link
                    href="/signup"
                    className="w-full py-3 rounded-xl bg-muted/80 hover:bg-primary hover:text-primary-foreground border border-border transition-all text-xs font-bold text-center block text-foreground cursor-pointer shadow-xs group"
                  >
                    <span>Activate Retailer CSP Account in 2 Minutes</span>
                    <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform">→</span>
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
