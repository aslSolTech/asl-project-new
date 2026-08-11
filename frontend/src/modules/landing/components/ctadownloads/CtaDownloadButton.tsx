'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Download, Star } from 'lucide-react';
import { QUICK_SERVICES } from '../../constants';

export default function CtaDownloadButton() {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-blue-500/10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-primary/20 blur-3xl rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-card/80 backdrop-blur-sm p-8 sm:p-12 lg:p-16 shadow-2xl overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-primary/10 blur-xl" />
          <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-blue-500/10 blur-xl" />

          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-lg text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-4">
                <Download className="h-3 w-3" />
                Available on iOS & Android
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4 leading-tight">
                Download the{' '}
                <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                  Payzones App
                </span>
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                Manage all your banking services, track commissions in real-time, and serve your customers — all from your smartphone.
              </p>

              {/* App rating */}
              <div className="flex items-center gap-2 justify-center lg:justify-start mb-8">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-foreground">4.8</span>
                <span className="text-sm text-muted-foreground">· 10,000+ downloads</span>
              </div>

              {/* Download Buttons — proper store button style */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                {/* App Store */}
                <Link
                  href="#"
                  className="group flex items-center gap-3 px-5 py-3 rounded-2xl bg-black dark:bg-white/10 dark:border dark:border-white/20 hover:bg-black/80 dark:hover:bg-white/20 transition-all shadow-lg"
                >
                  {/* Apple logo SVG */}
                  <svg
                    className="h-7 w-7 text-white flex-shrink-0 group-hover:scale-110 transition-transform"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] leading-none text-white/70">Download on the</span>
                    <span className="text-sm font-bold leading-tight text-white">App Store</span>
                  </div>
                </Link>

                {/* Google Play */}
                <Link
                  href="#"
                  className="group flex items-center gap-3 px-5 py-3 rounded-2xl bg-black dark:bg-white/10 dark:border dark:border-white/20 hover:bg-black/80 dark:hover:bg-white/20 transition-all shadow-lg"
                >
                  {/* Google Play logo SVG */}
                  <svg
                    className="h-7 w-7 flex-shrink-0 group-hover:scale-110 transition-transform"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path d="M3.18 23.76c.3.17.65.2.98.08l11.45-6.61-2.5-2.5-9.93 9z" fill="#EA4335" />
                    <path d="M22.54 10.27L19.3 8.4l-2.8 2.8 2.8 2.8 3.27-1.88a1.5 1.5 0 000-2.85z" fill="#FBBC05" />
                    <path d="M3.18.24a1.5 1.5 0 00-.68 1.32v20.88c0 .56.21 1.02.68 1.32l.1.07 11.7-11.7v-.27L3.28.17z" fill="#4285F4" />
                    <path d="M15.61 14.73l-2.43-2.43v-.27l2.43-2.43 2.5 1.44L15.6 14.73z" fill="#34A853" />
                  </svg>
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] leading-none text-white/70">Get it on</span>
                    <span className="text-sm font-bold leading-tight text-white">Google Play</span>
                  </div>
                </Link>
              </div>
            </motion.div>

            {/* Right: Phone mockup */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative flex-shrink-0"
            >
              <div className="relative w-52 h-96 rounded-[2.5rem] border-4 border-foreground/20 bg-gradient-to-b from-primary/30 to-blue-500/20 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
                  <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                    <span className="text-3xl font-black text-primary">P</span>
                  </div>
                  <p className="text-xs font-bold text-foreground">Payzones</p>
                  <div className="w-full space-y-2 mt-2">
                    {QUICK_SERVICES.map((item) => (
                      <div key={item.label} className="rounded-lg bg-card/60 border border-border/50 px-3 py-1.5 text-xs text-foreground/70 text-left">
                        {item.label}
                      </div>
                    ))}
                  </div>
                </div>
                {/* Notch */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-4 rounded-full bg-foreground/20" />
              </div>
              {/* Glow behind phone */}
              <div className="absolute inset-0 -z-10 blur-2xl rounded-full bg-primary/30 scale-75" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}