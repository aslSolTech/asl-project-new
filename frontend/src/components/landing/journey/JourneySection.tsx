'use client';

import { motion } from 'framer-motion';
import { UserPlus, FileCheck, Rocket, TrendingUp, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    step: '01',
    title: 'Apply & Register',
    desc: 'Choose your plan — Retailer, Distributor, Master Distributor or Whitelabel. Register online in minutes.',
    iconBg: 'bg-blue-500/15',
    iconColor: 'text-blue-500',
    borderColor: 'border-blue-500/40',
    dotColor: '#3b82f6',
  },
  {
    icon: FileCheck,
    step: '02',
    title: 'KYC Verification',
    desc: 'Complete your KYC with Aadhaar & PAN. Our team verifies and activates your account within 24 hours.',
    iconBg: 'bg-purple-500/15',
    iconColor: 'text-purple-500',
    borderColor: 'border-purple-500/40',
    dotColor: '#a855f7',
  },
  {
    icon: Rocket,
    step: '03',
    title: 'Get Activated',
    desc: 'Go live in 5 minutes! Access 25+ banking & utility services via our app, portal or API.',
    iconBg: 'bg-primary/15',
    iconColor: 'text-primary',
    borderColor: 'border-primary/40',
    dotColor: '#F7941D',
  },
  {
    icon: TrendingUp,
    step: '04',
    title: 'Start Earning',
    desc: 'Earn real-time commissions on every transaction. Track your earnings live on the dashboard.',
    iconBg: 'bg-green-500/15',
    iconColor: 'text-green-500',
    borderColor: 'border-green-500/40',
    dotColor: '#22c55e',
  },
];

type Indice = {
  readonly index: number
}

// Segment line between two steps with looping traveller dot
function SegmentLine({ index }: Indice) {
  // Each segment delays by index * duration so dots travel one-by-one
  const segDuration = 0.8;    // time to cross one segment
  const totalDuration = steps.length * segDuration; // full loop duration
  const delay = index * segDuration;

  return (
    <div className="relative w-full h-full z-0">
      {/* Static base track - colored and slightly darker (more visible) */}
      <div 
        className="absolute inset-0 rounded-full opacity-35 dark:opacity-50" 
        style={{ backgroundColor: steps[index].dotColor }}
      />

      {/* Looping travelling dot */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full shadow-lg"
        style={{ 
          backgroundColor: steps[index].dotColor,
          boxShadow: `0 0 10px ${steps[index].dotColor}, 0 0 20px ${steps[index].dotColor}`
        }}
        animate={{
          left: ['0%', '100%'],
          opacity: [0, 1, 1, 0],
          scale: [0.7, 1, 1, 0.7],
        }}
        transition={{
          duration: totalDuration,
          delay,
          repeat: Infinity,
          ease: 'linear',
          times: [0, 0.05, 0.15, 1],
        }}
      />

      {/* Looping fill bar */}
      <motion.div
        className="absolute top-0 bottom-0 left-0 rounded-full"
        style={{ backgroundColor: steps[index].dotColor }}
        animate={{ scaleX: [0, 1, 1, 0], originX: 0 }}
        transition={{
          duration: totalDuration,
          delay,
          repeat: Infinity,
          ease: 'linear',
          times: [0, 0.05, 0.95, 1],
        }}
      />
    </div>
  );
}

export default function JourneySection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">How It Works</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            Join Our Journey Towards a{' '}
            <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              Financially Inclusive India
            </span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Getting started with Payzones is simple and fast. Follow these four steps to become a part of India&apos;s largest fintech distribution network.
          </p>
        </motion.div>

        {/* ─── DESKTOP: horizontal timeline ─── */}
        <div className="hidden lg:block relative">
          {/* Connecting line segments running strictly between box edges */}
          {steps.slice(0, -1).map((_, index) => {
            const leftPercent = 12.5 + index * 25.2;
            return (
              <div
                key={steps[index].step}
                className="absolute top-[2.75rem] h-[3px] z-0"
                style={{
                  left: `calc(${leftPercent}% + 45px)`,
                  width: `calc(25% - 90px)`,
                }}
              >
                <SegmentLine index={index} />
              </div>
            );
          })}

          {/* Icon row - matches grid-cols-4 exactly */}
          <div className="grid grid-cols-4 gap-6 mb-8 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="flex justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.15, type: 'spring', stiffness: 200 }}
                    viewport={{ once: true }}
                    className="relative flex-shrink-0"
                  >
                    <div
                      className={`flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-2xl border-2 ${step.iconBg} ${step.borderColor} bg-background transition-all duration-300 hover:scale-110`}
                      style={{ boxShadow: `0 0 0 4px var(--background), 0 0 0 6px ${step.dotColor}40` }}
                    >
                      <Icon className={`h-8 w-8 ${step.iconColor}`} />
                      <span
                        className="absolute -top-2.5 -right-2.5 flex h-6 w-6 items-center justify-center rounded-full text-white text-[10px] font-black shadow-md"
                        style={{ backgroundColor: step.dotColor }}
                      >
                        {step.step}
                      </span>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Text labels row (below icons, aligned by col) */}
          <div className="grid grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.12 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <h3 className="font-bold text-foreground text-base mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── MOBILE: vertical timeline ─── */}
        <div className="lg:hidden flex flex-col gap-0">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                viewport={{ once: true }}
                className="flex gap-5 relative"
              >
                {/* Left: icon + vertical line */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border-2 ${step.iconBg} ${step.borderColor}`}
                    style={{ boxShadow: `0 0 0 3px var(--background), 0 0 0 4px ${step.dotColor}40` }}
                  >
                    <Icon className={`h-6 w-6 ${step.iconColor}`} />
                    <span
                      className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-white text-[10px] font-black"
                      style={{ backgroundColor: step.dotColor }}
                    >
                      {step.step}
                    </span>
                  </div>

                  {/* Vertical animated traveller */}
                  {!isLast && (
                    <div className="relative w-0.5 flex-1 mt-2 mb-2 min-h-[3.5rem] bg-border rounded-full overflow-hidden">
                      <motion.div
                        className="absolute left-0 right-0 rounded-full"
                        style={{ backgroundColor: step.dotColor, top: 0 }}
                        animate={{ height: ['0%', '100%', '100%', '0%'], opacity: [0, 1, 1, 0] }}
                        transition={{
                          duration: steps.length * 0.8,
                          delay: index * 0.8,
                          repeat: Infinity,
                          ease: 'linear',
                          times: [0, 0.4, 0.9, 1],
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Right: content */}
                <div className="pb-8 mt-1">
                  <h3 className="font-bold text-foreground text-base mb-1.5">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <motion.a
            href="#pricing"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all"
          >
            Start Your Journey
            <ArrowRight className="h-4 w-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
