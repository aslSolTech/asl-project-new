'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Mail, Phone, ArrowRight, Building } from 'lucide-react'
import { SOCIAL_LINKS, COMPLIANCE_BADGES } from '../../constants'

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  } as const

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  } as const

  const usefulLinks = [
    { label: 'Services', href: 'https://www.aslwallets.in/services.php' },
    { label: 'Terms & Conditions', href: 'https://www.aslwallets.in/terms-condition.php' },
    { label: 'Privacy Policy', href: 'https://www.aslwallets.in/privacy-policy.php' },
    { label: 'Cancellation & Refund', href: 'https://www.aslwallets.in/refund-policy.php' },
  ];

  const quickServices = [
    'AEPS Cash Withdrawal',
    'Domestic Money Transfer',
    'Bharat BillPay (BBPS)',
    'Prepaid & Postpaid Recharge',
    'Electricity & Gas Utility',
    'Insurance & POSP Policies',
    'Travel & IRCTC Booking',
  ];

  return (
    <footer className="border-t border-border bg-muted/20">

      {/* Newsletter Section */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative rounded-2xl my-10 overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-secondary p-8 sm:p-10 shadow-xl shadow-primary/20"
          >
            {/* Decorative glow blobs */}
            <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-emerald-300/20 blur-2xl pointer-events-none" />

            <div className="relative grid gap-8 md:grid-cols-2 items-center">
              {/* Left text */}
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 border border-white/20 px-3 py-1 text-xs font-semibold text-white mb-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />{' '}
                  Our Newsletter
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                  Get the best of all worlds at one stop ASL WALLETS
                </h3>
                <p className="text-white/85 text-sm leading-relaxed max-w-lg">
                  Skim through our extensive range of services which make life effortless and hassle-free. Stay updated with commission alerts and new banking rollouts.
                </p>
              </div>

              {/* Right: input + button */}
              <div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3.5 rounded-xl border-0 bg-white/15 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 text-sm"
                  />
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="px-6 py-3.5 rounded-xl bg-white text-primary font-bold text-sm hover:bg-white/90 transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-lg cursor-pointer"
                  >
                    Subscribe
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </div>
                <p className="text-white/60 text-xs mt-3">
                  No spam. Unsubscribe anytime. We respect your privacy.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl pt-14 pb-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-12 mb-12"
        >
          {/* Brand & About Column (4 Cols) */}
          <motion.div variants={itemVariants} className="lg:col-span-4">
            <div className="flex items-center mb-4">
              <Image
                src="/logo/asl_logo.png"
                alt="ASL WALLETS Logo"
                width={140}
                height={45}
                className="h-9 w-auto object-contain"
              />
            </div>

            <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
              <strong className="text-foreground">ASL WALLETS</strong> is a leading service aggregator and payments solution provider based in India. We currently have more than 60+ services like prepaid recharges, domestic money transfer, postpaid, landline, electricity, gas, insurance, travel and others.
            </p>

            {/* Direct Contact Info */}
            <div className="space-y-3 mb-6">
              <motion.a
                href="mailto:help@aslwallets.in"
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 text-xs text-foreground/80 hover:text-primary transition-colors font-medium"
              >
                <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="h-3.5 w-3.5 text-primary" />
                </div>
                help@aslwallets.in
              </motion.a>

              <motion.a
                href="tel:+918513021544"
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 text-xs text-foreground/80 hover:text-primary transition-colors font-medium"
              >
                <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="h-3.5 w-3.5 text-primary" />
                </div>
                +91-8513021544
              </motion.a>
            </div>

            {/* Social Links */}
            <div className="flex gap-2">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-lg bg-card hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors border border-border"
                    aria-label={social.label}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Useful Links (2 Cols) */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h4 className="font-bold text-foreground mb-4 text-xs uppercase tracking-wider">Useful Links</h4>
            <ul className="space-y-2.5">
              {usefulLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary text-xs">›</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 60+ Aggregated Services (2 Cols) */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h4 className="font-bold text-foreground mb-4 text-xs uppercase tracking-wider">Key Services</h4>
            <ul className="space-y-2.5">
              {quickServices.map((service) => (
                <li key={service} className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-primary/60" />
                  {service}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Official Registered & Corporate Addresses (4 Cols) */}
          <motion.div variants={itemVariants} className="lg:col-span-4 space-y-4">
            <h4 className="font-bold text-foreground mb-3 text-xs uppercase tracking-wider flex items-center gap-2">
              <Building className="w-4 h-4 text-primary" />
              <span>Contact Us & Locations</span>
            </h4>

            {/* Registered Office */}
            <div className="p-3 rounded-xl border border-border bg-card text-xs space-y-1">
              <span className="font-bold text-primary block">Registered Office:</span>
              <p className="text-foreground/90 font-medium">ASL Solutions Tech Pvt. Ltd.</p>
              <p className="text-muted-foreground leading-relaxed text-[11px]">
                12 Hachimpur, Baharu, Jaynagar, 24 South Parganas, West Bengal, India - 743372
              </p>
            </div>

            {/* Kolkata Corporate Office */}
            <div className="p-3 rounded-xl border border-border bg-card text-xs space-y-1">
              <span className="font-bold text-foreground block">Corporate Office (Kolkata):</span>
              <p className="text-muted-foreground leading-relaxed text-[11px]">
                Katjunagar, Jadavpur, Near South City Mall, Kolkata - 700032
              </p>
            </div>

            {/* Noida Corporate Office */}
            <div className="p-3 rounded-xl border border-border bg-card text-xs space-y-1">
              <span className="font-bold text-foreground block">Corporate Office (Noida):</span>
              <p className="text-muted-foreground leading-relaxed text-[11px]">
                Procapitus Business Park, D-247, 4A, D Block, Sector 63, Noida - 201309
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-border mb-8" />

        {/* Bottom Bar: Copyright & Compliance */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            ©2022–{currentYear} ASL Wallets | Powered by ASL Solutions Tech Pvt. Ltd. All rights reserved.
          </p>

          {/* Compliance badges */}
          <div className="flex gap-2 items-center flex-wrap justify-center">
            {COMPLIANCE_BADGES.map((badge) => (
              <span
                key={badge}
                className="px-2.5 py-1 rounded-md bg-card border border-border text-[10px] font-semibold text-muted-foreground"
              >
                {badge}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Big ASL Wallets Watermark */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mt-8 flex mx-auto justify-center items-center pointer-events-none select-none"
        >
          <h1 className="text-[13.85vw] sm:text-[10.5vw] lg:text-[8.9vw] font-black uppercase tracking-[-0.05em] leading-none text-center bg-gradient-to-b from-foreground/8 to-transparent bg-clip-text text-transparent px-2">
            ASL WALLETS
          </h1>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-xl bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:shadow-primary/30 transition-all cursor-pointer"
        aria-label="Scroll to top"
      >
        <ArrowRight className="h-5 w-5 -rotate-90" />
      </motion.button>
    </footer>
  )
}
