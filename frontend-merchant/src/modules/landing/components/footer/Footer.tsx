'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react'
import { FOOTER_SECTIONS, COMPLIANCE_BADGES, SOCIAL_LINKS } from '../../constants'

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

  return (
    <footer className="border-t border-border bg-muted/20">

      {/* Newsletter Section */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative rounded-2xl my-10 overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-orange-600 p-8 sm:p-10 shadow-xl shadow-primary/20"
          >
            {/* Decorative glow blobs */}
            <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-orange-300/20 blur-2xl pointer-events-none" />

            <div className="relative grid gap-8 md:grid-cols-2 items-center">
              {/* Left text */}
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 border border-white/20 px-3 py-1 text-xs font-semibold text-white mb-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />{' '}
                  Newsletter
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                  Stay Updated with Payzones
                </h3>
                <p className="text-white/75 text-sm leading-relaxed max-w-sm">
                  Get the latest fintech news, new service launches, commission updates and exclusive offers — straight to your inbox.
                </p>
              </div>

              {/* Right: input + button */}
              <div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3.5 rounded-xl border-0 bg-white/15 backdrop-blur-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 text-sm"
                  />
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="px-6 py-3.5 rounded-xl bg-white text-primary font-bold text-sm hover:bg-white/90 transition-all flex items-center gap-2 whitespace-nowrap shadow-lg"
                  >
                    Subscribe
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </div>
                <p className="text-white/50 text-xs mt-3">
                  No spam. Unsubscribe anytime. We respect your privacy.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>


      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-10 grid-cols-2 md:grid-cols-2 lg:grid-cols-5 mb-12"
        >
          {/* Brand Section — spans 2 cols on lg */}
          <motion.div variants={itemVariants} className="col-span-2 lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center mb-4">
              <Image
                src="/logo/logo.png"
                alt="Payzones Logo"
                width={160}
                height={80}
                className="h-18 w-auto object-contain"
              />
            </div>

            <p className="text-sm text-foreground/60 mb-6 max-w-xs leading-relaxed">
              India&apos;s #1 Fintech B2B & B2C platform — powering 8,000+ retailers with AEPS, BBPS, Money Transfer, Recharges and 25+ banking services.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <motion.a
                href="mailto:info@payzones.net"
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 text-sm text-foreground/60 hover:text-primary transition-colors"
              >
                <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-3.5 w-3.5 text-primary" />
                </div>
                info@payzones.net
              </motion.a>
              <motion.a
                href="tel:+919997669866"
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 text-sm text-foreground/60 hover:text-primary transition-colors"
              >
                <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-3.5 w-3.5 text-primary" />
                </div>
                +91 99976 69866
              </motion.a>
              <div className="flex items-start gap-3 text-sm text-foreground/60">
                <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                </div>
               Powered by ASL Solutions Tech Pvt. Ltd., India
              </div>
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
                    className="p-2 rounded-lg bg-muted hover:bg-primary/10 text-foreground/60 hover:text-primary transition-colors border border-border/50"
                    aria-label={social.label}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Footer Link Sections */}
          {FOOTER_SECTIONS.map((section) => (
            <motion.div key={section.title} variants={itemVariants}>
              <h4 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      whileHover={{ x: 3 }}
                      className="text-sm text-foreground/60 hover:text-primary transition-colors flex items-center gap-1.5 group"
                    >
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary text-xs">›</span>
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="border-t border-border mb-8" />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="text-xs text-foreground/50 text-center sm:text-left">
            ©2022–{currentYear} Payzones|Powered by ASL Solutions Tech Pvt. Ltd. All rights reserved.
          </p>

          {/* Compliance badges */}
          <div className="flex gap-2 items-center flex-wrap justify-center">
            {COMPLIANCE_BADGES.map((badge) => (
              <span
                key={badge}
                className="px-2.5 py-1 rounded-md bg-muted border border-border text-[10px] font-semibold text-foreground/60"
              >
                {badge}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Big Payzones Logo Watermark below footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mt-8 flex mx-auto justify-center items-center pointer-events-none select-none"
        >
          <h1 className="text-[18vw] sm:text-[15vw] lg:text-[12.5vw] font-black uppercase tracking-[-0.05em] leading-none text-center bg-gradient-to-b from-foreground/8 to-transparent bg-clip-text text-transparent px-2">
            PAYZONES
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
        className="fixed bottom-6 right-6 z-50 p-3 rounded-xl bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:shadow-primary/30 transition-all"
        aria-label="Scroll to top"
      >
        <ArrowRight className="h-5 w-5 -rotate-90" />
      </motion.button>
    </footer>
  )
}
