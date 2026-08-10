'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Ramesh Kumar',
    role: 'Shopkeeper, UP',
    initials: 'RK',
    color: 'bg-blue-500',
    rating: 5,
    text: 'Payzones is a very very good app for my business. It\'s improving day by day and is the best service provider for AEPS. Thumbs Up from my side!',
  },
  {
    name: 'Sunil Sharma',
    role: 'Retailer, Bihar',
    initials: 'SS',
    color: 'bg-purple-500',
    rating: 5,
    text: 'Earlier it used to take me half a day to earn ₹300 but after joining Payzones I earn ₹300 in just 15 minutes by providing account opening service.',
  },
  {
    name: 'Mohit Verma',
    role: 'Distributor, Rajasthan',
    initials: 'MV',
    color: 'bg-green-500',
    rating: 5,
    text: 'I have experienced AEPS services from many companies. Thanks to Payzones, which is the most trusted company in this domain. It provides many services I earn well from.',
  },
  {
    name: 'Priya Singh',
    role: 'Shopkeeper, MP',
    initials: 'PS',
    color: 'bg-amber-500',
    rating: 5,
    text: 'After joining Payzones, our shop has become famous for banking services in the whole village, due to which the number of our customers has increased a lot.',
  },
  {
    name: 'Ajay Patel',
    role: 'Master Distributor, Gujarat',
    initials: 'AP',
    color: 'bg-red-500',
    rating: 5,
    text: 'The real-time commission and backoffice dashboard make managing my agent network effortless. Payzones has truly transformed how I run my business.',
  },
  {
    name: 'Deepak Yadav',
    role: 'Retailer, Jharkhand',
    initials: 'DY',
    color: 'bg-teal-500',
    rating: 5,
    text: 'Best platform for BBPS and money transfers. Customers now prefer to come to my shop for all banking needs. Highly recommended!',
  },
];

interface SubTestimonial {
  readonly rating: number
  readonly name: string
  readonly role: string
  readonly initials: string
  readonly color: string
  readonly text: string
}

interface TestimonialCardProps {
  readonly testimonial: SubTestimonial;
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="relative flex flex-col justify-between w-[320px] flex-shrink-0 rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300">
      <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/10" />

      {/* Stars */}
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={`${testimonial.name}-${i}`} className="h-4 w-4 fill-amber-400 text-amber-400" />
        ))}
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5">
        {testimonial.text}
      </p>

      <div className="flex items-center gap-3">
        <div className={`h-10 w-10 rounded-full ${testimonial.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
          {testimonial.initials}
        </div>
        <div>
          <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
          <p className="text-xs text-muted-foreground">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Testimonials</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            Trusted by{' '}
            <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              8,000+ Retailers
            </span>{' '}
            Across India
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Real stories from real shopkeepers and distributors who have transformed their income with Payzones.
          </p>
        </motion.div>
      </div>

      {/* Infinite Marquee */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

        <motion.div
          className="flex gap-5 w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 30,
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
