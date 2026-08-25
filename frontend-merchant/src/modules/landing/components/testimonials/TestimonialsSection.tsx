'use client';

import { motion } from 'framer-motion';
import { Star, CheckCircle } from 'lucide-react';
import { testimonials } from '../../constants';
import { TestimonialCardProps } from '../../types';

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="flex flex-col justify-between w-[340px] shrink-0 rounded-2xl border border-border bg-card p-6 shadow-xs hover:border-primary/40 hover:shadow-md transition-all">
      <div>
        <div className="flex items-center justify-between mb-4">
          {/* Star Rating */}
          <div className="flex gap-1 text-amber-500">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star key={`${testimonial.name}-${i}`} className="h-3.5 w-3.5 fill-amber-500" />
            ))}
          </div>

          <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
            <CheckCircle className="w-3 h-3" />
            <span>Verified Partner</span>
          </div>
        </div>

        <p className="text-xs text-foreground/80 leading-relaxed font-normal mb-6">
          &ldquo;{testimonial.text}&rdquo;
        </p>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-border">
        <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0">
          {testimonial.initials}
        </div>
        <div>
          <p className="font-bold text-foreground text-xs">{testimonial.name}</p>
          <p className="text-[11px] text-muted-foreground">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="py-20 bg-background overflow-hidden border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-14 text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-primary mb-2 block">
          Merchant Testimonials
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          Trusted by Over 8,000+ Retail CSPs Nationwide
        </h2>
        <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
          Read genuine feedback from shopkeepers, CSC agents, and master distributors across India.
        </p>
      </div>

      {/* Infinite Smooth Ticker */}
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <motion.div
          className="flex gap-5 w-max"
          animate={{ x: '-50%' }}
          transition={{
            duration: 35,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          {doubled.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} testimonial={t} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
