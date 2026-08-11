'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { QUICK_SERVICES, STATIC_PARTICLES, HERO_FEATURES, HERO_STATS, MOCKUP_STATS, MOCKUP_CHART_DATA } from '../../constants';

// ── Animated dashboard SVG (inline, no images needed) ──
function DashboardMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative w-full max-w-[520px] mx-auto lg:mx-0"
    >
      {/* Outer glow */}
      <div className="absolute -inset-4 bg-gradient-to-br from-primary/30 via-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl opacity-60 animate-pulse" />

      {/* Main dashboard card */}
      <div className="relative rounded-2xl border border-border/60 bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-muted/40">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 mx-4">
            <div className="h-5 rounded-md bg-muted/70 text-[10px] text-muted-foreground flex items-center px-2 font-mono">
              payzones.net
            </div>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* Header row */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-muted-foreground">Good Morning!, Users 👋</div>
              <div className="font-bold text-foreground text-sm">Payzones Dashboard</div>
            </div>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center text-white text-xs font-bold">R</div>
          </div>

          {/* Wallet balance */}
          <div className="rounded-xl bg-gradient-to-r from-primary to-blue-600 p-4 text-white relative overflow-hidden">
            <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-white/10" />
            <div className="absolute -right-2 top-6 h-12 w-12 rounded-full bg-white/5" />
            <div className="text-[10px] opacity-80 mb-0.5">Wallet Balance</div>
            <motion.div
              className="text-2xl font-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              ₹24,850.00
            </motion.div>
            <div className="text-[10px] opacity-70 mt-1">+₹3,200 today • 47 transactions</div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2">
            {MOCKUP_STATS.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className={`rounded-lg ${s.bg} p-2.5 text-center`}>
                  <Icon className={`h-4 w-4 ${s.color} mx-auto mb-1`} />
                  <div className={`text-xs font-bold ${s.color}`}>{s.value}</div>
                  <div className="text-[9px] text-muted-foreground">{s.label}</div>
                </div>
              );
            })}
          </div>

          {/* Mini chart bars */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-semibold text-foreground">Weekly Earnings</span>
              <span className="text-[10px] text-green-500 font-bold">+18.4%</span>
            </div>
            <div className="flex items-end gap-1 h-14">
              {MOCKUP_CHART_DATA.map((item, i) => (
                <motion.div
                  key={item.day}
                  className="flex-1 rounded-t-sm bg-gradient-to-t from-primary/80 to-primary/30"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 1.2 + i * 0.08, duration: 0.4 }}
                  style={{ height: `${item.value}%`, transformOrigin: 'bottom' }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-1">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
                <span key={d} className="text-[8px] text-muted-foreground flex-1 text-center">{d}</span>
              ))}
            </div>
          </div>

          {/* Service quick access */}
          <div className="grid grid-cols-4 gap-1.5">
            {QUICK_SERVICES.map((s) => (
              <div key={s.label} className="rounded-lg bg-muted/60 border border-border/40 p-2 text-center">
                <div className="text-base leading-none mb-1">{s.emoji}</div>
                <div className="text-[9px] text-muted-foreground font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating badges */}
      <motion.div
        className="absolute -left-8 top-16 flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 shadow-lg text-xs font-semibold"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
        Live in 5 mins
      </motion.div>

      <motion.div
        className="absolute -right-6 bottom-20 flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 shadow-lg text-xs font-semibold"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        <TrendingUp className="h-3.5 w-3.5 text-green-500" />
        +₹1,240 today
      </motion.div>
    </motion.div>
  );
}

// ── Floating particles background ──
function Particles() {
  const shouldReduce = useReducedMotion();
  if (shouldReduce) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {STATIC_PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute h-1 w-1 rounded-full bg-primary/30"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center py-12 md:py-0">
      {/* Vibrant multi-color background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full" />
        <div className="absolute top-[30%] right-[5%] w-[350px] h-[350px] bg-blue-500/15 blur-[100px] rounded-full" />
        <div className="absolute bottom-[5%] left-[5%] w-[300px] h-[300px] bg-purple-500/10 blur-[100px] rounded-full" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg,currentColor,currentColor 1px,transparent 1px,transparent 70px),' +
            'repeating-linear-gradient(90deg,currentColor,currentColor 1px,transparent 1px,transparent 70px)',
        }}
      />

      <Particles />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT COPY ── */}
          <div className="text-center lg:text-left">
            {/* Pill badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary mb-6"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              India&apos;s #1 Fintech B2B & B2C Platform
              <ChevronRight className="h-3.5 w-3.5" />
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-6"
            >
              One Wallet,{' '}
              <span className="relative">
                <span className="bg-gradient-to-r from-primary via-blue-500 to-violet-500 bg-clip-text text-transparent">
                  25+ Services
                </span>
                <motion.svg
                  viewBox="0 0 220 12"
                  className="absolute -bottom-1 left-0 w-full"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.7 }}
                >
                  <motion.path
                    d="M2 8 Q55 2 110 8 Q165 14 218 6"
                    stroke="url(#heroUnderline)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.9, duration: 0.7 }}
                  />
                  <defs>
                    <linearGradient id="heroUnderline" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </motion.svg>
              </span>{' '}
              for a{' '}
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                Digital India
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-8"
            >
              Payzones empowers retailers, distributors & enterprises with AEPS, BBPS, Money Transfer,
              Mobile Recharge, PAN Card, Insurance & 20 more services — all from a single powerful wallet.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center lg:justify-start gap-3 mb-10"
            >
              <Link
                href="#pricing"
                className="group px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:bg-primary/90 transition-all flex items-center gap-2"
              >
                Join Payzones Now
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#contact"
                className="px-7 py-3.5 rounded-xl border border-border bg-background/70 backdrop-blur-sm text-foreground font-semibold hover:bg-muted transition-all"
              >
                Talk to an Expert
              </Link>
            </motion.div>

            {/* Trust pills */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex flex-wrap justify-center lg:justify-start gap-2 mb-8"
            >
              {HERO_FEATURES.map((f) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.label}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/60 bg-card/60 text-xs font-medium text-foreground/80"
                  >
                    <Icon className="h-3 w-3 text-primary" />
                    {f.label}
                  </div>
                );
              })}
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center lg:justify-start gap-6 pt-4 border-t border-border/30"
            >
              {HERO_STATS.map((s, i) => (
                <div key={s.label} className="text-center lg:text-left flex items-center gap-3">
                  {i > 0 && <div className="h-6 w-px bg-border" />}
                  <div>
                    <div className="text-xl font-extrabold text-primary">{s.val}</div>
                    <div className="text-[11px] text-muted-foreground">{s.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT SVG DASHBOARD ── */}
          <div className="flex justify-center lg:justify-end">
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
