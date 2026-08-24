'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { stats } from '../../constants';
import { SubStat } from '../../types';

function AnimatedCounter({ value, suffix, inView }: SubStat) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span className="text-4xl md:text-5xl font-black text-primary">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      {/* Background gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Our Journey</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            A Decade of <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">Financial Inclusion</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Joining hands with thousands of retailers and distributors across India to make banking accessible for everyone.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group">          
                <div className="rounded-2xl border border-border bg-card p-6 md:p-8 text-center hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={inView} />
                  <p className="mt-2 font-semibold text-foreground text-sm md:text-base">{stat.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{stat.description}</p>
                </div>
                {/* Glow border on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-md" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
