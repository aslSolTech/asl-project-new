'use client';

import { motion } from 'framer-motion';
import {
  Smartphone, Tv2, Zap, Banknote, FileText, ShieldCheck,
  Train, ShoppingBag, Ticket, Wifi, CreditCard, Building2
} from 'lucide-react';

const services = [
  { icon: Banknote, title: 'AEPS Service', desc: 'Aadhaar-enabled payment system for withdrawals, balance enquiry & mini statement.', color: 'from-blue-500/20 to-blue-600/10', border: 'border-blue-500/20 hover:border-blue-500/50' },
  { icon: Building2, title: 'Money Transfer (DMT)', desc: 'Domestic money transfer to any bank account across India in seconds.', color: 'from-green-500/20 to-green-600/10', border: 'border-green-500/20 hover:border-green-500/50' },
  { icon: Zap, title: 'BBPS Bill Payments', desc: 'Bharat Bill Payment System — pay electricity, water, gas, telecom bills instantly.', color: 'from-yellow-500/20 to-yellow-600/10', border: 'border-yellow-500/20 hover:border-yellow-500/50' },
  { icon: Smartphone, title: 'Mobile Recharge', desc: 'Recharge any network — Airtel, Jio, BSNL, Vi across all circles in India.', color: 'from-purple-500/20 to-purple-600/10', border: 'border-purple-500/20 hover:border-purple-500/50' },
  { icon: Tv2, title: 'DTH Recharge', desc: 'Quick DTH recharges for Tata Sky, Dish TV, Airtel DTH, DEN and more.', color: 'from-pink-500/20 to-pink-600/10', border: 'border-pink-500/20 hover:border-pink-500/50' },
  { icon: FileText, title: 'PAN Card Services', desc: 'Apply for new PAN, corrections & NSDL/UTI PAN card services at your fingertips.', color: 'from-orange-500/20 to-orange-600/10', border: 'border-orange-500/20 hover:border-orange-500/50' },
  { icon: ShieldCheck, title: 'Insurance', desc: 'Motor, life and general insurance policies — premium collection made easy.', color: 'from-teal-500/20 to-teal-600/10', border: 'border-teal-500/20 hover:border-teal-500/50' },
  { icon: Train, title: 'Travel Booking (IRCTC)', desc: 'Book train tickets via IRCTC integration and bus tickets for your customers.', color: 'from-red-500/20 to-red-600/10', border: 'border-red-500/20 hover:border-red-500/50' },
  { icon: ShoppingBag, title: 'E-Commerce (Amazon)', desc: 'Enable customers to shop on Amazon and other portals through your outlet.', color: 'from-amber-500/20 to-amber-600/10', border: 'border-amber-500/20 hover:border-amber-500/50' },
  { icon: Ticket, title: 'OTT & Vouchers', desc: 'Netflix, Amazon Prime, Hotstar subscription vouchers — sell & earn commissions.', color: 'from-indigo-500/20 to-indigo-600/10', border: 'border-indigo-500/20 hover:border-indigo-500/50' },
  { icon: CreditCard, title: 'Micro ATM', desc: 'Portable Micro ATM device for cash withdrawal and payment services anywhere.', color: 'from-cyan-500/20 to-cyan-600/10', border: 'border-cyan-500/20 hover:border-cyan-500/50' },
  { icon: Wifi, title: 'Data Card Recharge', desc: 'Recharge data cards and broadband accounts for all major internet providers.', color: 'from-violet-500/20 to-violet-600/10', border: 'border-violet-500/20 hover:border-violet-500/50' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ServicesSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">What We Offer</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            One Wallet,{' '}
            <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              25+ Banking & Utility Services
            </span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Payzones gives your business access to India&apos;s most comprehensive fintech service suite —
            from AEPS cash withdrawals to OTT subscriptions, all in one wallet.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                whileHover={{ scale: 1.03, y: -4 }}
                className={`relative group rounded-2xl border bg-gradient-to-br ${service.color} ${service.border} backdrop-blur-sm p-6 cursor-pointer transition-all duration-300 overflow-hidden`}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                </div>

                <div className="mb-4 inline-flex p-2.5 rounded-xl bg-background/60 border border-border/50 shadow-sm">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2 text-sm md:text-base">{service.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{service.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
