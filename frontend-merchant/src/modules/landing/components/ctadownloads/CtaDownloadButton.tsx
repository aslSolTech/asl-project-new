'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Download, Star } from 'lucide-react';

export default function CtaDownloadButton() {
  return (
    <section id="download" className="py-20 relative scroll-mt-20 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-card p-8 sm:p-12 lg:p-16 shadow-2xl overflow-hidden relative">
          
          {/* Subtle Fintech Illustration Matrix in Download Card */}
          <div 
            className="absolute inset-0 opacity-[0.06] dark:opacity-[0.03] bg-repeat bg-center pointer-events-none select-none"
            style={{ backgroundImage: `url('/images/fintech-pattern.jpg')`, backgroundSize: '650px' }}
          />

          {/* Ambient Glowing Blobs in Corners */}
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

          {/* Decorative Vector Circuit Tech Accent */}
          <div className="absolute right-1/3 bottom-0 w-64 h-64 text-foreground/[0.02] dark:text-foreground/[0.04] pointer-events-none select-none">
            <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="100" cy="100" r="80" strokeDasharray="6 6" />
              <circle cx="100" cy="100" r="50" />
              <path d="M100 20 L100 180 M20 100 L180 100" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-lg text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary mb-4">
                <Download className="h-3 w-3" />
                Available on iOS & Android
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4 leading-tight">
                Download the ASL Wallets App
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base mb-6">
                Manage all your banking services, track commissions in real-time, and serve your customers — all from your smartphone.
              </p>

              {/* App rating */}
              <div className="flex items-center gap-2 justify-center lg:justify-start mb-8">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-bold text-foreground">4.8 / 5.0</span>
                <span className="text-xs text-muted-foreground">· 10,000+ Active Retailers</span>
              </div>

              {/* Download Buttons — proper store button style */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                {/* App Store */}
                <Link
                  href="#"
                  className="group flex items-center gap-3 px-5 py-3 rounded-2xl bg-card border border-primary/30 dark:border-primary/40 hover:border-primary hover:bg-primary/10 transition-all shadow-md shadow-primary/10 active:scale-95"
                >
                  {/* Apple logo SVG */}
                  <svg
                    className="h-7 w-7 text-foreground group-hover:text-primary group-hover:scale-110 transition-all flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] leading-none text-muted-foreground group-hover:text-foreground transition-colors">Download on the</span>
                    <span className="text-sm font-bold leading-tight text-foreground group-hover:text-primary transition-colors">App Store</span>
                  </div>
                </Link>

                {/* Google Play */}
                <Link
                  href="#"
                  className="group flex items-center gap-3 px-5 py-3 rounded-2xl bg-card border border-secondary/40 dark:border-secondary/50 hover:border-secondary hover:bg-secondary/10 transition-all shadow-md shadow-secondary/10 active:scale-95"
                >
                  {/* Official Google Play logo SVG */}
                  <svg
                    className="h-7 w-7 flex-shrink-0 group-hover:scale-110 transition-transform"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1z"
                      fill="#ea4335"
                    />
                    <path
                      d="M47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0z"
                      fill="#4285f4"
                    />
                    <path
                      d="M325.3 277.7l-220.7 221.3 280.8-161.2-60.1-60.1z"
                      fill="#34a853"
                    />
                    <path
                      d="M455.5 229.4l-70.1-40.2-60.1 60.1 60.1 60.1 70.1-40.2c16.3-9.4 26.6-25.6 26.6-44.9s-10.3-35.5-26.6-44.9z"
                      fill="#fbbc04"
                    />
                  </svg>
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] leading-none text-muted-foreground group-hover:text-foreground transition-colors">Get it on</span>
                    <span className="text-sm font-bold leading-tight text-foreground group-hover:text-secondary transition-colors">Google Play</span>
                  </div>
                </Link>
              </div>
            </motion.div>

            {/* Right: Realistic Smartphone Mockup with Rich Banking App UI */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative flex-shrink-0"
            >
              {/* Phone Outer Chassis */}
              <div className="relative w-[280px] h-[560px] rounded-[3rem] p-3 bg-zinc-950 border-4 border-zinc-800 shadow-2xl ring-1 ring-zinc-700/50 overflow-hidden">
                
                {/* Phone Inner Screen */}
                <div className="w-full h-full rounded-[2.3rem] bg-background border border-border flex flex-col justify-between overflow-hidden relative select-none">
                  
                  {/* Top Dynamic Island / Speaker Bar */}
                  <div className="pt-2 px-4 flex items-center justify-between z-20">
                    <span className="text-[10px] font-bold text-foreground">9:41</span>
                    <div className="w-20 h-4 rounded-full bg-zinc-950 flex items-center justify-end px-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <span className="text-[9px] font-bold text-foreground">5G 100%</span>
                  </div>

                  {/* App Screen Content Scrollable Area */}
                  <div className="p-3.5 space-y-3 flex-1 overflow-hidden">
                    
                    {/* Header in App */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-primary text-primary-foreground font-black text-xs flex items-center justify-center">
                          A
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-foreground leading-none">ASL Wallets</p>
                          <p className="text-[9px] text-muted-foreground">CSP Point</p>
                        </div>
                      </div>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        Online
                      </span>
                    </div>

                    {/* Mobile Wallet Balance Card */}
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-primary via-primary/95 to-secondary text-primary-foreground shadow-md shadow-primary/20 relative overflow-hidden">
                      <div className="flex items-center justify-between text-[10px] opacity-90 mb-1">
                        <span>Total Main Balance</span>
                        <span>₹ INR</span>
                      </div>
                      <div className="text-xl font-black tracking-tight mb-2">
                        ₹ 84,250.00
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-white/20 text-[9px]">
                        <span>Today: +₹3,840</span>
                        <span className="font-bold underline">Add Money +</span>
                      </div>
                    </div>

                    {/* Quick 4 Icon Action Bar */}
                    <div>
                      <div className="text-[10px] font-bold text-foreground mb-1.5">Quick Banking</div>
                      <div className="grid grid-cols-4 gap-1.5 text-center">
                        <div className="p-2 rounded-xl bg-muted/60 border border-border">
                          <div className="w-4 h-4 rounded-full bg-primary/20 text-primary mx-auto mb-1 flex items-center justify-center text-[10px] font-bold">⚡</div>
                          <span className="text-[8px] font-bold text-foreground block">AEPS</span>
                        </div>
                        <div className="p-2 rounded-xl bg-muted/60 border border-border">
                          <div className="w-4 h-4 rounded-full bg-secondary/20 text-secondary mx-auto mb-1 flex items-center justify-center text-[10px] font-bold">₹</div>
                          <span className="text-[8px] font-bold text-foreground block">DMT</span>
                        </div>
                        <div className="p-2 rounded-xl bg-muted/60 border border-border">
                          <div className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-600 mx-auto mb-1 flex items-center justify-center text-[10px] font-bold">📱</div>
                          <span className="text-[8px] font-bold text-foreground block">Recharge</span>
                        </div>
                        <div className="p-2 rounded-xl bg-muted/60 border border-border">
                          <div className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-600 mx-auto mb-1 flex items-center justify-center text-[10px] font-bold">📄</div>
                          <span className="text-[8px] font-bold text-foreground block">BBPS</span>
                        </div>
                      </div>
                    </div>

                    {/* Mini Live Transactions in Mobile Screen */}
                    <div>
                      <div className="text-[10px] font-bold text-foreground mb-1.5">Recent Activity</div>
                      <div className="space-y-1.5">
                        <div className="p-2 rounded-lg border border-border bg-card flex items-center justify-between text-[9px]">
                          <div>
                            <span className="font-bold text-foreground block">AEPS Cash Out</span>
                            <span className="text-muted-foreground">SBI • Success</span>
                          </div>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">+₹2,500</span>
                        </div>
                        <div className="p-2 rounded-lg border border-border bg-card flex items-center justify-between text-[9px]">
                          <div>
                            <span className="font-bold text-foreground block">Electricity Bill</span>
                            <span className="text-muted-foreground">BBPS • Paid</span>
                          </div>
                          <span className="font-bold text-foreground">-₹840</span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* App Bottom Dock Navigation */}
                  <div className="p-2 border-t border-border bg-muted/40 flex items-center justify-around text-[9px] font-bold text-muted-foreground">
                    <span className="text-primary">Home</span>
                    <span>Reports</span>
                    <span>Wallet</span>
                    <span>Profile</span>
                  </div>

                  {/* Bottom Home Indicator Bar */}
                  <div className="pb-1 pt-0.5 flex justify-center">
                    <div className="w-24 h-1 rounded-full bg-muted-foreground/40" />
                  </div>

                </div>

              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}