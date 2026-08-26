'use client';

import { motion } from 'framer-motion';
import { services } from '../../constants';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function ServicesSection() {
  return (
    <section className="py-20 bg-background relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-primary mb-2 block">
              Complete Product Suite
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              One Unified Platform for All Financial Services
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground">
              Provide essential digital and physical banking solutions to your local community with instant settlement and high commission margins.
            </p>
          </div>

          <Link
            href="/signup"
            className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-primary/80 transition-colors shrink-0 group cursor-pointer"
          >
            <span>View All Commission Slabs</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Professional Clean Grid with Interactive SVG Accents & Light Glow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                viewport={{ once: true }}
                className="group p-6 rounded-2xl border border-border/80 bg-card shadow-xs hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all flex flex-col justify-between cursor-pointer relative overflow-hidden"
              >
                {/* Subtle Decorative Geometric SVG in Card Corner */}
                <div className="absolute -right-6 -bottom-6 w-24 h-24 text-foreground/[0.03] dark:text-foreground/[0.05] group-hover:text-primary/[0.08] group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 pointer-events-none">
                  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="50" cy="50" r="40" strokeDasharray="4 4" />
                    <circle cx="50" cy="50" r="24" />
                    <path d="M50 10 L50 90 M10 50 L90 50" />
                  </svg>
                </div>

                {/* Top Corner Subtle Glow Beam */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-md group-hover:shadow-primary/30 transition-all duration-300">
                      <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </div>
                    {service.tag && (
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${service.tagColor || 'bg-muted text-muted-foreground'} shadow-xs`}>
                        {service.tag}
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-foreground text-base mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {service.desc}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-border flex items-center justify-between text-xs font-bold text-primary relative z-10">
                  <span>Activate Service</span>
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
