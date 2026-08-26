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
    const duration = 1800;
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
    <span className="text-2xl sm:text-3xl lg:text-3xl font-black text-foreground tracking-tight">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="py-16 md:py-24 border-y border-border bg-muted/20 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5, scale: 1.015 }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="group p-6 rounded-2xl border border-border/80 bg-card shadow-xs hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all flex flex-col justify-between relative overflow-hidden cursor-pointer"
              >
                {/* Subtle Decorative SVG Ring Watermark */}
                <div className="absolute -right-6 -bottom-6 w-24 h-24 text-foreground/[0.03] dark:text-foreground/[0.05] group-hover:text-primary/[0.08] group-hover:scale-125 transition-all duration-500 pointer-events-none select-none">
                  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="50" cy="50" r="42" strokeDasharray="6 4" />
                    <circle cx="50" cy="50" r="28" />
                  </svg>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-md group-hover:shadow-primary/30 transition-all duration-300">
                      <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-[11px] font-bold text-secondary bg-secondary/10 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" /> {" "}
                      Verified
                    </span>
                  </div>

                  <div>
                    <div className="mb-1">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={inView} />
                    </div>
                    <h3 className="text-sm font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{stat.label}</h3>
                    <p className="text-xs text-muted-foreground">{stat.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
