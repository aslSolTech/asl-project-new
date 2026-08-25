'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { providers, partnerTickers, providerStats } from '../../constants';
import Link from 'next/link';

export default function ProvidersSection() {
  const doubled = [...partnerTickers, ...partnerTickers];

  return (
    <section className="py-24 border-t border-border bg-muted/20 relative overflow-hidden">
      {/* Background illustration pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] bg-repeat bg-center pointer-events-none -z-10"
        style={{ backgroundImage: `url('/images/fintech-pattern.jpg')`, backgroundSize: '800px' }}
      />

      <div className="mx-auto max-w-7xl relative">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-primary mb-2 block">
            National Banking & Utility Ecosystem
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Integrated with India&apos;s Leading Banks & Billers
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground">
            Direct integration with NPCI, BBPS, NSDL, and top public/private sector banks for 99.98% success rates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Service Checklist (7 Cols) */}
          <div className="lg:col-span-7">
            <h3 className="text-lg font-bold text-foreground mb-4">
              Supported Banking & Financial Services
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {providers.map((provider, index) => (
                <motion.div
                  key={provider}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ x: 4 }}
                  transition={{ delay: index * 0.04, duration: 0.3 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-card border border-border hover:border-primary/40 transition-all cursor-pointer shadow-xs"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="text-xs font-bold text-foreground">{provider}</span>
                </motion.div>
              ))}
            </div>

            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-md shadow-primary/20 hover:bg-primary/90 transition-all cursor-pointer"
            >
              <span>Integrate with All Providers</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right: Authentic Real-World Merchant Point (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xl relative overflow-hidden">
              
              {/* Real Merchant CSP Photography Banner */}
              <div className="relative w-full h-48 sm:h-52 rounded-xl mb-6 overflow-hidden border border-border bg-muted">
                <img 
                  src="/images/merchant-csp-point.jpg" 
                  alt="Real ASL Wallets Merchant CSP Point" 
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-background/90 backdrop-blur-md border border-border text-[11px] font-bold text-foreground shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Authorized Merchant CSP Point</span>
                </div>
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-primary mb-1 block">
                Ecosystem Performance
              </span>
              <div className="text-3xl sm:text-4xl font-black text-foreground mb-2">25+ Banking APIs</div>
              <p className="text-xs text-muted-foreground mb-6">
                All accessible through a single unified ASL Wallets balance without separate minimum deposits.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-5 border-t border-border">
                {providerStats.map((stat) => (
                  <div key={stat.label} className="p-3 rounded-xl bg-muted/30 border border-border">
                    <div className="text-xl sm:text-2xl font-black text-foreground">{stat.label}</div>
                    <div className="text-[11px] font-semibold text-primary">{stat.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Ticker / Partner Names */}
        <div className="mt-16 pt-8 border-t border-border overflow-hidden">
          <p className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-6">
            Supported Network Gateways
          </p>
          <div className="flex gap-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <motion.div
              className="flex gap-4 shrink-0"
              animate={{ x: '-50%' }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            >
              {doubled.map((item, idx) => (
                <div
                  key={`${item}-${idx}`}
                  className="px-4 py-2 rounded-lg border border-border bg-card text-xs font-bold text-foreground/80 flex items-center gap-2 whitespace-nowrap"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {item}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
