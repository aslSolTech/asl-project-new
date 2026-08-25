'use client';

import { motion } from 'framer-motion';
import { steps } from '../../constants';
import { ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';

export default function JourneySection() {
  return (
    <section className="py-24 border-t border-border bg-muted/20 relative overflow-hidden">
      {/* Background Fintech Illustration Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.02] bg-repeat bg-center pointer-events-none -z-10"
        style={{ backgroundImage: `url('/images/fintech-pattern.jpg')`, backgroundSize: '800px' }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl relative">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-primary mb-2 block">
            Simple 4-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            How to Get Started with ASL Wallets
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground">
            Go live with complete banking APIs and AEPS retail terminal in less than 5 minutes.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="group p-6 rounded-2xl border border-border bg-card shadow-xs hover:border-primary/60 hover:shadow-xl hover:shadow-primary/5 transition-all flex flex-col justify-between cursor-pointer relative overflow-hidden"
              >
                {/* Large Background Step Number Watermark */}
                <span className="absolute -right-2 -top-3 text-7xl font-black text-foreground/[0.03] dark:text-foreground/[0.05] group-hover:text-primary/[0.08] font-mono select-none pointer-events-none transition-colors">
                  0{index + 1}
                </span>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-black px-2.5 py-1 rounded-full bg-muted border border-border text-foreground/80 font-mono">
                      Step 0{index + 1}
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-md group-hover:shadow-primary/30 transition-all duration-300">
                      <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    {step.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 pt-4 border-t border-border relative z-10">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    <span>Instant Verification</span>
                  </div>
                  <span className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all">→</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Ground Reality Network Showcase (Village & Town Market CSP Connection) */}
        <div className="mt-16 pt-12 border-t border-border">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-primary mb-1 block">
              Empowering Real India (Bharat)
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
              From Remote Gram Panchayats to Bustling City Mandis
            </h3>
            <p className="text-xs text-muted-foreground mt-2">
              Over 25,000+ active retailers bridging the last-mile financial gap across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Village CSP Point Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="rounded-2xl border border-border bg-card overflow-hidden shadow-md group cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-muted">
                <img 
                  src="/images/village-csp.jpg" 
                  alt="Rural Village CSP Point in Rajasthan" 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-background/90 backdrop-blur-md border border-border text-foreground text-[11px] font-bold shadow-xs">
                  Gramin Banking (Village CSP)
                </div>
              </div>
              <div className="p-5 border-t border-border">
                <h4 className="font-bold text-base text-foreground mb-1 group-hover:text-primary transition-colors">
                  Aadhaar Cash Point • Rajasthan
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Bringing instant AePS cash withdrawals & pension disbursements to local villagers without needing a distant bank branch.
                </p>
              </div>
            </motion.div>

            {/* Bihar ASL WALLETS Banking CSP Point Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="rounded-2xl border border-border bg-card overflow-hidden shadow-md group cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-muted">
                <img 
                  src="/images/bihar-csp-point.jpg" 
                  alt="ASL WALLETS Banking CSP Point in Bihar" 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary text-primary-foreground text-[11px] font-bold shadow-xs">
                  ASL WALLETS Official CSP (Bihar)
                </div>
              </div>
              <div className="p-5 border-t border-border">
                <h4 className="font-bold text-base text-foreground mb-1 group-hover:text-primary transition-colors">
                  ASL WALLETS Banking Center • Bihar
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  AePS cash withdrawal, money transfer, mobile recharge & instant account opening center serving the local market.
                </p>
              </div>
            </motion.div>

          </div>
        </div>

        {/* CTA Bar */}
        <div className="mt-14 text-center">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-lg shadow-primary/25 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/35 transition-all cursor-pointer"
          >
            <span>Start Free Merchant Registration</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
