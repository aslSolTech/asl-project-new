'use client';

import { motion } from 'framer-motion';
import { Check, Star, ArrowRight, ShieldCheck } from 'lucide-react';
import { plans } from '../../constants';
import Link from 'next/link';

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 md:py-24 bg-muted/20 border-t border-border relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-primary mb-2 block">
            Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Choose the Right Plan for Your Business Scale
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground">
            From single retail shops to master distributor networks, unlock full access with zero hidden charges.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {plans.map((plan, index) => {
            const isPopular = Boolean(plan.popular);
            return (
              <motion.div
                key={plan.role}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className={`rounded-2xl border ${
                  isPopular 
                    ? 'border-primary shadow-xl shadow-primary/10 ring-2 ring-primary bg-card' 
                    : 'border-border shadow-xs hover:border-primary/50 hover:shadow-md bg-card'
                } p-6 flex flex-col justify-between relative transition-all`}
              >
                {/* Popular Pill */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md shadow-primary/30 z-20 whitespace-nowrap">
                    <Star className="w-3 h-3 fill-current" />
                    <span>Most Popular</span>
                  </div>
                )}

                <div>
                  {/* Role Header */}
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-foreground">{plan.role}</h3>
                    <p className="text-xs text-muted-foreground mt-1 min-h-[32px] leading-relaxed">
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="py-4 my-2 border-y border-border">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-foreground tracking-tight">
                        {plan.price}
                      </span>
                      <span className="text-xs text-muted-foreground font-medium">/ one-time</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="my-6">
                    <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-3">
                      Included Features
                    </span>
                    <ul className="space-y-2.5">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-2.5 text-xs text-foreground/90">
                          <div className="w-4 h-4 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                            <Check className="w-2.5 h-2.5" />
                          </div>
                          <span className="leading-tight">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-4 border-t border-border mt-auto">
                  <Link
                    href="/signup"
                    className={`w-full py-3 rounded-xl text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isPopular
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20'
                        : 'bg-muted border border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary'
                    }`}
                  >
                    <span>{plan.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Trust Note */}
        <div className="text-center mt-12 flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1 text-secondary font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Zero Annual Renewal Fee</span>
          </div>
          <span className="hidden sm:inline">•</span>
          <span>Need a customized enterprise whitelabel setup?</span>
          <Link href="#contact" className="text-primary font-bold hover:underline">
            Contact Sales Team
          </Link>
        </div>

      </div>
    </section>
  );
}
