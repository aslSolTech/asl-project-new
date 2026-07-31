'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const providers = [
  'Financial Services',
  'Insurance',
  'Travel Booking – IRCTC',
  'Bill Payments (BBPS)',
  'E-Commerce – Amazon',
  'Vouchers & OTT',
  'Mobile & DTH Recharges',
  'PAN Card Services',
  'Micro ATM',
  'AEPS Withdrawals',
  'Money Transfer (DMT)',
  'Bank Account Opening',
];

const partnerTickers = [
  'Airtel', 'Jio', 'BSNL', 'Vi', 'Tata Sky', 'Dish TV',
  'IRCTC', 'Amazon', 'NSDL', 'UTI', 'Axis Bank', 'SBI',
  'Netflix', 'Hotstar', 'Amazon Prime', 'Zee5', 'LIC', 'ICICI',
];

export default function ProvidersSection() {
  const doubled = [...partnerTickers, ...partnerTickers];

  return (
    <section className="py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Our Ecosystem</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            Service Providers{' '}
            <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              On Board
            </span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Our on-ground presence helps us understand the market&apos;s pulse. We continuously add new services to increase your income.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Service checklist */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-foreground mb-6">
              All-in-one platform for your business growth
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {providers.map((provider, index) => (
                <motion.div
                  key={provider}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-card border border-border hover:border-primary/30 hover:bg-primary/5 transition-all group"
                >
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-foreground">{provider}</span>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all shadow-md"
            >
              View All Services
              <ArrowRight className="h-4 w-4" />
            </motion.a>
          </motion.div>

          {/* Right: Stats + visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Big number display */}
            <div className="rounded-3xl border border-border bg-card p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

              <div className="text-7xl font-black text-primary mb-2">25+</div>
              <div className="text-xl font-bold text-foreground mb-3">Banking & Utility Services</div>
              <div className="text-muted-foreground text-sm max-w-xs mx-auto mb-8">
                All accessible through a single Payzones wallet — no multiple logins, no complexity.
              </div>

              {/* Mini stat pills */}
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { label: '₹3,500', sub: 'Starting Plan' },
                  { label: '24×7', sub: 'Support' },
                  { label: '5 mins', sub: 'Go Live' },
                  { label: '100%', sub: 'Digital' },
                ].map((stat) => (
                  <div key={stat.label} className="px-4 py-2 rounded-xl bg-muted border border-border text-center">
                    <div className="font-bold text-foreground text-sm">{stat.label}</div>
                    <div className="text-xs text-muted-foreground">{stat.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scrolling partner tickers */}
        <div className="mt-16 overflow-hidden relative">
          <p className="text-center text-xs text-muted-foreground uppercase tracking-widest mb-6">Integrated Partners & Networks</p>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-muted/30 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-muted/30 to-transparent z-10 pointer-events-none" />
            <motion.div
              className="flex gap-4 w-max"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
            >
              {doubled.map((ticker, i) => (
                <span
                  key={`${ticker}-${i}`}
                  className="px-5 py-2 rounded-full border border-border bg-card text-sm font-semibold text-foreground/70 whitespace-nowrap flex-shrink-0"
                >
                  {ticker}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
