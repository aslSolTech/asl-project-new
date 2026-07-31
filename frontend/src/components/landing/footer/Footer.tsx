'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Services',
      links: [
        { label: 'AEPS Service', href: '#services' },
        { label: 'Money Transfer', href: '#services' },
        { label: 'BBPS Bill Payments', href: '#services' },
        { label: 'Mobile Recharge', href: '#services' },
        { label: 'PAN Card Services', href: '#services' },
      ],
    },
    {
      title: 'Join Us',
      links: [
        { label: 'Retailer Plan', href: '#pricing' },
        { label: 'Distributor Plan', href: '#pricing' },
        { label: 'Master Distributor', href: '#pricing' },
        { label: 'Whitelabel Solution', href: '#pricing' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#' },
        { label: 'Contact', href: '#contact' },
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
        { label: 'Cancellation & Refund', href: '#' },
      ],
    },
  ] as const

  const socialLinks = [
    {
      label: 'Facebook',
      href: '#',
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
        </svg>
      ),
    },
    {
      label: 'X / Twitter',
      href: '#',
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: 'Instagram',
      href: '#',
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      ),
    },
    {
      label: 'YouTube',
      href: '#',
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12z" />
        </svg>
      ),
    },
  ]

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
                ASL Solutions Tech Pvt. Ltd., India
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg bg-muted hover:bg-primary/10 text-foreground/60 hover:text-primary transition-colors border border-border/50"
                  aria-label={social.label}
                >
                  {social.svg}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Link Sections */}
          {footerSections.map((section) => (
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
            © 2021–{currentYear} ASL Solutions Tech Pvt. Ltd. | Powered by Payzones. All rights reserved.
          </p>

          {/* Compliance badges */}
          <div className="flex gap-2 items-center flex-wrap justify-center">
            {['RBI Compliant', 'SSL Secure', 'PCI DSS', 'ISO 27001'].map((badge) => (
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
